// client.js
const _ = require('lodash');
const WebSocket = require('ws');
const url = 'ws://192.168.137.1:8080';
const ws = new WebSocket(url);

const MACs = [
  "f8_f0_05_ec_92_d3",
  "36_11_c9_b1_d6_14",
  "5f_53_a5_86_b8_a6"
];

const getRandomData = MAC => {
  let tmp = "z" + MAC + "*3*lum*" + _.random(300, 600) + "*temp*" + _.random(20, 30) + "*mouv*" + _.random(0, 1) + "*";
  tmp += "+" + (tmp.length + 3) % 100;
  return tmp;
};

ws.on('open', () => {
  console.log('connected');
  setInterval(() => {
    MACs.forEach(MAC => ws.send(getRandomData(MAC)));
  }, 2000);
});

