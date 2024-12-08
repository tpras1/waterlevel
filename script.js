// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//const { or } = require("firebase/firestore/lite");

//import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  

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
//const app =initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
//intializeApp(firebaseConfig);
const database = firebase.database();
let cdrtopic ;
let sdrtopic ;
let csotopic ;
let ssotopic ;
let centrtopic ; 
let sentrtopic ;
let cfftopic ;
let sfftopic ;
let cdngtopic ;
let sdngtopic ;
let ccytopic  ;
let scytopic ;
let clrtopic ;
let slrtopic ;
let cmrtopic  ;
let smrtopic ;
                let cdngltopic ;
                let cpndtopic ; 
                let cdngrtopic ;  
                let centltopic ;   
                let ckhntopic ;
                let clvngtopic ; 
                let cmbrtopic ;
                let cbdrtopic ;
                let cwatopic;
                let cbroker ; 
                let sdngltopic ;
                let spndtopic ; 
                let sdngrtopic  ;  
                let sentltopic ;   
                let skhntopic ;
                let slvngtopic ; 
                let smbrtopic ;
                let sbdrtopic ;
                let swatopic;
                let sbroker ; 
                let per ;
                let parisho ;        

loadParm();
loadupayogi();

function showSection(sectionId) 
  {
      if (sessionStorage.getItem('loggedIn'))

              {
                  var sections = document.getElementsByClassName('section');
                  for (var i = 0; i < sections.length; i++) 
                    {
                      sections[i].classList.remove('active');
                  }
                  document.getElementById(sectionId).classList.add('active');
              }

  }
function removesection()
    {
      var sections = document.getElementsByClassName('section');
      for (var i = 0; i < sections.length; i++) 
        {
          sections[i].classList.remove('active');
    }
    }

function showSwitch(switchID) 
        {
            var sections = document.getElementsByClassName('Switch');
            for (var i = 0; i < sections.length; i++) {
                sections[i].classList.remove('active');
            }
            document.getElementById(switchID).classList.add('active');
        }

    
function removesection()
    {
      var sections = document.getElementsByClassName('section');
      for (var i = 0; i < sections.length; i++) {
          sections[i].classList.remove('active');
    }
    }

function onMessageReceived(topic, message) 
{
  console.log(`Message received on topic '${topic}': ${message.toString()}`);
  // document.getElementById("msg").innerHTML = "Message received on topic:     " + topic + message.toString();

  // Convert the MQTT message to a string and try to parse it as JSON
  if (topic === "TANKTK")
  {
    /*document.getElementById("msg").innerHTML= "TOPIC EPROMDATA "; */
    try { 
      var jsonData = JSON.parse(message.toString());

       /*document.getElementById("msg").innerHTML= "json done ";*/
       
      // Check if required parameters exist in the JSON
      var statusElement = document.getElementById("status");
      var toggle1Element = document.getElementById("toggle1");
      var rotorElement = document.querySelector('.rotor');
      var drystatusElement = document.getElementById("drystatus");


      if ( jsonData.motor_status=== "on") {
        statusElement.innerHTML = "Water Pump ON";
        toggle1Element.checked = true;
          rotorElement.style.animationPlayState = 'running';
    } else {
        statusElement.innerHTML = "Water Pump OFF";
        toggle1Element.checked = false;
        rotorElement.style.animationPlayState = 'paused';
    }

    switch (jsonData.dryRun_status) 
    {
      case "1":
          drystatusElement.innerHTML = "Pump Dry Run Detected";
          break;
      case "2":
          drystatusElement.innerHTML = "Pumping water";
          break;
      case "3":
          drystatusElement.innerHTML = "Pump OFF Due to Dry Run";
          break;
      case "0":
          drystatusElement.innerHTML = "Pump OFF";
          break;
      case "5":
          drystatusElement.innerHTML = "Pump OFF Due to Tank Full";
          break;
      case "4":
          drystatusElement.innerHTML = "Sensor Error";
          break;
    
      default:
          drystatusElement.innerHTML = "Unknown Status";
          break;
    }

    document.getElementById("MIN_display").innerHTML = jsonData.MIND;
    document.getElementById("MAX_display").innerHTML = jsonData.MAXD;
    document.getElementById("MIN").value = jsonData.MIND;
    document.getElementById("MAX").value = jsonData.MAXD;


    var height = jsonData.liters/1.4 ; // Adjust the multiplier based on your requirement
            var liquidlevel =jsonData.liters.toFixed(0);
            document.getElementById("liquid").style.height = height + "%"; // Assuming you have an element with id="container" to set the height
           document.getElementById("beaker").innerHTML= liquidlevel ;

           document.getElementById("tank_height").value= jsonData.tank_h;


          //document.getElementById("mqttBroker").value = jsonData.mqttbrokere;
          //document.getElementById("mqttopic").value = jsonData.mqtttopice;
          //document.getElementById("baudrate").value = jsonData.baudratee;
          //document.getElementById("bit").value = jsonData.bite;
          //document.getElementById("parity").value = jsonData.paritye;
          //document.getElementById("apn").value = jsonData.apne;
          //document.getElementById("slaveid").value= jsonData.slaveide;
          //document.getElementById("command").value = jsonData.commande;
          //document.getElementById("startaddr").value = jsonData.startaddre;
          //document.getElementById("noreg").value = jsonData.norege;
          //document.getElementById("writedata").value = jsonData.writedatae;
          //document.getElementById("mqttport").value = jsonData.mqttporte;

  }



   catch (e) 
  {
      console.error("Error parsing JSON message:", e);
      //document.getElementById("response").innerHTML = "Error parsing JSON message" + e ;
  }
}
          if(topic=== "SWSTATPAV")
          {

            document.getElementById("mqtt-topic").innerHTML ="SWSTATPAV RECD"

          }


}
// Callback function after a successful subscription
function onSubscriptionSuccess(err) 
      {
      if (!err) 
        {
          console.log("Successfully subscribed to topic");
      } 
      else 
      {
          console.error("Error subscribing to topic:", err);
      }
      }

// Connect to the MQTT broker
const client = mqtt.connect('wss://test.mosquitto.org:8081/mtqt');  // Replace with your broker URL

// When the client connects to the broker
client.on('connect', function () 
  {
  console.log("Connected to broker");

  // Subscribe to the topic with a callback for the subscription
client.subscribe('TANKTK', onSubscriptionSuccess);
  });

// When a message is received
client.on('message', onMessageReceived);


function sendRanges() 
  {
  var minRange = document.getElementById("MIN").value;
  var maxRange = document.getElementById("MAX").value;


    // Prepare the JSON data
    var data = {
      min: minRange ,
      max: maxRange
    };

    // Connect to the MQTT broker
    const client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');

    client.on('connect', function () {
      console.log('Connected to MQTT broker');
      client.publish('configRange', JSON.stringify(data), function (err) {
        if (err) {
          //document.getElementById("response").innerHTML = "Error publishing: " + err;
        } else {
          //document.getElementById("response").innerHTML = "Communication & Register Data published successfully! -Through VFDSETT";
         // document.getElementById("msg").innerHTML = "submitted JSON thorugh topicVFDSETT :     " + JSON.stringify(data);
          client.end();
        }
      });
    });

    // Handle connection errors
    client.on('error', function (err) {
      console.log('Connection error:', err);
      //document.getElementById("response").innerHTML = "MQTT connection error: " + err;
    });
  }

function sendHeight() 
  {
  var TANK_H = document.getElementById("tank_height").value;


    // Prepare the JSON data
    var data = {
      tnkheight:TANK_H
    };

    // Connect to the MQTT broker
    const client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');

    client.on('connect', function () {
      console.log('Connected to MQTT broker');
      client.publish('configRange', JSON.stringify(data), function (err) {
        if (err) {
          //document.getElementById("response").innerHTML = "Error publishing: " + err;
        } else {
          //document.getElementById("response").innerHTML = "Communication & Register Data published successfully! -Through VFDSETT";
         // document.getElementById("msg").innerHTML = "submitted JSON thorugh topicVFDSETT :     " + JSON.stringify(data);
          client.end();
        }
      });
    });

    // Handle connection errors
    client.on('error', function (err) {
      console.log('Connection error:', err);
      //document.getElementById("response").innerHTML = "MQTT connection error: " + err;
    });
  }

function toggleMotor()
  {
  
    const checkbox = document.getElementById('toggle1');
    const toggle = checkbox.checked ? "on" : "off"; 
  
    // Prepare the JSON data
    var data = {
      toggle:toggle
    };

    // Connect to the MQTT broker
    const client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');

    client.on('connect', function () {
      console.log('Connected to MQTT broker');
      client.publish('configRange', JSON.stringify(data), function (err) {
        if (err) {
          //document.getElementById("response").innerHTML = "Error publishing: " + err;
        } else {
          //document.getElementById("response").innerHTML = "Communication & Register Data published successfully! -Through VFDSETT";
         // document.getElementById("msg").innerHTML = "submitted JSON thorugh topicVFDSETT :     " + JSON.stringify(data);
          client.end();
        }
      });
    });

    // Handle connection errors
    client.on('error', function (err) {
      console.log('Connection error:', err);
      //document.getElementById("response").innerHTML = "MQTT connection error: " + err;
    });
  }



function login() 
  {
    // Hard-coded credentials
    // Get values from input fields
    const peru ="admin";
    const parishod ="tpras123";
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Check if credentials are correct
    //if (username === per && password === parisho )
    if (username === peru && password === parishod )


      {
        document.getElementById("errorMessage").textContent = "Login Successfull";
        sessionStorage.setItem('loggedIn', true);
        // Show app content and hide login
        const element = document.getElementById('loginContainer');
        element.style.display = 'none';
        const element1 = document.getElementById('logintab');
        element1.style.display = 'none';
        const element2 = document.getElementById('logouttab');
        element2.style.display = 'block';

    } 
    
    else 
    {
        document.getElementById("errorMessage").textContent = "Invalid username or password";
    }
  }



function logout() 
  {
  // Clear login status and redirect to login screen
  sessionStorage.removeItem('loggedIn');
  const element3 = document.getElementById('logintab');
  element3.style.display = 'block';
  //document.getElementById('login-screen').classList.remove('hidden');
 // document.getElementById('app-content').classList.add('hidden');
  /*removesection();*/
  document.getElementById("username").value="";
  document.getElementById("password").value="";
  showLogin();
  document.getElementById("errorMessage").textContent = "logged out , login to access Dashboard";
  }


window.onload = function() 
    {
        if (sessionStorage.getItem('loggedIn'))  
          
          {
          document.getElementById('login-screen').classList.add('hidden');
        // document.getElementById('app-content').classList.remove('hidden');
        }
    };
      let isOn = false;
      function showLogin() {
        document.getElementById("loginContainer").style.display = "block";
    }

        


function toggleSwitch(IDS,SW) 
        {
          const SwitchImage = document.getElementById(IDS);
          if (SwitchImage !== tv1s && SwitchImage !== snd1s)
          {
          
          if (isOn) 
    
            {
              SwitchImage.src = "./assets/images/sw_off.png";
              SwitchImage.alt = "Switch OFF";
              const swtopic = get_topic(SW);
              const swtatoff = get_stat(SW);
             //const swit = get_switch(SW)
              publish_sw_stat(swtopic,"switch",swtatoff);
              /*publishV_OFF()*/
          } 
          else 
          {
              SwitchImage.src = "./assets/images/sw_on.png";
              SwitchImage.alt = "Switch  ON";
              const swtopic = get_topic(SW);
              const swtaton = get_stat_on(SW);
             //const swit = get_switch(SW)
              publish_sw_stat(swtopic,"switch",swtaton);
              /*publishV_ON();*/
          }
          isOn = !isOn;
        }
        if (SwitchImage == tv1s || SwitchImage == snd1s)
        {
          if (isOn) 
    
            {
              SwitchImage.src = "./assets/images/sw_15A_off.png";
              SwitchImage.alt = "Switch OFF";
              const swtopic = get_topic(SW);
              const swtatoff = get_stat(SW);
             //const swit = get_switch(SW)
              publish_sw_stat(swtopic,"switch",swtatoff);
              /*publishV_OFF();*/
          } 
          else 
          {
              SwitchImage.src = "./assets/images/sw_15A_on.png";
              SwitchImage.alt = "Switch  ON";
              const swtopic = get_topic(SW);
              const swtaton = get_stat_on(SW);
             //const swit = get_switch(SW)
              publish_sw_stat(swtopic,"switch",swtaton);
              /*publishV_ON();*/
          }
          isOn = !isOn;
        }
      }
    

      //let lvrm = cmrtopic;
      //let lvrc = ccytopic ;
      //let lvrf = cfftopic ;
      //let lvrd = cdngtopic;
      //let lvrl = clrtopic ;



      document.getElementById('openbtnM').addEventListener('click', () => toggleopen('lvrmbdo', 'lvrmbds','lvrmbdc',cmrtopic));
      document.getElementById('stopbtnM').addEventListener('click', () => togglestp('lvrmbdo', 'lvrmbds','lvrmbdc',cmrtopic));
      document.getElementById('closebtnM').addEventListener('click', () => toggleclose('lvrmbdo', 'lvrmbds','lvrmbdc',cmrtopic));
      
      document.getElementById('openbtnC').addEventListener('click', () => toggleopen('lvrctdo', 'lvrctds','lvrctdc',ccytopic));
      document.getElementById('stopbtnC').addEventListener('click', () => togglestp('lvrctdo', 'lvrctds','lvrctdc',ccytopic));
      document.getElementById('closebtnC').addEventListener('click', () => toggleclose('lvrctdo', 'lvrctds','lvrctdc',ccytopic));
      
      document.getElementById('openbtnF').addEventListener('click', () => toggleopen('lvrffro', 'lvrffrs','lvrffrc',cfftopic));
      document.getElementById('stopbtnF').addEventListener('click', () => togglestp('lvrffro', 'lvrffrs','lvrffrc',cfftopic));
      document.getElementById('closebtnF').addEventListener('click', () => toggleclose('lvrffro', 'lvrffrs','lvrffrc',cfftopic));

      document.getElementById('openbtnD').addEventListener('click', () => toggleopen('lvrdnro', 'lvrdnrs','lvrdnrc',cdngtopic));
      document.getElementById('stopbtnD').addEventListener('click', () => togglestp('lvrdnro', 'lvrdnrs','lvrdnrc',cdngtopic));
      document.getElementById('closebtnD').addEventListener('click', () => toggleclose('lvrdnro', 'lvrdnrs','lvrdnrc',cdngtopic));

      document.getElementById('openbtnL').addEventListener('click', () => toggleopen('lvrlrmo', 'lvrlrms','lvrlrmc',clrtopic));
      document.getElementById('stopbtnL').addEventListener('click', () => togglestp('lvrlrmo', 'lvrlrms','lvrlrmc',clrtopic));
      document.getElementById('closebtnL').addEventListener('click', () => toggleclose('lvrlrmo', 'lvrlrms','lvrlrmc',clrtopic)); 
      
      let isp = false;
      
function toggleopen(OIMGID, SIMGID,CIMGID,area) 
      {
          const openImage = document.getElementById(OIMGID);
          const stopImage = document.getElementById(SIMGID);
          const closeImage = document.getElementById(CIMGID);

          if (isp) {
              // Start OFF state
              //startImage.src = "./assets/images/strt_u.png";
              //startImage.alt = "start OFF";
              //stopImage.src = "./assets/images/stp.png";
              //stopImage.alt = "stop ON";
          } else {
              // Start ON state
              openImage.src = "./assets/images/open.png";
              publish_sw_stat(area,"switch","off2");
              publish_sw_stat(area,"switch","off1");
              publish_sw_stat(area,"switch","on0");
              openImage.alt = "start ON";
              stopImage.src = "./assets/images/stp_u.png";
              stopImage.alt = "stop OFF";
              closeImage.src = "./assets/images/close_u.png";

          }
          isp = !isp;
      }
      
function togglestp(OIMGID, SIMGID,CIMGID,area) {
          const openImage = document.getElementById(OIMGID);
          const stopImage = document.getElementById(SIMGID);
          const closeImage = document.getElementById(CIMGID);
      
          if (isp) {
              // Stop ON state
              stopImage.src = "./assets/images/stp.png";
              publish_sw_stat(area,"switch","off2");
              publish_sw_stat(area,"switch","off0");
              publish_sw_stat(area,"switch","on1");
             
              stopImage.alt = "stop ON";
              openImage.src = "./assets/images/open_u.png";
              openImage.alt = "start OFF";
              closeImage.src = "./assets/images/close_u.png";

          } else {
              // Stop OFF state
              //stopImage.src = "./assets/images/stp_u.png";
              //stopImage.alt = "stop OFF";
              //startImage.src = "./assets/images/strt.png";
              //startImage.alt = "start ON";
          }
          isp = !isp;
      }
      

function toggleclose(OIMGID, SIMGID,CIMGID,area) 
      {
        const openImage = document.getElementById(OIMGID);
        const stopImage = document.getElementById(SIMGID);
        const closeImage = document.getElementById(CIMGID);
    
        if (isp) {
            // Stop ON state
            //stopImage.src = "./assets/images/stp.png";
            //stopImage.alt = "stop ON";
            //openImage.src = "./assets/images/open_u.png";
            //openImage.alt = "start OFF";

        } else {
            // Stop OFF state
            openImage.src = "./assets/images/open_u.png";
            publish_sw_stat(area,"switch","off1");
            publish_sw_stat(area,"switch","off0");
            publish_sw_stat(area,"switch","on2");
            openImage.alt = "start ON";
            stopImage.src = "./assets/images/stp_u.png";
            stopImage.alt = "stop OFF";
            closeImage.src = "./assets/images/close.png";
        }
        isp = !isp;
    }


function publish_sw_stat(swtopic,SWID,STAT)
    {
 
    // Prepare the JSON data
    var data = {}
      data[SWID]= STAT;      
    
    // Connect to the MQTT broker
    //const client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');
    const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

    client.on('connect', function () {
      console.log('Connected to MQTT broker');
      client.publish(swtopic, JSON.stringify(data), function (err) {
        if (err) {
          //document.getElementById("response").innerHTML = "Error publishing: " + err;
        } else {
          //document.getElementById("response").innerHTML = "Communication & Register Data published successfully! -Through VFDSETT";
         document.getElementById("mqtt-topic").innerHTML = "Topic:"+swtopic +"<br>"+ JSON.stringify(data);
          client.end();
        }
      });
    });

    // Handle connection errors
    client.on('error', function (err) {
      console.log('Connection error:', err);
      //document.getElementById("response").innerHTML = "MQTT connection error: " + err;
    });
    }

function publish_louver(LID,LSTAT,lvr_topic)
    {
  
    /*const checkbox = document.getElementById('toggle1');*/
    /*const toggle = STAT*/
  
    // Prepare the JSON data
    var data = {}
      data[LID] = LSTAT ;
    
//LOUVER:LID+LSTAT 


    // Connect to the MQTT broker
    //const client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');
    const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');
    client.on('connect', function () {
      console.log('Connected to MQTT broker');
      client.publish(lvr_topic, JSON.stringify(data), function (err) {
        if (err) {
          document.getElementById("mqtt-topic").innerHTML = "Error publishing: " + err;
        } else {
          //document.getElementById("response").innerHTML = "Communication & Register Data published successfully! -Through VFDSETT";
         document.getElementById("mqtt-topic").innerHTML = topic + JSON.stringify(data);
          client.end();
        }
      });
    });

    // Handle connection errors
    client.on('error', function (err) {
      console.log('Connection error:', err);
      //document.getElementById("response").innerHTML = "MQTT connection error: " + err;
    });
    }

function lghtindctr(IDS,STAT) 
        {
          const LTIMG = document.getElementById(IDS);
          const LTIMGP = document.getElementById(IDS + "P" );
          const swimg = document.getElementById(IDS + "s" );
          //if (SwitchImage !== swimg6 && SwitchImage !== swimg5)
         document.getElementById("mqtt-topic").innerHTML = IDS +":"+STAT;
          
          if (STAT =="ON") 
    
            {
              LTIMG.src = "./assets/images/light_on.png";
              swimg.src = "./assets/images/sw_on.png";
              LTIMG.alt = "lton";
             // LTIMGP.src= "./assets/images/light_on_w.png";
             
          } 
        if (STAT =="OFF")
          {
              LTIMG.src = "./assets/images/light_off.png";
              LTIMG.alt = "ltoff";
              swimg.src = "./assets/images/sw_off.png";
             // LTIMGP.src= "./assets/images/light_off_b.png";
          }
          
        }
 /* fetchSWSTAT() ;*/


function lvrstat(ids, stat) 
              {
                const lvrimgo= document.getElementById(ids + "o"); 
                const lvrimgc= document.getElementById(ids + "c");
                const lvrimgs= document.getElementById(ids + "s");

            if(stat=="opn")
                {

                  lvrimgo.src= "./assets/images/open.png";
                  lvrimgc.src=  "./assets/images/close_u.png";
                  lvrimgs.src=  "./assets/images/stp_u.png";
                }
            if(stat=="cls")
                  {
                    lvrimgo.src= "./assets/images/open_u.png";
                    lvrimgc.src=  "./assets/images/close.png";
                    lvrimgs.src=  "./assets/images/stp_u.png"; 
                  }
            if(stat=="stp")
                  {
                    lvrimgo.src= "./assets/images/open_u.png";
                    lvrimgc.src=  "./assets/images/close_u.png";
                    lvrimgs.src=  "./assets/images/stp.png"; 
                  }

                }

function purgelt(key) 
                      {
                          return key.slice(2, -1);                      
                      }

function purgelvr(key) 
                      {
                          return key.slice(3);                      
                      }               

function show_ltswbrd(swid)
        {
                const swbrd = purgelt(swid);

                switch (swbrd) 
                {
                  case "d":
                    showSwitch('Drawing-Room');
                      break;
                  case "entr":
                    showSwitch('Entrance-Right');
                      break;
                  case "so":
                    showSwitch('SIT-OUT');
                    break;
                  default: 
                      break;
                }
        }
function show_lrswbrd(lvrid)
        {
                const lvrbrd = purgelvr(lvrid);

                switch (lvrbrd) 
                {
                  case "mbd":
                    showSwitch('curtain');
                      break;
                  case "ctd":
                    showSwitch('louvers');
                      break;
                  case "ffr":
                    showSwitch('louvers');
                      break;
                  case "dnr":
                    showSwitch('louvers');
                      break;
                  case "lrm":
                    showSwitch('louvers');
                      break;

                  default: 
                      break;
                }
        }

            function get_topic(SW)
            
                    {
                      const swtopic= SW;
                                      if ( swtopic.startsWith ("D"))
                                      {
                                        //return localStorage.getItem('drsws');
                                        return cdrtopic
                                        //return "pavithram/Ediys4245028/command";
                                      }

                                      if ( swtopic.startsWith ("S"))
                                      {
                                        //return localStorage.getItem('sosws');
                                        return cdrtopic
                                          //return "pavithram/Ediys4245028/command";
                                      }

                                      if ( swtopic.startsWith ("E"))
                                      {
                                        //return localStorage.getItem('entrsws');
                                        return centrtopic
                                          //return "pavithram/Ediys4245028/command";
                                      }
                                        
                    }
                    


            function get_stat(SW)
                  {
                      const prestat = SW.slice(-1);
                     const nprestat = prestat - 1 ;
                      const onstat = "off"+nprestat;
                      return onstat;
            
                  }

            function get_stat_on(SW)
                  {
                    const prestat = SW.slice(-1);
                    const nprestat = prestat - 1 ;
                    const onstat = "on"+nprestat;
                    return onstat;
                  }


function onMessageReceived1(topic, message) 
    {
  console.log(`Message received on topic '${topic}': ${message.toString()}`);

  if (topic === "SWSTATPAV")
          {
          
            try 
          
                { 
                      var data1 = JSON.parse(message.toString());
                      document.getElementById('AMP').setAttribute('data-value', data1.pcur);
                    document.getElementById('vlt').setAttrhibute('data-value', data1.pvlt);

                  Object.entries(data1).forEach(([key, value]) => {
                      console.log(`Processing Key: ${key}, Value: ${value}`);
                      document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${value}<br>`;
                    
                     /* if (key.startsWith("lt")) 
                        {
                        show_ltswbrd(key); 
                        lghtindctr(key, value);
                        }

                      if (key.startsWith("lvr")) 
                        {
                          show_lrswbrd(key);
                          lvrstat(key, value);     
                        }     */
                    });
                  }
        catch (e) 
                    {
                        console.error("Error parsing JSON message:", e);
                        //document.getElementById("response").innerHTML = "Error parsing JSON message" + e ;
                    }
          }

  if (topic === sdrtopic )
          {
              try
                  {
                    var data1 = JSON.parse(message.toString());   
                    Object.entries(data1).forEach(([key, value]) => {
                      console.log(`Processing Key: ${key}, Value: ${value}`);
                      document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${value}<br>`;

                              const drs = parseInt(key.slice(-1), 10);
                              const drp = drs + 1;
                               const keym = "ltd"+ drp; 
                                show_ltswbrd(keym); 
                                lghtindctr(keym, value);
                    });
                  }
                  catch (e) 
                  {
                      console.error("Error parsing JSON message:", e);
                      //document.getElementById("response").innerHTML = "Error parsing JSON message" + e ;
                  }     
          }

  if (topic === ssotopic )

          {
              try
                    {
                      var data1 = JSON.parse(message.toString());   
                      Object.entries(data1).forEach(([key, value]) => {
                        console.log(`Processing Key: ${key}, Value: ${value}`);

                        document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${value}<br>`;

                                const dso = parseInt(key.slice(-1), 10);
                              
                                const pso = dso + 1;
                                const keym = "ltso"+ pso; 
                                  show_ltswbrd(keym); 
                                  lghtindctr(keym, value);
                      });
                    }
              catch (e) 
                    {
                        console.error("Error parsing JSON message:", e);
                        //document.getElementById("response").innerHTML = "Error parsing JSON message" + e ;
                    }     


          }
  if (topic === sentrtopic )

    {
        try
              {
                var data1 = JSON.parse(message.toString());   
                Object.entries(data1).forEach(([key, value]) => {
                  console.log(`Processing Key: ${key}, Value: ${value}`);
                  document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${value}<br>`;

                          const nent = parseInt(key.slice(-1), 10);
                          const pent = nent + 1 ;
                          const keym = "ltentr"+ pent; 
                            show_ltswbrd(keym); 
                            lghtindctr(keym, value);
                });
              }
        catch (e) 
              {
                  console.error("Error parsing JSON message:", e);
                  //document.getElementById("response").innerHTML = "Error parsing JSON message" + e ;
              }     
    }
  if (topic === sfftopic )

      {
          try
                {
                  var data1 = JSON.parse(message.toString());   
                  Object.entries(data1).forEach(([key, value]) => {
                    console.log(`Processing Key: ${key}, Value: ${value}`);
                    document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${value}<br>`;
                           
                    if (key === "switch0" && value=="ON")
                                {
                            const keym = "lvrffr" ;
                              show_ltswbrd(keym); 
                              lghtindctr(keym,"opn");
                              }

                    if (key === "switch1" && value=="ON")
                                {
                            const keym = "lvrffr" ;
                              show_ltswbrd(keym); 
                              lghtindctr(keym,"stp");
                              }
                    if (key === "switch2" && value=="ON")
                                {
                            const keym = "lvrffr" ;
                              show_ltswbrd(keym); 
                              lghtindctr(keym,"cls");
                              }         
                            
                  });

                }
                catch (e) 
                {
                    console.error("Error parsing JSON message:", e);
                    //document.getElementById("response").innerHTML = "Error parsing JSON message" + e ;
                } 
  
    }

    if (topic === sdngtopic )

      {
          try
                {
                  var data1 = JSON.parse(message.toString());   
                  Object.entries(data1).forEach(([key, value]) => {
                    console.log(`Processing Key: ${key}, Value: ${value}`);
                    document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${value}<br>`;
                           
                    if (key === "switch0" && value=="ON")
                                {
                            const keym = "lvrdnr" ;
                              show_ltswbrd(keym); 
                              lghtindctr(keym,"opn");
                              }

                    if (key === "switch1" && value=="ON")
                                {
                            const keym = "lvrdnr" ;
                              show_ltswbrd(keym); 
                              lghtindctr(keym,"stp");
                              }
                    if (key === "switch2" && value=="ON")
                                {
                            const keym = "lvrdnr" ;
                              show_ltswbrd(keym); 
                              lghtindctr(keym,"cls");
                              }         
                            
                  });

                }
                catch (e) 
                {
                    console.error("Error parsing JSON message:", e);
                    //document.getElementById("response").innerHTML = "Error parsing JSON message" + e ;
                } 
  
    }
    if (topic === scytopic )

      {
          try
                {
                  var data1 = JSON.parse(message.toString());   
                  Object.entries(data1).forEach(([key, value]) => {
                    console.log(`Processing Key: ${key}, Value: ${value}`);
                    document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${value}<br>`;
                           
                    if (key === "switch0" && value=="ON")
                                {
                            const keym = "lvrctd" ;
                              show_ltswbrd(keym); 
                              lghtindctr(keym,"opn");
                              }

                    if (key === "switch1" && value=="ON")
                                {
                            const keym = "lvrctd" ;
                              show_ltswbrd(keym); 
                              lghtindctr(keym,"stp");
                              }
                    if (key === "switch2" && value=="ON")
                                {
                            const keym = "lvrctd" ;
                              show_ltswbrd(keym); 
                              lghtindctr(keym,"cls");
                              }         
                            
                  });

                }
                catch (e) 
                {
                    console.error("Error parsing JSON message:", e);
                    //document.getElementById("response").innerHTML = "Error parsing JSON message" + e ;
                } 
  
    }

    if (topic === smrtopic )

      {
          try
                {
                  var data1 = JSON.parse(message.toString());   
                  Object.entries(data1).forEach(([key, value]) => {
                    console.log(`Processing Key: ${key}, Value: ${value}`);
                    document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${value}<br>`;
                           
                    if (key === "switch0" && value=="ON")
                                {
                            const keym = "lvrmbd" ;
                              show_ltswbrd(keym); 
                              lghtindctr(keym,"opn");
                              }

                    if (key === "switch1" && value=="ON")
                                {
                            const keym = "lvrmbd" ;
                              show_ltswbrd(keym); 
                              lghtindctr(keym,"stp");
                              }
                    if (key === "switch2" && value=="ON")
                                {
                            const keym = "lvrmbd" ;
                              show_ltswbrd(keym); 
                              lghtindctr(keym,"cls");
                              }         
                            
                  });

                }
                catch (e) 
                {
                    console.error("Error parsing JSON message:", e);
                    //document.getElementById("response").innerHTML = "Error parsing JSON message" + e ;
                } 
  
    }

    if (topic === slrtopic  )

      {
          try
                {
                  var data1 = JSON.parse(message.toString());   
                  Object.entries(data1).forEach(([key, value]) => {
                    console.log(`Processing Key: ${key}, Value: ${value}`);
                    document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${value}<br>`;
                           
                    if (key === "switch0" && value=="ON")
                                {
                            const keym = "lvrlrm" ;
                              show_ltswbrd(keym); 
                              lghtindctr(keym,"opn");
                              }

                    if (key === "switch1" && value=="ON")
                                {
                            const keym = "lvrlrm" ;
                              show_ltswbrd(keym); 
                              lghtindctr(keym,"stp");
                              }
                    if (key === "switch2" && value=="ON")
                                {
                            const keym = "lvrlrm" ;
                              show_ltswbrd(keym); 
                              lghtindctr(keym,"cls");
                              }         
                            
                  });

                }
                catch (e) 
                {
                    console.error("Error parsing JSON message:", e);
                    //document.getElementById("response").innerHTML = "Error parsing JSON message" + e ;
                } 
  
    }

 }



// Callback function after a successful subscription
function onSubscriptionSuccess(err) 
        {
          if (!err) 
            {
              console.log("Successfully subscribed to topic");
          } 
          else 
          {
              console.error("Error subscribing to topic:", err);
          }
        }

// Connect to the MQTT broker
      const client1 = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');  // Replace with your broker URL

// When the client connects to the broker
client1.on('connect', function () {
        console.log("Connected to broker");
       // document.getElementById("mqtt-topic").innerHTML = "connected to broker for suscrbtion"
  // Subscribe to the topic with a callback for the subscription

        client1.subscribe( sdrtopic , onSubscriptionSuccess);
        client1.subscribe( ssotopic , onSubscriptionSuccess);
        client1.subscribe( sentrtopic , onSubscriptionSuccess);
        client1.subscribe( sfftopic , onSubscriptionSuccess);
        client1.subscribe( sdngtopic , onSubscriptionSuccess);
        client1.subscribe( scytopic , onSubscriptionSuccess);
        client1.subscribe( slrtopic , onSubscriptionSuccess);
        client1.subscribe( smrtopic , onSubscriptionSuccess);
        
      });
// When a message is received
client1.on('message', onMessageReceived1);

  //const form = document.getElementById('topicsetting');
  const loadtopicBtn = document.getElementById('loadtopic');
  document.getElementById('loadtopic').addEventListener('click', () => loadParm())
function loadParm()
            {
              database.ref('config').get()
              .then((snapshot) => {
                if (snapshot.exists()) {
                  const config = snapshot.val();
                  console.log("Config loaded:", config);
                  cdrtopic = config.drsws;
                  csotopic = config.sosws;
                  centrtopic = config.entrsws;
                  cfftopic = config.ffsws;
                  cdngtopic = config.dngsws;
                  ccytopic  = config.cysws;
                  clrtopic = config.lrsws;
                  cmrtopic = config.mrsws;
                            cdngltopic = config.dnglsws;
                            cpndtopic = config.pndsws;
                            cdngrtopic = config.dngrsws;  
                            centltopic = config.entlsws;   
                            ckhntopic = config.khnsws;
                            clvngtopic = config.lvngsws; 
                            cmbrtopic = config.mbrsws;
                            cbdrtopic = config.bdrsws;
                            cwatopic = config.wasws;
                            cbroker = config.brokers; 

                  //const mq_broker = config.mqtt_broker;
                  document.getElementById('drsw').value = cdrtopic;
                  document.getElementById('sosw').value = csotopic;
                  document.getElementById('entrsw').value = centrtopic;
                  document.getElementById('ffsw').value = cfftopic;
                  document.getElementById('dngsw').value =  cdngtopic;
                  document.getElementById('cysw').value = ccytopic ;
                  document.getElementById('lrsw').value = clrtopic;
                  document.getElementById('mrsw').value = cmrtopic;

              document.getElementById('dnglsw').value = cdngltopic;
              document.getElementById('pndsw').value = cpndtopic ;
              document.getElementById('dngrsw').value = cdngrtopic;
              document.getElementById('entlsw').value = centltopic;
              document.getElementById('khnsw').value = ckhntopic;
              document.getElementById('lvngsw').value = clvngtopic; 
              document.getElementById('mbrsw').value = cmbrtopic;
              document.getElementById('bdrsw').value = cbdrtopic ;
              document.getElementById('wasw').value = cwatopic;
              document.getElementById('broker').value = cbroker;

                  sdrtopic = cdrtopic.replace("command", "status");
                  ssotopic = csotopic.replace("command", "status");
                  sentrtopic = centrtopic.replace("command", "status");
                  sfftopic = cfftopic.replace("command", "status");
                  sdngrtopic = cdngrtopic.replace("command", "status");
                  scytopic = ccytopic.replace("command", "status");
                  slrtopic = clrtopic.replace("command", "status");
                  smrtopic = cmrtopic.replace("command", "status");

                  sdngltopic = cdngltopic.replace("command", "status");
                  spndtopic = cpndtopic.replace("command", "status");
                  sdngrtopic = cdngrtopic.replace("command", "status");
                  sentltopic =  centltopic.replace("command", "status");
                  skhntopic = ckhntopic.replace("command", "status");
                  slvngtopic = clvngtopic.replace("command", "status");
                  smbrtopic = cmbrtopic.replace("command", "status");
                  sbdrtopic= cbdrtopic.replace("command", "status");
                  swatopic = cwatopic.replace("command", "status");
                  sbroker= cbroker.replace("command", "status");
                 // document.getElementById("mqtt-topic").innerHTML ="Broker:"+mq_broker;

                } else {
                  console.log("No config found.");
                }
              })
              .catch((error) => {
                console.error("Error fetching config:", error);
              });

          }



          const form = document.getElementById('topicsetting');
          form.addEventListener('submit', async(event)=>  
          // Event listener for Save button
          {

           event.preventDefault();
          
                  const drswsc = document.getElementById('drsw').value;
                  const soswsc = document.getElementById('sosw').value;
                  const entrswc = document.getElementById('entrsw').value;
                  const ffswsc = document.getElementById('ffsw').value;
                  const dngswc = document.getElementById('dngsw').value;
                  const cyswsc = document.getElementById('cysw').value;
                  const lrswsc = document.getElementById('lrsw').value;
                  const mrswsc = document.getElementById('mrsw').value;
                  const dnglswc = document.getElementById('dnglsw').value;
                  const pndswc = document.getElementById('pndsw').value;
                  const dngrswc = document.getElementById('dngrsw').value;
                  const entlswc = document.getElementById('entlsw').value;
                  const khnswc = document.getElementById('khnsw').value;
                  const lvngswc = document.getElementById('lvngsw').value;
                  const mbrswc = document.getElementById('mbrsw').value;
                  const bdrswc = document.getElementById('bdrsw').value;
                  const waswc = document.getElementById('wasw').value;
                  const brokerc = document.getElementById('broker').value;

                    const configD = {
                      drsws : drswsc,
                      sosws : soswsc,
                      entrsws : entrswc,
                      ffsws : ffswsc,
                      dngsws : dngswc,
                      cysws : cyswsc,
                      lrsws : lrswsc,
                      mrsws : mrswsc,
                      dnglsws : dnglswc,
                      pndsws : pndswc,
                      dngrsws : dngrswc,
                      entlsws : entlswc, 
                      khnsws : khnswc,
                      lvngsws : lvngswc, 
                      mbrsws : mbrswc, 
                      bdrsws : bdrswc, 
                      wasws : waswc, 
                      brokers : brokerc
                    }; 
                    document.getElementById("mqtt-topic").innerHTML ="settingpressed";
            saveConfig(configD); 
            upayogi_raksha();
            form.reset();                    
          });


            function saveConfig(configD) 
            {
              database.ref('config').set(configD)
                .then(() => {
                  console.log("Config saved successfully!");
                  alert("Configuration saved successfully!");
                })
                .catch((error) => {
                  console.error("Error saving config:", error);
                  alert("An error occurred while saving the configuration.");
                });
                
            }


function upayogi_raksha()
{
const upayogi=
{
peru:"thekki",
check:"thekki2875"
};
saveConfig(upayogi)
}           

function saveConfig(upayogi) 
            {
              database.ref('upayogi').set(upayogi)
                .then(() => {
                  console.log("Config saved successfully!");
                  alert("Configuration saved successfully!");
                })
                .catch((error) => {
                  console.error("Error saving config:", error);
                  alert("An error occurred while saving the configuration.");
                });
                
            }

function loadupayogi()
            {
              database.ref('upayogi').get()
              .then((snapshot) => {
                if (snapshot.exists()) {
                  const upayogi = snapshot.val();
                  console.log("upayogi loaded:", upayogi);
                  parisho = upayogi.check;
                  per = upayogi.peru;

                 // document.getElementById("mqtt-topic").innerHTML ="Broker:"+mq_broker;

                } else {
                  console.log("No upayogi found.");
                }
              })
              .catch((error) => {
                console.error("Error fetching upayogi:", error);
              });

          }
    