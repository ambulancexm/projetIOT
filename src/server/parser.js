const _ = require('lodash');
const MAX_DATA_BY_DEVICE = 15;


/*
input format
""


output format
{
    req: 'IOTDevice'
    MAC: '',
    IP: '',
    date: 'Date',
    sensors: [
        { name: "lum", val: 353 },
        { name: "temp", val: 26 },
        { name: "mouv", val: 1 }
    ]
},

*/

// decodage du message IOT
 const parseIOTDeviceDataStr = (data, ip) => {
    var objJson = { "req": "IOTDevice", "IP": ip, "date": new Date(), "MAC": "", "sensors": [] };

    // let foo = data.length;s
    var fooTemp = "";
    var fooData = "";
    var verifData;
    var autoriz = false;

    // recuperation de la cle de verification
    verifData = (data.charAt(data.length - 2)) + (data.charAt(data.length - 1));
    let cpt = 0;
    let boolData = false;
    let cptData = 0;

    if (verifData == data.length) { // verification de la longueur de data avec la cle
        data = data.slice(1); // on enlve la première lettre C pour la marque iot
        for (let i = 0; i < data.length; i++) {
            if (data.charAt(i) == "+") {
                break;
            }
            if (data.charAt(i) == "*") {
                fooData = fooTemp;
                switch (cpt) {
                    case 0: // nom IOT
                        objJson.MAC = fooData;
                        cpt++;
                        break;
                    case 1: // nombre de capteur
                        nbData = parseInt(fooData);

                        cpt++;
                        break;
                    case 2: // increment nom/valeur capteur
                        if (cptData < nbData) {
                            if (boolData == true) {

                                objJson.sensors[cptData].val = parseInt(fooData);
                                cptData++;  // increment du cpt de tableau de capteur
                            } else {
                                objJson.sensors[cptData] = new Object();
                                objJson.sensors[cptData].name = fooData;
                            }
                            // objJson.data[cptData]
                            boolData = !boolData;
                        }
                        break;
                }
                fooTemp = "";
            } else {
                fooTemp += data.charAt(i);
            }

        }

    } else {
        // console.log("count => "+testIp(ip,db));
        return undefined;
    }

    //   db.collection("test").insertOne(objJson, function(err,res){
    //   if (err) throw err;
    //   console.log("un doc inser�");
    // });
    console.log("parseIOTDeviceDataStr : ",  JSON.stringify(objJson));
    return objJson;
}



/*

input format
{
    req: 'IOTDevice'
    MAC: '',
    IP: '',
    date: 'Date',
    sensors: [
        { name: "lum", val: 353 },
        { name: "temp", val: 26 },
        { name: "mouv", val: 1 }
    ]
},


output format
{
    IOTDevice: {
        $MAC: {
            data: [
                {
                    IP: '',
                    date: 'Date',
                    sensors: [
                        { name: "lum", val: 353 },
                        { name: "temp", val: 26 },
                        { name: "mouv", val: 1 }
                    ]
                },
                0...MAX_DATA
            ]
        }
    }
}

*/

const cache = { 
    IOTDevice: {}
};

const getFormattedData = () => cache;

const addData = dataEntry => {
    const length = _.get(cache, `['${dataEntry.req}']['${dataEntry.MAC}'].data.length`, 0); 
    if (length <= 0) {
        cache[dataEntry.req][dataEntry.MAC] = {
            ..._.get(cache, `['${dataEntry.req}']['${dataEntry.MAC}']`, {}),
            data: [
                _.omit(dataEntry, 'MAC', 'req')
            ]
        };
    } else {
        if (length === MAX_DATA_BY_DEVICE) {
            cache[dataEntry.req][dataEntry.MAC].data.shift();
        }
        cache[dataEntry.req][dataEntry.MAC].data.push(_.omit(dataEntry, 'MAC', 'req'));
    }
}

module.exports = {
    parseIOTDeviceDataStr,
    getFormattedData,
    addData
};