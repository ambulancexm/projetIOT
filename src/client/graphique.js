import _ from 'lodash';
export const x = "Hello world";



var config = {

    type: 'line',
    data: {
        labels: [],

        datasets: [
        //     {
        //     label: 'capteur de lumière',
        //     // fillColor : "rgb(138, 43, 226, 0.1)",
        //     borderColor: "rgb(138, 43, 100, 1)",
        //     steppedLine: true,
        //     data: [],
        //     fill: false,
        // }
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
window.onload = function () {
    var ctx = document.getElementById('iot-devices-sensors-chart').getContext('2d');
    window.myLine = new Chart(ctx, config);
};



export const addData =
    function (date, valeur, nomCapteur) {
        console.log(config.data.labels);
        config.data.datasets.forEach(function (dataset) {
            // si le capteur correspond à une liste
            // console.log("label = " + dataset.label);
            if (nomCapteur == dataset.label) {
                config.data.labels.push(date);
                dataset.data.push(valeur);
                // accepte 14 données max
                // et enlève les premieres de la liste
                if (dataset.data.length == 15) {
                    dataset.data.shift();
                    config.data.labels.shift();
                    console.log(" liste des data" + dataset.data.length);
                }
            }
        });


        window.myLine.update();

    }

export const addDataset =
    function (nomCapteur) {
        var newDataset = {
            label: nomCapteur,
            // backgroundColor: newColor,
            borderColor: 'rgb(255, 99, 132)',
            data: [],
            fill: false
        };
        // si dataset est vide
        if(config.data.datasets.length == 0){
            config.data.datasets.push(newDataset);
        }

        config.data.datasets.forEach(function(dataset) {
            if(dataset.label == nomCapteur){
                config.data.datasets.push(newDataset);
            }
            config.data.datasets.push(newDataset);
        });
        // creation de la nouvelle dataset

        window.myLine.update();


    }


