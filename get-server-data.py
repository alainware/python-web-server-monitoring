import psutil
import time
def get_system_info():
    cpu_percent = psutil.cpu_percent()
    mem = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    return {
        'cpu_percent': cpu_percent,
        'mem_available': mem.available,
        'mem_used': mem.used,
        'mem_percent': mem.percent,
        'disk_total': disk.total,
        'disk_used': disk.used,
        'disk_free': disk.free,
        'disk_percent': disk.percent
    }
while True:
    system_info = get_system_info()
    print(system_info)
    time.sleep(2)
