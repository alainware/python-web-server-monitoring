/* Vanilla JS Demo */
const firebaseConfig = {
  apiKey: "AIzaSyCnilwm_Sh7GD4HgsDtY1i-9jIoV3mI9JA",
  authDomain: "server-monitoring-db.firebaseapp.com",
  databaseURL: "https://server-monitoring-db-default-rtdb.firebaseio.com",
  projectId: "server-monitoring-db",
  storageBucket: "server-monitoring-db.appspot.com",
  messagingSenderId: "202668882586",
  appId: "1:202668882586:web:0f2fec01799e79a2e47d23"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
/* Globals */
let cpu_usage = firebase.database().ref().child('cpu_usage');
let disk_usage = firebase.database().ref().child('disk_usage');
/* Event Listeners */
cpu_usage.on("value", (snapshot) => {
    let cpu_usage_value = snapshot.val();
    let cpu_object = document.getElementById('cpu');
    cpu_object.innerText = cpu_usage_value;
    console.log('CPU Usage changed: ' + cpu_usage_value); 
});
disk_usage.on("value", (snapshot) => {
    let disk_usage_value = snapshot.val();
    let disk_object = document.getElementById('disk');
    disk_object.innerText = disk_usage_value;
    console.log('Disk Usage changed: ' + disk_usage_value); 
});
