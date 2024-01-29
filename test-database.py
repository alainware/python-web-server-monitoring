import firebase_admin
from firebase_admin import db, credentials
cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred, {"databaseURL": "https://server-monitoring-db-default-rtdb.firebaseio.com/"})
# creating reference to root node
root = db.reference("/")
print(root.get())
# set operation
db.reference("/cpu_usage").set(10)
db.reference("/disk_usage").set(50)
print(root.get())
print(db.reference("/cpu_usage").get())