const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27117/iotdata', { useNewUrlParser: true }) && console.log('db conneted');

const IOTDataSchema = new mongoose.Schema({

    req: { type: String, default: 'IOTDevice' },
    MAC: String,
    IP: String,
    date: Date,
    sensors: [
        { name: String, val: Number },

    ]

});

const IOTDataModel = mongoose.model('realData', IOTDataSchema);

const insertIOTData = IOTDeviceData => {
    new IOTDataModel(IOTDeviceData)
        .save()
        .then(
            () => console.log('successfully save log in db'),
            err => console.log('err during log saving process in db', err)
        )
};

const findData = () => {
    IOTDataModel.find({
            MAC: /f8/i
        }).limit(3)
        .exec(function(err, books) {
            if (err) throw err;

            console.log(books);
        });
};

module.exports = {
    IOTDataModel,
    insertIOTData,
    findData
};