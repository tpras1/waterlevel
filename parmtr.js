import { writeParm, readParam } from "./firebase.js";
                  var cdrtopic;
                  var csotopic ;
                  var centrtopic ;
                  var cfftopic ;
                  var cdngtopic;
                  var ccytopic;
                  var clrtopic;
                  var cmrtopic;
                  var cdngltopic;
                  var cpndtopic ;
                  var cdngrtopic;  
                  var centltopic;   
                  var ckhntopic;
                  var clvngtopic; 
                  var cmbrtopic;
                  var cbdrtopic;
                  var cwatopic;
                  var cbroker; 
                  var sdrtopic;
                  var ssotopic;
                  var sentrtopic ;
                  var sfftopic ;
                  var sdngtopic ;
                  var scytopic ;
                  var slrtopic ;
                   var smrtopic ;
                   var sdngltopic ;
                   var spndtopic ;
                   var sdngrtopic ;
                   var sentltopic ;
                   var skhntopic ;
                   var slvngtopic ;
                   var smbrtopic ;
                   var sbdrtopic ;
                   var sbroker ; 

//loadParm();
const loadtopicBtn = document.getElementById('loadtopic');
document.getElementById('loadtopic').addEventListener('click', () => loadParm())
function loadParm()
            {

                readParam((config) => {
                    if (config) {
              /*database.ref('config').get()
              .then((snapshot) => {
                if (snapshot.exists()) {
                  const config = snapshot.val();*/
                
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
            writeParm(configD); 
            //form.reset();                    
          });
  loadParm();

