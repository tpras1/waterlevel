/*document.addEventListener("DOMContentLoaded", function() {
    setInterval(get_motor_status, 2000);
    setInterval(dry_run_status, 2000);
    setInterval(get_MIN-MAX_height, 2000);
});

function get_motor_status() {
    var someUrl = "/motor_status";
    fetch(someUrl)``
        .then(response => response.text())
        .then(function(response) {
            var statusElement = document.getElementById("status");
            var toggle1Element = document.getElementById("toggle1");
            var rotorElement = document.querySelector('.rotor');
            if (response === "on") {
                statusElement.innerHTML = "Water Pump ON";
                toggle1Element.checked = true;
                  rotorElement.style.animationPlayState = 'running';
            } else {
                statusElement.innerHTML = "Water Pump OFF";
                toggle1Element.checked = false;
                rotorElement.style.animationPlayState = 'paused';
            }
        });
}

function dry_run_status() {
    var someUrl = "/dryRun_status";
    fetch(someUrl)
        .then(response => response.text())
        .then(function(response) {
            var drystatusElement = document.getElementById("drystatus");

            switch (response) {
                case "DR":
                    drystatusElement.innerHTML = "Pump Dry Run Detected";
                    break;
                case "NDR":
                    drystatusElement.innerHTML = "Pumping water";
                    break;
                case "NDROFF":
                    drystatusElement.innerHTML = "Pump OFF Due to Dry Run";
                    break;
                case "PUMPOFF":
                    drystatusElement.innerHTML = "Pump OFF";
                    break;
                case "TNKFULL":
                    drystatusElement.innerHTML = "Pump OFF Due to Tank Full";
                    break;
                default:
                    drystatusElement.innerHTML = "Unknown Status";
                    break;
            }
        });
}
function updateHeight(liters) 
              {
            var height = liters/1.4 ; // Adjust the multiplier based on your requirement
            var liquidlevel =liters.toFixed(0);
            document.getElementById("liquid").style.height = height + "%"; // Assuming you have an element with id="container" to set the height
           document.getElementById("beaker").innerHTML= liquidlevel ;
            
        }

        function fetchData() 
        {      
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() 
            {
                if (this.readyState == 4 && this.status == 200) 
                {
                    var liters = parseFloat(this.responseText);
                    updateHeight(liters);
                }
            };
            xhttp.open("GET", "/level", true);
            xhttp.send();
        }

        // Fetch the data initially and then update every 5 seconds (adjust as per your needs)
        fetchData();
        setInterval(fetchData, 5000);
              

function getDataFromServer() {
      // Send a GET request to the ESP8266 server
      fetch('/displayRange')
        .then(response => response.text())
        .then(data => {
          // Split the received data into MIN and MAX values
          const [MIND, MAXD] = data.split(',');

          // Update the output elements with the received values
         // document.getElementById('MIN').innerText = MIND;
          //document.getElementById('MAX').innerText = MAXD;

          document.getElementById("MIN_display").innerHTML = MIND;
          document.getElementById("MAX_display").innerHTML = MAXD;
          document.getElementById("MIN").value = MIND;
          document.getElementById("MAX").value = MAXD;
          
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  getDataFromServer();
  setInterval(getDataFromServer, 5000);

function tnkht(ht) {
 var tankheight = ht ; // Adjust the multiplier based on your requirement
           document.getElementById("tank_height").value=tankheight  ;
            
        }
        function get_tank_height() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var ht = parseFloat(this.responseText);
                    tnkht(ht);
                }
            };
            xhttp.open("GET", "/displayheight", true);
            xhttp.send();
        }

        // Fetch the data initially and then update every 5 seconds (adjust as per your needs 
    
  get_tank_height();
  setInterval(get_tank_height, 5000);*/

                                                         
/*            function sendRanges() 
            
            {
            var minRange = document.getElementById("MIN").value;
            var maxRange = document.getElementById("MAX").value;

            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "/configRange?min=" + minRange + "&max=" + maxRange, true);
            xhttp.send();
        }
        function sendHeight() {
            var TANK_H = document.getElementById("tank_height").value;
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "/heightconfig?tnkheight=" + TANK_H ,true);
            xhttp.send();
          }
*/

          //var rotorElement = document.querySelector('.rotor')
//var motorRunning = false;

/*function toggleMotor() {
 // motorRunning = !motorRunning;
  //if (motorRunning) {
    //rotorElement.style.animationPlayState = 'running';
  //} else {
   // rotorElement.style.animationPlayState = 'paused';
  //}
  var xhr = new XMLHttpRequest(); 
  xhr.open('GET', '/toggle', true); 
  xhr.send();

} */


// json from ESP
//
// /motor_status  : "on"  : water pump on  else water pump off
// /dryRun_status : "DR" , "NDR","NDR OFF","PUMPOFF","TNKFULL"
// /displayRange  : "MIND" ,"MAXD"  minimum max range
// /level :
// /tank_h :

// json to ESP 
//
// /connfigRange ; minRange maxRange
// /heightconfig : TANK_H
// /toggle : switch

// topic TANKTK

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








