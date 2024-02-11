import psutil
import time
import csv

def get_system_info():
    active_proc = len(list(psutil.process_iter()))
    cpu_count_logical = psutil.cpu_count()
    cpu_count_physical = psutil.cpu_count(logical=False)
    cpu_percent = psutil.cpu_percent()
    cpu_stats = psutil.cpu_stats()
    disk = psutil.disk_usage('/')
    mem = psutil.virtual_memory()
    swap_mem = psutil.swap_memory()
    uptime = time.time() - psutil.boot_time()
    return {
        'active_proc': active_proc,
        'uptime': f"{uptime:.2f}",
        'cpu_percent': cpu_percent,
        'cpu_ctx_switches': cpu_stats.ctx_switches,
        'cpu_interrupts': cpu_stats.interrupts,
        'cpu_soft_interrupts': cpu_stats.soft_interrupts,
        'cpu_syscalls': cpu_stats.syscalls,
        'cpu_count_logical': cpu_count_logical,
        'cpu_count_physical': cpu_count_physical,
        'mem_available': mem.available,
        'mem_used': mem.used,
        'mem_percent': mem.percent,
        'disk_total': disk.total,
        'disk_used': disk.used,
        'disk_free': disk.free,
        'disk_percent': disk.percent,
        'swap_mem_used': swap_mem.used,
        'swap_mem_free': swap_mem.free,
        'swap_mem_percent': swap_mem.percent
    }

csv_file_path = 'system_info.csv'

# Escribir encabezados del CSV
with open(csv_file_path, 'w', newline='') as csvfile:
    fieldnames = get_system_info().keys()
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

while True:
    system_info = get_system_info()
    
    # Escribir la información en el CSV
    with open(csv_file_path, 'a', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writerow(system_info)
    
    print(system_info)
    time.sleep(2)
