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