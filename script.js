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
client.on('connect', function () {
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



  function login() {
    // Hard-coded credentials
    const correctUsername = "admin";
    const correctPassword = "tpras123";

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
       
       // document.getElementById('home').classList.add('active');
        //document.getElementById('app-content').classList.remove('hidden')


        // Perform login action here (e.g., redirect to another page)
    } 
    
    
    
    else {
        document.getElementById("errorMessage").textContent = "Invalid username or password";
    }
}





  /*const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Simple hardcoded login logic
  if (username === 'admin' && password === 'password123') {
    // Store login status
    sessionStorage.setItem('loggedIn', true);
    // Show app content and hide login
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('home').classList.add('active');
    document.getElementById('app-content').classList.remove('hidden');

    
  } else {
    alert('Invalid credentials. Please try again.');
  } */

function logout() {
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


window.onload = function() {
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
              publish_sw_stat(SW,"OFF");
              /*publishV_OFF()*/
          } 
          else 
          {
              SwitchImage.src = "./assets/images/sw_on.png";
              SwitchImage.alt = "Switch  ON";
              publish_sw_stat(SW,"ON");
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
              publish_sw_stat(SW,"OFF");
              /*publishV_OFF();*/
          } 
          else 
          {
              SwitchImage.src = "./assets/images/sw_15A_on.png";
              SwitchImage.alt = "Switch  ON";
              publish_sw_stat(SW,"ON");
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
      
      function toggleopen(OIMGID, SIMGID,CIMGID,AREA) {
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
      

      function toggleclose(OIMGID, SIMGID,CIMGID,AREA) {
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




    function publish_sw_stat(SWID,STAT)
{
  
    /*const checkbox = document.getElementById('toggle1');*/
    /*const toggle = STAT*/
  
    // Prepare the JSON data
    var data = {}
      data[SWID]= STAT;      
    
    // Connect to the MQTT broker
    const client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');

    client.on('connect', function () {
      console.log('Connected to MQTT broker');
      client.publish('SWPAV', JSON.stringify(data), function (err) {
        if (err) {
          //document.getElementById("response").innerHTML = "Error publishing: " + err;
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
          
          if (STAT =="on") 
    
            {
              LTIMG.src = "./assets/images/light_on.png";
              swimg.src = "./assets/images/sw_on.png";
              LTIMG.alt = "lton";
             // LTIMGP.src= "./assets/images/light_on_w.png";
             
          } 
        if (STAT =="off")
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


 function onMessageReceived1(topic, message) 
{
  console.log(`Message received on topic '${topic}': ${message.toString()}`);
  // document.getElementById("msg").innerHTML = "Message received on topic:     " + topic + message.toString();

  // Convert the MQTT message to a string and try to parse it as JSON
  if (topic === "SWSTATPAV")
  {
    /*document.getElementById("msg").innerHTML= "TOPIC EPROMDATA "; */
    try { 
      var data1 = JSON.parse(message.toString());

     // document.getElementById("mqtt-topic").innerHTML = `Topic: ${topic} ${JSON.stringify(data1)}`;

      // Update the gauges with the respective data
      document.getElementById('AMP').setAttribute('data-value', data1.pcur);
    //document.getElementById("dash").innerHTML = "O/P Current = "+data.cur
    document.getElementById('vlt').setAttribute('data-value', data1.pvlt);
    //document.getElementById("dash").innerHTML = "VFD Output Voltage = "+data.volt;
    //document.getElementById("mqtt-topic").innerHTML = (`key: ${key} with value: ${data1[key]}`);

   /* Object.keys(data1).forEach((key) => {
      console.log(`Processing Key: ${key}, Value: ${data1[key]}`);
      document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${data1[key]}<br>`;
    
      if (key.startsWith("LT")) {
        lghtindctr(key, data1[key]);
      }
    }); */

   Object.entries(data1).forEach(([key, value]) => {
      console.log(`Processing Key: ${key}, Value: ${value}`);
      document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${value}<br>`;
    
      if (key.startsWith("lt")) 
        {
        lghtindctr(key, value);
        }
                  if (key.startsWith("lvr")) 
                      {
                            lvrstat(key, value);
                      }
      
    });





    /*for (const key in data1) */
    /*for (const key in data1) 
      {
        //document.getElementById("mqtt-topic").innerHTML = (`key: ${key} with value: ${data1[key]}`);
        if (key.startsWith("lt")) 
          {
           lghtindctr(key, data1[key]);
          }
        }*/
      //document.getElementById('AMP').setAttribute('data-value', data1.pcur);
    //document.getElementById("dash").innerHTML = "O/P Current = "+data.cur
    //document.getElementById('vlt').setAttribute('data-value', data1.pvlt);

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
const client1 = mqtt.connect('wss://test.mosquitto.org:8081/mtqt');  // Replace with your broker URL

// When the client connects to the broker
client1.on('connect', function () {
  console.log("Connected to broker");

  // Subscribe to the topic with a callback for the subscription
  client1.subscribe('SWSTATPAV', onSubscriptionSuccess);
});

// When a message is received
client1.on('message', onMessageReceived1);