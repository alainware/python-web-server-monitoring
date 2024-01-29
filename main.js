/* Vanilla JS Demo */
const firebaseConfig = {
/* Credentials */
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
