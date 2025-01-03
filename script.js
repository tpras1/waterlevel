
        let cdrtopic;
        let sdrtopic  ;
        let csotopic  ;
        let ssotopic   ;
        let centrtopic ;
        let sentrtopic ;
        let cfftopic ;
        let sfftopic ;
        let cdngtopic ;
        let sdngtopic;
        let ccytopic  ;
        let scytopic ;
        let clrtopic ;
        let slrtopic ;
        let cmrtopic ;
        let smrtopic ;
        let cdngltopic  ;                           
        let cpndtopic ;
        let cdngrtopic ; 
        let centltopic  ;
        let ckhntopic ;
        let clvngtopic ;
        let cmbrtopic ;
        let cbdrtopic;
        let cwatopic ;
        let cbroker ;
        let sdngltopic ;
        let spndtopic ;
        let sdngrtopic ; 
        let sentltopic;
        let skhntopic ;
        let slvngtopic ;
        let smbrtopic ;
        let sbdrtopic ;
        let sbroker ;

                
   //loadparm();
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


function showSwitch(switchID) 
        {
            var sections = document.getElementsByClassName('Switch');
            for (var i = 0; i < sections.length; i++) {
                sections[i].classList.remove('active');
            }
            document.getElementById(switchID).classList.add('active');
        }

document.getElementById('exitLoadtopic').addEventListener('click', () => removeSetting())

function removeSetting()
    {
  
        document.getElementById('setting').classList.remove('active');

    }

function removeSwitch()
{
  {
    var sections = document.getElementsByClassName('Switch');
    for (var i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
  }
  }

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


/*
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
*/


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
      loadparm();
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
      loadparm();
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


function lvrstat(ids,stat,value) 
              {
                const lvrimgo= document.getElementById(ids + "o"); 
                const lvrimgc= document.getElementById(ids + "c");
                const lvrimgs= document.getElementById(ids + "s");
                document.getElementById("mqtt-topic").innerHTML = ids +":"+stat +value;
            if(stat=== 0 && value ==="ON")
                {

                  lvrimgo.src= "./assets/images/open.png";
                  lvrimgc.src=  "./assets/images/close_u.png";
                  lvrimgs.src=  "./assets/images/stp_u.png";
                }
            if (stat=== 2 && value ==="ON")
                  {
                    lvrimgo.src= "./assets/images/open_u.png";
                    lvrimgc.src=  "./assets/images/close.png";
                    lvrimgs.src=  "./assets/images/stp_u.png"; 
                  }
            if(stat=== 1 && value ==="ON")
                  {
                    lvrimgo.src= "./assets/images/open_u.png";
                    lvrimgc.src=  "./assets/images/close_u.png";
                    lvrimgs.src=  "./assets/images/stp.png"; 
                  }
             else 
             {
                 return; 
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
                  case "dngl":
                    showSwitch('DNG-L');
                    break;
                  case "dngr":
                    showSwitch('DNG-R');
                      break;
                  case "pnd":
                    showSwitch('PND');
                        break;
                  case "entl":
                    showSwitch('ENTL');
                        break;
                  case "khn":
                    showSwitch('KHN');
                        break;
                  case "lvng":
                    showSwitch('LVNG');
                        break;
                  case "mbr":
                    showSwitch('MBR');
                        break;
                  case "bdr":
                    showSwitch('BDR');
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
                                      if ( swtopic.startsWith ("DR"))
                                      {
                                        //return localStorage.getItem('drsws');
                                        return cdrtopic
                                        //return "pavithram/Ediys4245028/command";
                                      }

                                      if ( swtopic.startsWith ("SO"))
                                      {
                                        //return localStorage.getItem('sosws');
                                        return csotopic
                                          //return "pavithram/Ediys4245028/command";
                                      }

                                      if ( swtopic.startsWith ("ENTR"))
                                      {
                                        //return localStorage.getItem('entrsws');
                                        return centrtopic
                                        //return "pavithram/Ediys4245028/command";
                                      }
                                      if ( swtopic.startsWith ("DNGL"))
                                        {
                                        //return localStorage.getItem('entrsws');
                                        return cdngltopic
                                         //return "pavithram/Ediys4245028/command";
                                        } 
                                      if ( swtopic.startsWith ("DNGR"))
                                        {
                                        //return localStorage.getItem('entrsws');
                                        return cdngrtopic
                                          //return "pavithram/Ediys4245028/command";
                                        } 
                                      if ( swtopic.startsWith ("PND"))
                                        {
                                        //return localStorage.getItem('entrsws');
                                        return cpndtopic
                                          //return "pavithram/Ediys4245028/command";
                                        } 
                                      if ( swtopic.startsWith ("ENTL"))
                                        {
                                          //return localStorage.getItem('entrsws');
                                        return centltopic
                                            //return "pavithram/Ediys4245028/command";
                                        } 
                                      if ( swtopic.startsWith ("KHN"))
                                        {
                                          //return localStorage.getItem('entrsws');
                                        return ckhntopic 
                                            //return "pavithram/Ediys4245028/command";
                                        } 
                                      if ( swtopic.startsWith ("LVNG"))
                                        {
                                          //return localStorage.getItem('entrsws');
                                        return clvngtopic 
                                            //return "pavithram/Ediys4245028/command";
                                        } 
                                        if ( swtopic.startsWith ("MBR"))
                                          {
                                            //return localStorage.getItem('entrsws');
                                          return cmbrtopic 
                                          }
                                        if ( swtopic.startsWith ("BDR"))
                                          {
                                            //return localStorage.getItem('entrsws');
                                          return cbdrtopic 
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

  document.getElementById("mqtt-topic").innerHTML = topic;
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
/*-----------------------------------------------------------------------DNG*/

if (topic === sdngltopic )

  {
      try
            {
              var data1 = JSON.parse(message.toString());   
              Object.entries(data1).forEach(([key, value]) => {
                console.log(`Processing Key: ${key}, Value: ${value}`);

                document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${value}<br>`;

                        const ddngl= parseInt(key.slice(-1), 10);
                      
                        const pdngl = ddngl + 1;
                        const keym = "ltdngl"+ pdngl; 
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
/*-----------------------------------------------------------------------------DNGL*/          
/*-----------------------------------------------------------------------------DNGR*/ 
if (topic === sdngrtopic )

  {
      try
            {
              var data1 = JSON.parse(message.toString());   
              Object.entries(data1).forEach(([key, value]) => {
                console.log(`Processing Key: ${key}, Value: ${value}`);

                document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${value}<br>`;

                        const ddngr= parseInt(key.slice(-1), 10);
                      
                        const pdngr = ddngr + 1;
                        const keym = "ltdngr"+ pdngr; 
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
/*-----------------------------------------------------------------------------DNGR*/ 

if (topic === spndtopic )

  {
      try
            {
              var data1 = JSON.parse(message.toString());   
              Object.entries(data1).forEach(([key, value]) => {
                console.log(`Processing Key: ${key}, Value: ${value}`);

                document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${value}<br>`;

                        const dpnd= parseInt(key.slice(-1), 10);
                      
                        const ppnd = dpnd + 1;
                        const keym = "ltpnd"+ ppnd; 
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
/*-----------------------------------------------------------------------pnd-----*/
if (topic === sentltopic )

  {
      try
            {
              var data1 = JSON.parse(message.toString());   
              Object.entries(data1).forEach(([key, value]) => {
                console.log(`Processing Key: ${key}, Value: ${value}`);

                document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${value}<br>`;

                        const dentl= parseInt(key.slice(-1), 10);
                      
                        const pentl = dentl + 1;
                        const keym = "ltentl"+ pentl; 
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

/*------------------------------------------------------------------------entl----*/
if (topic === skhntopic )

  {
      try
            {
              var data1 = JSON.parse(message.toString());   
              Object.entries(data1).forEach(([key, value]) => {
                console.log(`Processing Key: ${key}, Value: ${value}`);

                document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${value}<br>`;

                        const dkhn= parseInt(key.slice(-1), 10);
                      
                        const pkhn = dkhn + 1;
                        const keym = "ltkhn"+ pkhn; 
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
/*-------------------------------------------------------------------------khn*/
if (topic === slvngtopic )

  {
      try
            {
              var data1 = JSON.parse(message.toString());   
              Object.entries(data1).forEach(([key, value]) => {
                console.log(`Processing Key: ${key}, Value: ${value}`);

                document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${value}<br>`;

                        const dlvng= parseInt(key.slice(-1), 10);
                      
                        const plvng = dlvng + 1;
                        const keym = "ltlvng"+ plvng; 
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
/*-----------------------------------------------------------------------lvng--*/
if (topic === smbrtopic )

  {
      try
            {
              var data1 = JSON.parse(message.toString());   
              Object.entries(data1).forEach(([key, value]) => {
                console.log(`Processing Key: ${key}, Value: ${value}`);

                document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${value}<br>`;

                        const dmbr= parseInt(key.slice(-1), 10);
                      
                        const pmbr = dmbr + 1;
                        const keym = "ltmbr"+ pmbr; 
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
/*-----------------------------------------------------------------------mbr--*/
if (topic === sbdrtopic )

  {
      try
            {
              var data1 = JSON.parse(message.toString());   
              Object.entries(data1).forEach(([key, value]) => {
                console.log(`Processing Key: ${key}, Value: ${value}`);

                document.getElementById("mqtt-topic").innerHTML += `Key: ${key}, Value: ${value}<br>`;

                        const dbdr= parseInt(key.slice(-1), 10);
                      
                        const pbdr = dbdr + 1;
                        const keym = "ltbdr"+ pbdr; 
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


/*-----------------------------------------------------------------------mbr--*/
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
                           
                    const stat1 = parseInt(key.slice(-1), 10);
                    const key1 = "lvrffr";
                    show_lrswbrd(key1);
                    lvrstat(key1,stat1,value);    
                            
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
                     
                    const stat2 = parseInt(key.slice(-1), 10);
                    const key2 = "lvrdnr";
                    show_lrswbrd(key2);
                    lvrstat(key2,stat2,value);
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
                           
                    const stat3 = parseInt(key.slice(-1), 10);
                    const key3 = "lvrctd";
                    show_lrswbrd(key3);
                    lvrstat(key3,stat3,value);
                      
                  /* 
                 if (key === "switch0" && value==="ON")
                                {
                            const keym = "lvrctd" ;
                              show_lrswbrd(keym); 
                              lvrstat(keym,"opn");
                              }

                    if (key === "switch1" && value==="ON")
                                {
                            const keym = "lvrctd";
                              show_lrswbrd(keym); 
                              lvrstat(keym,"stp");
                              }
                    if (key === "switch2" && value==="ON")
                                {
                            const keym = "lvrctd";
                              show_lrswbrd(keym); 
                              lvrstat(keym,"cls");
                              }         */
                            
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
                           
                    const stat4 = parseInt(key.slice(-1), 10);
                    const key4 = "lvrmbd";
                    show_lrswbrd(key4);
                    lvrstat(key4,stat4,value);
                    
                    
                  /* if (key === "switch0" && value==="ON")
                                {
                            const keym = "lvrmbd";
                              show_lrswbrd(keym); 
                              lvrstat(keym,"opn");
                              }

                    if (key === "switch1" && value==="ON")
                                {
                            const keym = "lvrmbd";
                              show_lrswbrd(keym); 
                              lvrstat(keym,"stp");
                              }
                    if (key === "switch2" && value==="ON")
                                {
                            const keym = "lvrmbd";
                              show_lrswbrd(keym); 
                              lvrstat(keym,"cls");
                              }    */     
                            
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
                           
                    const stat5 = parseInt(key.slice(-1), 10);
                    const key5 = "lvrlrm";
                    show_lrswbrd(key5);
                    lvrstat(key5,stat5,value);
                  /* 
                    if (key === "switch0" && value==="ON")
                                {
                            const keym = "lvrlrm";
                              show_lrswbrd(keym); 
                              lvrstat(keym,"opn");
                              }

                    if (key === "switch1" && value==="ON")
                                {
                            const keym = "lvrlrm";
                              show_lrswbrd(keym); 
                              lvrstat(keym,"stp");
                              }
                    if (key === "switch2" && value==="ON")
                                {
                            const keym = "lvrlrm";
                              show_lrswbrd(keym); 
                              lvrstat(keym,"cls");
                              }      */   
                            
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
  loadparm();
        client1.subscribe( sdrtopic , onSubscriptionSuccess);
        client1.subscribe( ssotopic , onSubscriptionSuccess);
        client1.subscribe( sentrtopic , onSubscriptionSuccess);
        client1.subscribe( sfftopic , onSubscriptionSuccess);
        client1.subscribe( sdngtopic , onSubscriptionSuccess);
        client1.subscribe( scytopic , onSubscriptionSuccess);
        client1.subscribe( slrtopic , onSubscriptionSuccess);
        client1.subscribe( smrtopic , onSubscriptionSuccess);
        client1.subscribe( sdngltopic , onSubscriptionSuccess);
        client1.subscribe( sdngrtopic , onSubscriptionSuccess);
        client1.subscribe( spndtopic , onSubscriptionSuccess);
        client1.subscribe( sentltopic , onSubscriptionSuccess);
        client1.subscribe( skhntopic , onSubscriptionSuccess);
        client1.subscribe( slvngtopic , onSubscriptionSuccess);
        client1.subscribe( smbrtopic , onSubscriptionSuccess);
        client1.subscribe( sbdrtopic , onSubscriptionSuccess);
      });
// When a message is received
client1.on('message', onMessageReceived1);


  function loadparm()
  {
        cdrtopic = document.getElementById('drsw').value ;
        csotopic  = document.getElementById('sosw').value ;
        centrtopic = document.getElementById('entrsw').value ;
        cfftopic =   document.getElementById('ffsw').value ;
        cdngtopic = document.getElementById('dngsw').value ;
        ccytopic =  document.getElementById('cysw').value ;
        clrtopic=  document.getElementById('lrsw').value;
        cmrtopic =  document.getElementById('mrsw').value ;
        cdngltopic = document.getElementById('dnglsw').value ;
        cpndtopic = document.getElementById('pndsw').value  ;
        cdngrtopic = document.getElementById('dngrsw').value ;
        centltopic = document.getElementById('entlsw').value ;
        ckhntopic= document.getElementById('khnsw').value ;
        clvngtopic = document.getElementById('lvngsw').value ; 
        cmbrtopic = document.getElementById('mbrsw').value ;
        cbdrtopic= document.getElementById('bdrsw').value ;
        cwatopic= document.getElementById('wasw').value ;
        cbroker = document.getElementById('broker').value ;

        sdrtopic = cdrtopic.replace("command", "status");
        ssotopic = csotopic.replace("command", "status");
        sentrtopic = centrtopic.replace("command", "status");
        sfftopic = cfftopic.replace("command", "status");
        sdngtopic = cdngtopic.replace("command", "status");
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
        //swatopic = cwatopic.replace("command", "status");
        sbroker= cbroker.replace("command", "status");
       // document.getElementById("mqtt-topic").innerHTML ="Broker:"+mq_broker;
  }
loadparm();
  