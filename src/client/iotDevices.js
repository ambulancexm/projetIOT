import _ from 'lodash';
import $ from 'jquery';
import { on, emit } from './pubsub';

// state
const state = {
    selectedSensors: [],
    IOTDevicesData: {}
};

const setIOTDeviceData = IOTDevicesData => state.IOTDevicesData = IOTDevicesData;

const findIndex = sensor =>
    _.findIndex(state.selectedSensors, s => s.name === sensor.name && s.device === sensor.device);

// button active
const isActive = sensor => findIndex(sensor) !== -1

const toggleSelectedSensor = sensor => {
    isActive(sensor) ?
        state.selectedSensors.splice(findIndex(sensor), 1) :
        state.selectedSensors.push(sensor);
    render(state.IOTDevicesData);
}

// cache DOM
const $iotDevices = $('#iot-devices');


// {/* <button class="btn-sensor btn ${activeButton(device)} btn-sm-3 btn-xs-3 active " style="width:130px" */}
// HTML String Templates
const sensorTemplate = (name, val, device) => `
    <button class="btn-sensor btn ${isActive({ name, device }) ? 'btn-primary' : 'btn-secondary'} btn-sm-3 btn-xs-3 " aria-pressed="true"  style="width:130px"
            id="${device}-${name}"><i class="fas fa-star fa-sm pr-2" aria-hidden="true"></i>
            <span>${name}</span> | <span>${val}</span>
    </button>`;

const deviceTemplate = (device, sensorTemplateArr) => `
    <div class="btn-group" role="group" id="${device}">
      <div class="btn-group-sm-3 btn-group-xs-3">
        <button class="btn btn-success disabled" style="width:180px">${device}</button>
      </div>
      <div>${sensorTemplateArr.join('')}</div>
    </div>`;

const devicesTemplate = deviceTemplateArr => `
      <div class="btn-toolbar-xs-3 " role="toolbar" id="arrayDevices">
          ${deviceTemplateArr.join('')} 
      </div>`;

const IOTDevicesTemplate = IOTDevicesData => {
    const devicesTemplateArr = _.map(IOTDevicesData, (IOTDeviceData, device) => {
        const sensorTemplateArr = _.map(_.last(IOTDeviceData.data).sensors, sensor => sensorTemplate(
            sensor.name,
            sensor.val,
            device
        ));
        return deviceTemplate(device, sensorTemplateArr);
    });
    return devicesTemplate(devicesTemplateArr);
};

// render
const render = IOTDevicesData => $iotDevices.html(IOTDevicesTemplate(IOTDevicesData));

// attach events
// sensor button click
$iotDevices.delegate('.btn-sensor ', 'click', e => {
    const [device, name] = e.currentTarget.id.split('-');
    toggleSelectedSensor({ device, name });
    console.log("bouton", e.currentTarget.id);
    emit('ui/selectedSensors/update', state.selectedSensors);
    console.log(state);
});
// server data update 
on('server/data/update', data => {
    setIOTDeviceData(data.IOTDevice);
    render(data.IOTDevice);
});