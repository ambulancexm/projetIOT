import _ from 'lodash';
import { on } from './pubsub';
import $ from 'jquery';

var config = {

    type: 'line',
    data: {
        labels: [],

        datasets: [
            {
            label: 'capteur de lumière',
            
            borderColor: "rgb(138, 43, 100, 1)",
            steppedLine: true,
            data: [],
            fill: false,
        }
    ]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'courbe de capteur'
        },

        scales: {
            xAxes: [{
                // display: true,
                // scaleLabel: {
                // 	display: true,
                // 	labelString: 'Second'
                // }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }]
        }
    }
};


// affichage dans le DOM
const render = () =>
window.onload = function () {
    var ctx = document.getElementById('iot-devices-sensors-chart').getContext('2d');
    window.myLine = new Chart(ctx, config);
};



// server data update 
on('server/data/update', data => render());