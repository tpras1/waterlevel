import { writeParm, readParam } from "./firebase.js";
                  let cdrtopic;
                  let csotopic ;
                  let centrtopic ;
                  let cfftopic ;
                  let cdngtopic;
                  let ccytopic;
                  let clrtopic;
                  let cmrtopic;
                  let cdngltopic;
                  let cpndtopic ;
                  let cdngrtopic;  
                  let centltopic;   
                  let ckhntopic;
                  let clvngtopic; 
                  let cmbrtopic;
                  let cbdrtopic;
                  let cwatopic;
                  let cbroker; 
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
                   let testtopic1;

loadParm();
const loadtopicBtn = document.getElementById('loadtopic');
document.getElementById('loadtopic').addEventListener('click', () => loadParm())
/*function loadParm()
            {
    let isValid = false;        

                readParam((config) => {
                    if (config) {
              /*database.ref('config').get()
              .then((snapshot) => {
                if (snapshot.exists()) {
                  const config = snapshot.val();*/
              /*
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
                            testtopic1 = config.testtopic;

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
                  alert("no config found")
                }
              })
            /* .catch((error) => {
                console.error("Error fetching config:", error);
              });*/
             
          /*  alert("parmtr.js loaded:")

          } */
  function loadParm() {
            let isValid = false;
        
            // Helper function to check if all elements have been assigned values
            function validateConfig() {
                const elements = [
                    'drsw', 'sosw', 'entrsw', 'ffsw', 'dngsw', 'cysw', 'lrsw', 'mrsw',
                    'dnglsw', 'pndsw', 'dngrsw', 'entlsw', 'khnsw', 'lvngsw', 'mbrsw',
                    'bdrsw', 'wasw', 'broker'
                ];
                return elements.every(id => document.getElementById(id).value !== '');
            }
        
            // Read parameters and attempt assignment
            function attemptAssignment(retries = 10, delay = 1000) {
                readParam((config) => {
                    if (config) {
                        console.log("Config loaded:", config);
        
                        // Assign values to variables and HTML elements
                        const configMap = {
                            drsw: config.drsws, sosw: config.sosws, entrsw: config.entrsws,
                            ffsw: config.ffsws, dngsw: config.dngsws, cysw: config.cysws,
                            lrsw: config.lrsws, mrsw: config.mrsws, dnglsw: config.dnglsws,
                            pndsw: config.pndsws, dngrsw: config.dngrsws, entlsw: config.entlsws,
                            khnsw: config.khnsws, lvngsw: config.lvngsws, mbrsw: config.mbrsws,
                            bdrsw: config.bdrsws, wasw: config.wasws, broker: config.brokers
                        };
        
                        for (const [id, value] of Object.entries(configMap)) {
                            document.getElementById(id).value = value || '';
                        }
        
                        // Check if all elements are assigned
                        if (validateConfig()) {
                            console.log("All values assigned successfully.");
                            isValid = true;
                        } else if (retries > 0) {
                            console.log(`Retrying assignment... (${retries} retries left)`);
                            setTimeout(() => attemptAssignment(retries - 1, delay), delay);
                        } else {
                            console.error("Failed to assign all values within the retry limit.");
                            alert("Some configuration values could not be assigned.");
                        }
                    } else {
                        console.error("No configuration found.");
                        alert("No config found.");
                    }
                });
            }
        
            // Start the assignment process
            attemptAssignment();
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
                  const testtopic = "iothome";
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
                      brokers : brokerc,
                      testtopic : testtopic
                    }; 
            document.getElementById("mqtt-topic").innerHTML ="settingpressed";
            writeParm(configD); 
            //form.reset();                    
          });

  //loadParm();
  //document.getElementById('loadtopic').addEventListener('click', () => loadParm())

