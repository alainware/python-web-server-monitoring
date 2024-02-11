# Libraries
import firebase_admin
from firebase_admin import db, credentials
import psutil
import time
# Functions


def get_system_info():
    cpu_percent = psutil.cpu_percent()
    mem = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    return {
        'cpu_usage': cpu_percent,
        'mem_available': mem.available,
        'mem_used': mem.used,
        'memory_usage': mem.percent,
        'disk_total': disk.total,
        'disk_used': disk.used,
        'disk_free': disk.free,
        'disk_usage': disk.percent
    }


# Globals
cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(
    cred, {"databaseURL": "https://server-monitoring-db-default-rtdb.firebaseio.com/"})
while True:
    system_info = get_system_info()
    # Set operation
    print(f"{system_info['cpu_usage']}%")
    print(f"{system_info['memory_usage']}%")
    print(f"{system_info['disk_usage']}%")
    db.reference("/cpu_usage").set(f"{system_info['cpu_usage']}%")
    db.reference("/memory_usage").set(f"{system_info['memory_usage']}%")
    db.reference("/disk_usage").set(f"{system_info['disk_usage']}%")
    time.sleep(10)
