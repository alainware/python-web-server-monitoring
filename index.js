/* Import Firebase Admin */
let admin = require("firebase-admin");
/* Import Credentials */
let serviceAccount = require("./credentials.json");
/* Initialize App */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://server-monitoring-db-default-rtdb.firebaseio.com"
});
/* Globals */
let cpu_usage = admin.database().ref().child('cpu_usage');
let disk_usage = admin.database().ref().child('disk_usage');
/* Event Listeners */
cpu_usage.on("value", (snapshot) => {
    let cpu_usage_value = snapshot.val(); 
    console.log('CPU Usage changed: ' + cpu_usage_value); 
});
disk_usage.on("value", (snapshot) => {
    let cpu_usage_value = snapshot.val(); 
    console.log('Disk Usage changed: ' + cpu_usage_value); 
});
