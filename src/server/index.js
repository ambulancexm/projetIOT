require('./fakeIOT');
const { parseIOTDeviceDataStr, addData, getFormattedData } = require('./parser');
const WebSocket = require('ws').Server
let request = require('request');
const { IOTDataModel, insertIOTData, findData } = require('./db');
const MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
const express = require('express');

const xmlhttprequest = require('xmlhttprequest').XMLHttpRequest;


var url = 'mongodb://192.168.43.179:27017/myproject';

var app = express()

app.use(express.static('public'));

var wss = new WebSocket({ port: 8080 });
var wssIOT = new WebSocket({ port: 8081 });



wssIOT.on('connection', (ws, req) => {
    console.log("je suis connecté iot");
    //reception de message
    ws.on('message', function(message) {

        // console.log("oit8081 : ", message);
        const IOTDeviceData = parseIOTDeviceDataStr(message, req.connection.remoteAddress);
        // console.log(IOTDeviceData);
        addData(IOTDeviceData);
        insertIOTData(IOTDeviceData);
        // findData("f8");

        // broadcast pour tous les clients web
        wss.clients.forEach(client => {
            if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify(getFormattedData()));
            }
        });
    });
});

wss.on('connection', function(ws, req) {
    console.log("je suis connecté client web");
});

app.listen(3000);