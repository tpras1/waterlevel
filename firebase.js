import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  const firebaseConfig = {
    apiKey: "AIzaSyC8e-722jurrVxcYETKtF4wAetzAJno3YA",
    authDomain: "iot-hom.firebaseapp.com",
    databaseURL: "https://iot-hom-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iot-hom",
    storageBucket: "iot-hom.firebasestorage.app",
    messagingSenderId: "745178338232",
    appId: "1:745178338232:web:9a8009f242b90dd60f754d",
    measurementId: "G-TKG9J34YM3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const sensorDataRef = ref(database, "sensorData");
const config = ref(database, "config");
const auth = getAuth(app);
export {auth,signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged};

// Function to write data to Firebase
export function writeData(data) 
{
    set(sensorDataRef, data);
}

// Function to read data from Firebase
export function readData(callback) {
    onValue(sensorDataRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}

// Function to read config  data from Firebase 

export function readParam(callback)
{
    onValue(config, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });

}    
/*                   
export function writeParm(configD) 
{
    set(config, configD);
}
*/
export function writeParm(configD) 
{
  
  const config1 = ref(database, "config");
  return set(config1, configD)
   .then(() => alert("Configuration saved successfully!"))
   .catch((error) => console.error("Error writing config:", error));
}


/*export function readParam(callback)
{
  get(config)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      callback(data);
      console.log("Fetched Data:", data);
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

  } */