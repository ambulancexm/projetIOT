import _ from 'lodash';
import { on } from './pubsub';
import Chart from 'chart.js';
import $ from 'jquery';

const COLOR = [
    'rgb(255, 99, 132,0.5)', // red: 
    'rgb(255, 205, 86,0.5)', // yellow: 
    'rgb(54, 162, 235,0.5)', // blue: 
    'rgb(64, 255, 0,0.5)', // green
    'rgb(128, 0, 255,0.5)', // purple
    'rgb(255, 191, 0,0.5)', // orange
    'rgb(255, 0, 255,0.5)', //pink
    'rgb(0,0, 0,0.5)', //black

]

const TIME_FORMAT = 'MM/DD/YYYY HH:mm';

const createConfig = () => ({
    type: 'bar',
    data: {},
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'courbe de capteur'
        },
        scales: {
            xAxes: [{
                type: 'time',
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                },
                position: 'left',
                id: 'y-axis-1'
            }, {
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                },
                position: 'right',
                id: 'y-axis-2'
            }]
        }
    }
});

const state = {
    selectedSensors: [],
    IOTDevicesData: {},
    config: createConfig()
};

const createDatasetTemplate = dataset => ({
    borderColor: `rgb(0.0.0.0.5)`,
    backgroundColor: `rgb(0.0.0.0.5)`,
    yAxisID: 'y-axis-1',
    fill: false,
    data: [],
    ...dataset
});

const setSelectedSensors = sensor =>
    state.selectedSensors = sensor;


const setIOTDevicesData = IOTDevicesData =>
    state.IOTDevicesData = IOTDevicesData;


// cache DOM
const $iotDevicesSensorsChart = $('#iot-devices-sensors-chart');


// render
const render = () => {
    const datasets = _.map(state.selectedSensors, (sensor, index) => createDatasetTemplate({
        type: sensor.name === 'mouv' ? 'bar' : 'line',
        backgroundColor: COLOR[index],
        borderColor: COLOR[index],
        label: `${sensor.device}:${sensor.name}`,
        yAxisID: sensor.name === 'mouv' ? 'y-axis-2' : 'y-axis-1',
        data: _.map(state.IOTDevicesData[sensor.device].data, dataEntry => ({
            x: dataEntry.date,
            y: _.find(dataEntry.sensors, { name: sensor.name }).val
        }))
    }));
    state.config.data.datasets = datasets;
    // console.log(datasets);
    window.iotDevicesSensorsChart.update(0);
}

// events

// affichage dans le DOM
window.onload = function() {
    var ctx = document.getElementById('iot-devices-sensors-chart').getContext('2d');
    window.iotDevicesSensorsChart = new Chart(ctx, state.config);
}

// selected sensors update
on('ui/selectedSensors/update', selectedSensors => {
    setSelectedSensors(selectedSensors);
    render();
});


// server data update 
on('server/data/update', data => {
    setIOTDevicesData(data.IOTDevice);
    render();
});