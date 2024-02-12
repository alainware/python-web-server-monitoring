# Libraries
import pandas as pd
from sklearn import tree
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import firebase_admin
from firebase_admin import db, credentials
import psutil
import time

# Functions
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

# Firebase Globals
cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(
    cred, {"databaseURL": "https://server-monitoring-db-default-rtdb.firebaseio.com/"})
# Read the file
df = pd.read_csv("system_info_with_warning.csv")

# Split the dataset into X and y (inputs and target)
inputs = df.drop('failure_warning', axis='columns')
target = df['failure_warning']

# Split the model into train and test
X_train, X_test, y_train, y_test = train_test_split(inputs, target, test_size=0.2, random_state=42)

# Create the decision tree
# max_depth is used to prevent overfitting
model = tree.DecisionTreeClassifier(min_samples_split=2, max_depth=3)

# Train the model
model.fit(X_train, y_train)

# Get model accuracy on the test set
accuracy = model.score(X_test, y_test)
print(f"Model accuracy on test set: {accuracy}")

# Make predictions
# Ensure that the columns for prediction match the columns used for training
while True:
    system_info = get_system_info()
    prediction_data = [[system_info['active_proc'],system_info['uptime'],system_info['cpu_percent'],system_info['cpu_ctx_switches'],system_info['cpu_interrupts'],system_info['cpu_soft_interrupts'],system_info['cpu_syscalls'],system_info['cpu_count_logical'],system_info['cpu_count_physical'],system_info['mem_available'],system_info['mem_used'],system_info['mem_percent'],system_info['disk_total'],system_info['disk_used'],system_info['disk_free'],system_info['disk_percent'],system_info['swap_mem_used'],system_info['swap_mem_free'],system_info['swap_mem_percent']]]
    prediction_columns = X_train.columns
    prediction_df = pd.DataFrame(prediction_data, columns=prediction_columns)
    prediction = model.predict(prediction_df)
    failure_warning = prediction[0]
    print(f"Prediction for the input: {failure_warning}")
    db.reference("/active_proc").set(f"{system_info['active_proc']}")
    db.reference("/uptime").set(f"{system_info['uptime']}")
    db.reference("/cpu_percent").set(f"{system_info['cpu_percent']}")
    db.reference("/cpu_ctx_switches").set(f"{system_info['cpu_ctx_switches']}")
    db.reference("/cpu_interrupts").set(f"{system_info['cpu_interrupts']}")
    db.reference("/cpu_soft_interrupts").set(f"{system_info['cpu_soft_interrupts']}")
    db.reference("/cpu_syscalls").set(f"{system_info['cpu_syscalls']}")
    db.reference("/cpu_count_logical").set(f"{system_info['cpu_count_logical']}")
    db.reference("/cpu_count_physical").set(f"{system_info['cpu_count_physical']}")
    db.reference("/mem_available").set(f"{system_info['mem_available']}")
    db.reference("/mem_used").set(f"{system_info['mem_used']}")
    db.reference("/mem_percent").set(f"{system_info['mem_percent']}")
    db.reference("/disk_total").set(f"{system_info['disk_total']}")
    db.reference("/disk_used").set(f"{system_info['disk_used']}")
    db.reference("/disk_free").set(f"{system_info['disk_free']}")
    db.reference("/disk_percent").set(f"{system_info['disk_percent']}")
    db.reference("/swap_mem_used").set(f"{system_info['swap_mem_used']}")
    db.reference("/swap_mem_free").set(f"{system_info['swap_mem_free']}")
    db.reference("/swap_mem_percent").set(f"{system_info['swap_mem_percent']}")
    db.reference("/failure_warning").set(f"{failure_warning}")
    time.sleep(30)