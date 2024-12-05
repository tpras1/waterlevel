// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

firebase.initializeApp(firebaseConfig);
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
//loadParm();


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
    const correctUsername = "admin";
    const correctPassword = "tpras2875";

    // Get values from input fields
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if credentials are correct
    if (username === correctUsername && password === correctPassword) 
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
    
    else {
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
    

      document.getElementById('openbtnM').addEventListener('click', () => toggleopen('lvrmbdo', 'lvrmbds','lvrmbdc','lvrmbd'));
      document.getElementById('stopbtnM').addEventListener('click', () => togglestp('lvrmbdo', 'lvrmbds','lvrmbdc','lvrmbd'));
      document.getElementById('closebtnM').addEventListener('click', () => toggleclose('lvrmbdo', 'lvrmbds','lvrmbdc','lvrmbd'));
      
      document.getElementById('openbtnC').addEventListener('click', () => toggleopen('lvrctdo', 'lvrctds','lvrctdc','lvrctd'));
      document.getElementById('stopbtnC').addEventListener('click', () => togglestp('lvrctdo', 'lvrctds','lvrctdc','lvrctd'));
      document.getElementById('closebtnC').addEventListener('click', () => toggleclose('lvrctdo', 'lvrctds','lvrctdc','lvrctd'));
      
      document.getElementById('openbtnF').addEventListener('click', () => toggleopen('lvrffro', 'lvrffrs','lvrffrc','lvrffr'));
      document.getElementById('stopbtnF').addEventListener('click', () => togglestp('lvrffro', 'lvrffrs','lvrffrc','lvrffr'));
      document.getElementById('closebtnF').addEventListener('click', () => toggleclose('lvrffro', 'lvrffrs','lvrffrc','lvrffr'));

      document.getElementById('openbtnD').addEventListener('click', () => toggleopen('lvrdnro', 'lvrdnrs','lvrdnrc','lvrdnr'));
      document.getElementById('stopbtnD').addEventListener('click', () => togglestp('lvrdnro', 'lvrdnrs','lvrdnrc','lvrdnr'));
      document.getElementById('closebtnD').addEventListener('click', () => toggleclose('lvrdnro', 'lvrdnrs','lvrdnrc','lvrdnr'));

      document.getElementById('openbtnL').addEventListener('click', () => toggleopen('lvrlrmo', 'lvrlrms','lvrlrmc','lvrlrm'));
      document.getElementById('stopbtnL').addEventListener('click', () => togglestp('lvrlrmo', 'lvrlrms','lvrlrmc','lvrlrm'));
      document.getElementById('closebtnL').addEventListener('click', () => toggleclose('lvrlrmo', 'lvrlrms','lvrlrmc','lvrlrm')); 
      
      let isp = false;
      
function toggleopen(OIMGID, SIMGID,CIMGID,AREA) 
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
              publish_louver(AREA,'OPN');
              openImage.alt = "start ON";
              stopImage.src = "./assets/images/stp_u.png";
              stopImage.alt = "stop OFF";
              closeImage.src = "./assets/images/close_u.png";

          }
          isp = !isp;
      }
      
function togglestp(OIMGID, SIMGID,CIMGID,AREA) {
          const openImage = document.getElementById(OIMGID);
          const stopImage = document.getElementById(SIMGID);
          const closeImage = document.getElementById(CIMGID);
      
          if (isp) {
              // Stop ON state
              stopImage.src = "./assets/images/stp.png";
              publish_louver(AREA,'STP');
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
      

function toggleclose(OIMGID, SIMGID,CIMGID,AREA) 
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
            publish_louver(AREA,'CLS');
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

function publish_louver(LID,LSTAT)
    {
  
    /*const checkbox = document.getElementById('toggle1');*/
    /*const toggle = STAT*/
  
    // Prepare the JSON data
    var data = {}
      data[LID] = LSTAT ;
    
//LOUVER:LID+LSTAT 


    // Connect to the MQTT broker
    const client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');

    client.on('connect', function () {
      console.log('Connected to MQTT broker');
      client.publish('SWPAV', JSON.stringify(data), function (err) {
        if (err) {
          document.getElementById("mqtt-topic").innerHTML = "Error publishing: " + err;
        } else {
          //document.getElementById("response").innerHTML = "Communication & Register Data published successfully! -Through VFDSETT";
         document.getElementById("mqtt-topic").innerHTML = "Topic: SWPAV  Message:" + JSON.stringify(data);
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
                    
                      if (key.startsWith("lt")) 
                        {
                        show_ltswbrd(key); 
                        lghtindctr(key, value);
                        }

                      if (key.startsWith("lvr")) 
                        {
                          show_lrswbrd(key);
                          lvrstat(key, value);     
                        }     
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
                              lghtindctr(keym,"stp");
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


/*
const form = document.getElementById('topicsetting');
const loadtopicBtn = document.getElementById('loadtopic');
form.addEventListener('submit', async(event)=>
{
  event.preventDefault(); // Prevent form from refreshing the page
  //document.getElementById("configForm").addEventListener("submit", async (event) => {
   // event.preventDefault();
  
    //const mqttTopic = document.getElementById("mqttTopic").value;
    //const brokerUrl = document.getElementById("brokerUrl").value;
  const drswsc = document.getElementById('drsw').value;
  const soswsc = document.getElementById('sosw').value;
  const entrswc = document.getElementById('entrsw').value;
  const ffswsc = document.getElementById('ffsw').value;
  const dngswsc = document.getElementById('dngsw').value;
  const cyswsc = document.getElementById('cysw').value;
  const lrswsc = document.getElementById('lrsw').value;
  const mrswsc = document.getElementById('mrsw').value;

    const configData = {
      drsws : drswsc,
      sosws : soswsc,
      entrsws : entrswc,
      ffsws : ffswsc,
      dngsws : dngswsc,
      cysws : cyswsc,
      lrsws : lrswsc,
      mrsws : mrswsc,
    };
  
    const token = "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"; // Replace with your GitHub token
    const repoOwner = "tpras1"; // Replace with your GitHub username
    const repoName = "waterlevel"; // Replace with your repository name
    const filePath = "config.json"; // Path to save the file
  
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
  
    try {
      // Get the current file's SHA (required for updates)
      const getResponse = await fetch(apiUrl, {
        headers: {
          Authorization: `token ${token}`,
          //Authorization: `token ghp_elzrNwpRzQIFaqkgAdaRBrZgDHSpfD3CvT`,
          Accept: "application/vnd.github.v3+json",
        },
      });
  
      const fileSHA = getResponse.ok ? (await getResponse.json()).sha : null;
  
      // Prepare the request to create or update the file
      const saveResponse = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          //Authorization: `token ghp_elzrNwpRzQIFaqkgAdaRBrZgDHSpfD3CvT`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Update config.json via web form",
          content: btoa(JSON.stringify(configData, null, 2)),
          sha: fileSHA,
        }),
      });
  
      if (saveResponse.ok) {
        alert("Configuration saved successfully!");
      } else {
        throw new Error("Failed to save configuration.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving the configuration.");
    }
  //});
  //const drsw = document.getElementById('drsw').value;
  //localStorage.setItem('drsws', drsw);
  //const sosw = document.getElementById('sosw').value;
  //localStorage.setItem('sosws', sosw);
  //const entrsw = document.getElementById('entrsw').value;
  //localStorage.setItem('entrsws', entrsw);
  //const ffsw = document.getElementById('ffsw').value;
  //localStorage.setItem('ffsws', ffsw);
  //const dngsw = document.getElementById('dngsw').value;
  //localStorage.setItem('dngsws', dngsw);
  //const cysw = document.getElementById('cysw').value;
  //localStorage.setItem('cysws', cysw);
  //const lrsw = document.getElementById('lrsw').value;
  //localStorage.setItem('lrsws', lrsw);
  //const mrsw = document.getElementById('mrsw').value;
  //localStorage.setItem('mrsws', mrsw);
   // Save to local storage
  form.reset(); // Clear the form
}); */


//document.getElementById('loadtopic').addEventListener('click', () => loadParm())
//loadtopicBtn.addEventListener('click', function() 
/*function loadParm()
{
  // const url = "./cofig.json";
  fetch('https://tpras1.github.io/waterlevel/config.json?cacheBust=' + new Date().getTime())
  //fetch('./config.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((config) => {
    // Assign values to constants

    cdrtopic = config.drsws;
    csotopic = config.sosws;
    centrtopic = config.entrsws;
    cfftopic = config.ffsws;
    cdngtopic = config.dngsws;
    ccytopic  = config.cysws;
    clrtopic = config.lrsws;
    cmrtopic = config.mrsws;
    const mq_broker = config.mqtt_broker;
    document.getElementById('drsw').value = cdrtopic;
    document.getElementById('sosw').value = csotopic;
    document.getElementById('entrsw').value = centrtopic;
    document.getElementById('ffsw').value = cfftopic;
    document.getElementById('dngsw').value =  cdngtopic;
    document.getElementById('cysw').value = ccytopic ;
    document.getElementById('lrsw').value = clrtopic;
    document.getElementById('mrsw').value = cmrtopic;

    sdrtopic = cdrtopic.replace("command", "status");
    ssotopic = csotopic.replace("command", "status");
    sentrtopic = centrtopic.replace("command", "status");
    sfftopic = cfftopic.replace("command", "status");
    sdngtopic = cdngtopic.replace("command", "status");
    scytopic = ccytopic.replace("command", "status");
    slrtopic = clrtopic.replace("command", "status");
    smrtopic = cmrtopic.replace("command", "status");

    document.getElementById("mqtt-topic").innerHTML ="Broker:"+mq_broker;
  })
  .catch((error) => console.error("Error fetching config:", error));

  
} */
  const form = document.getElementById('topicsetting');
  const loadtopicBtn = document.getElementById('loadtopic');
  document.getElementById('loadtopic').addEventListener('click', () => loadParm())
function loadParm()
            {
              database.ref('config').get()
              .then((snapshot) => {
                if (snapshot.exists()) {
                  const config = snapshot.val();
                  console.log("Config loaded:", config);
                  //document.getElementById('mqttTopic').value = config.mqtt_topic;
                  //document.getElementById('brokerUrl').value = config.broker_url;
                  cdrtopic = config.drsws;
                  csotopic = config.sosws;
                  centrtopic = config.entrsws;
                  cfftopic = config.ffsws;
                  cdngtopic = config.dngsws;
                  ccytopic  = config.cysws;
                  clrtopic = config.lrsws;
                  cmrtopic = config.mrsws;
                  const mq_broker = config.mqtt_broker;
                  document.getElementById('drsw').value = cdrtopic;
                  document.getElementById('sosw').value = csotopic;
                  document.getElementById('entrsw').value = centrtopic;
                  document.getElementById('ffsw').value = cfftopic;
                  document.getElementById('dngsw').value =  cdngtopic;
                  document.getElementById('cysw').value = ccytopic ;
                  document.getElementById('lrsw').value = clrtopic;
                  document.getElementById('mrsw').value = cmrtopic;
              
                  sdrtopic = cdrtopic.replace("command", "status");
                  ssotopic = csotopic.replace("command", "status");
                  sentrtopic = centrtopic.replace("command", "status");
                  sfftopic = cfftopic.replace("command", "status");
                  sdngtopic = cdngtopic.replace("command", "status");
                  scytopic = ccytopic.replace("command", "status");
                  slrtopic = clrtopic.replace("command", "status");
                  smrtopic = cmrtopic.replace("command", "status");
              
                  document.getElementById("mqtt-topic").innerHTML ="Broker:"+mq_broker;

                } else {
                  console.log("No config found.");
                }
              })
              .catch((error) => {
                console.error("Error fetching config:", error);
              });

          }


          document.getElementById('topicsetting').addEventListener('click', () =>   
          // Event listener for Save button
          {
            //const mqttTopic = document.getElementById('mqttTopic').value;
            //const brokerUrl = document.getElementById('brokerUrl').value;    
           // const config = { mqtt_topic: mqttTopic, broker_url: brokerUrl };

            event.preventDefault();

                  const drswsc = document.getElementById('drsw').value;
                  const soswsc = document.getElementById('sosw').value;
                  const entrswc = document.getElementById('entrsw').value;
                  const ffswsc = document.getElementById('ffsw').value;
                  const dngswsc = document.getElementById('dngsw').value;
                  const cyswsc = document.getElementById('cysw').value;
                  const lrswsc = document.getElementById('lrsw').value;
                  const mrswsc = document.getElementById('mrsw').value;

                    const config = {
                      drsws : drswsc,
                      sosws : soswsc,
                      entrsws : entrswc,
                      ffsws : ffswsc,
                      dngsws : dngswsc,
                      cysws : cyswsc,
                      lrsws : lrswsc,
                      mrsws : mrswsc,
                    };

             saveConfig(config);                        
          });

            function saveConfig(config) 
            {
              database.ref('config').set(config)
                .then(() => {
                  console.log("Config saved successfully!");
                  alert("Configuration saved successfully!");
                })
                .catch((error) => {
                  console.error("Error saving config:", error);
                  alert("An error occurred while saving the configuration.");
                });
                //form.reset(); 
            }




    