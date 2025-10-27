//------------------TEMPERATURE CHART-----------------------------------------------------------------------------------
// setup
const temperatureData = {
    labels:[],
    datasets: [{
        label: 'Température',
        data: [],
        borderColor: 'rgba(250, 250, 250, 1)',
        backgroundColor: 'rgba(224, 224, 224, .2)',
        fill: true,
        tension: 0,
        borderWidth: 2,
        pointStyle: 'circle',
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointHoverBorderColor: 'rgba(250, 250, 250, 1)',
        pointHoverBackgroundColor: 'rgba(250, 250, 250, 1)',
    }]
};

// config
export const temperatureConfig = {
    type: 'line',
    data: temperatureData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgba(251, 251, 251, .6)',
                },
            },
            filler: {
                propagate: true
            },
            tooltip: {
                borderWidth: 1,
                borderColor: 'rgba(251, 251, 251, .3)',
                displayColors: false,
                callbacks:{
                    label: function(context) {
                        if (context.datasetIndex === 0) {
                            return 'Température : ' + context.parsed.y.toFixed(1) + ' °C';
                        }
                    }
                },
            },
        },
        scales: {
            x:{
                type: 'time',
                time: {
                    unit: 'hour',
                    tooltipFormat: "dd'/'MM'/'yyyy 'à' HH':'mm",
                    displayFormats:
                    {
                        hour: "HH'h'",
                    },
                },

                ticks: {
                    stepSize: 2,
                    color: 'rgba(251, 251, 251, .5)',
                },

                grid: {
                    color: 'rgba(251, 251, 251, .1)',
                },

            },
            y: {
                grid: {
                    color: 'rgba(251, 251, 251, .1)',
                },

                ticks: {
                    color: 'rgba(251, 251, 251, .5)',
                },
            }
        }
    }
};

//------------------RAIN CHART------------------------------------------------------------------------------------------
// setup
const rainData = {
    labels:[],
    datasets: [{
        label: 'Pluie',
        data:[],
        borderColor: 'rgba(74, 171, 237, 1)',
        backgroundColor: 'rgba(74, 171, 237, .2)',
        borderWidth: 2,
        borderRadius: 4,
    }]
};
// config
export const rainConfig = {
    type: 'bar',
    data: rainData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgba(251, 251, 251, .6)',
                },
            },
            tooltip: {
                borderWidth: 1,
                borderColor: 'rgba(251, 251, 251, .3)',
                displayColors: false,
                callbacks:{
                    label: function(context) {
                        if (context.datasetIndex === 0) {
                            return 'Pluie sur 1h : ' + context.parsed.y.toFixed(1) + ' mm';
                        }
                    }
                },
            },
        },
        scales: {
            x:{
                type: 'time',
                time: {
                    unit: 'hour',
                    tooltipFormat: "dd'/'MM'/'yyyy 'à' HH':'mm",
                    displayFormats:
                    {
                        hour: "HH'h'",
                    },
                },

                ticks: {
                    stepSize: 2,
                    color: 'rgba(251, 251, 251, .5)',
                },

                grid: {
                    color: 'rgba(251, 251, 251, .1)',
                },

            },
            y: {
                grid: {
                    color: 'rgba(251, 251, 251, .1)',
                },

                ticks: {
                    color: 'rgba(251, 251, 251, .5)',
                },
            }
        }
    }
}

//------------------WIND CHART------------------------------------------------------------------------------------------

// setup
const windData = {
    labels:[],
    datasets: [{
        label: 'Vent moyen',
        data:[],
        borderColor: 'rgba(89, 243, 166, 1)',
        tension: 0,
        borderWidth: 2,
        pointStyle: 'circle',
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointHoverBorderColor: 'rgba(89, 243, 166, 1)',
        pointHoverBackgroundColor: 'rgba(89, 243, 166, 1)',
    },
    {
        label: 'Rafales',
        data: [],
        borderColor: 'rgba(20, 164, 77, 1)',
        tension: 0,
        borderWidth: 2,
        pointStyle: 'circle',
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointHoverBorderColor: 'rgba(20, 164, 77, 1)',
        pointHoverBackgroundColor: 'rgba(20, 164, 77, 1)',
    }]
};

// config
export const windConfig = {
    type: 'line',
    data: windData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgba(251, 251, 251, .6)',
                },
            },
            tooltip: {
                borderWidth: 1,
                borderColor: 'rgba(251, 251, 251, .3)',
                displayColors: false,
                callbacks:{
                    label: function(context) {
                        if (context.datasetIndex === 0) {
                            return 'Vent moyen : ' + context.parsed.y + ' km/h';
                        }
                        else if (context.datasetIndex === 1) {
                            return 'Rafales : ' + context.parsed.y + ' km/h';
                        }

                    }
                },
            },
        },
        scales: {
            x:{
                type: 'time',
                time: {
                    unit: 'hour',
                    tooltipFormat: "dd'/'MM'/'yyyy 'à' HH':'mm",
                    displayFormats:
                    {
                        hour: "HH'h'",
                    },
                },

                ticks: {
                    stepSize: 2,
                    color: 'rgba(251, 251, 251, .5)',
                },

                grid: {
                    color: 'rgba(251, 251, 251, .1)',
                },

            },
            y: {
                grid: {
                    color: 'rgba(251, 251, 251, .1)',
                },

                ticks: {
                    color: 'rgba(251, 251, 251, .5)',
                },
            }
        }
    }
};

//------------------WIND DIRECTION CHART--------------------------------------------------------------------------------

// setup
const windDirectionData = {
    labels: ['N',
            'NNE',
            'NE',
            'ENE',
            'E',
            'ESE',
            'SE',
            'SSE',
            'S',
            'SSO',
            'SO',
            'OSO',
            'O',
            'ONO',
            'NO',
            'NNO'],
    datasets: [
    {
        label: 'Rose des vents',
        data: [],
        borderColor: 'rgba(29, 233, 182, 1)',
        backgroundColor: 'rgba(29, 233, 182, .3)',
        borderWidth: 2,
        pointStyle: 'circle',
        pointBorderColor: 'rgba(29, 233, 182, 1)',
        pointBackgroundColor: 'rgba(29, 233, 182, 1)',
        pointHoverBorderColor: 'rgba(29, 233, 182, 1)',
        pointHoverBackgroundColor: 'rgba(29, 233, 182, 1)',
    }]
};

const windDirectionConfig = {
    type: 'radar',
    data: windDirectionData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgba(251, 251, 251, .6)',
                },
            },
            tooltip: {
                borderWidth: 1,
                borderColor: 'rgba(251, 251, 251, .3)',
                displayColors: false,
                callbacks:{
                    label: function(context) {
                        if (context.datasetIndex === 0) {
                            return context.parsed.r.toFixed(1) + ' %';
                        }
                    }
                },
            },
        },
        scales: {
            r: {
                angleLines: {
                    color: 'rgba(251, 251, 251, .7)',
                },

                grid: {
                    color: 'rgba(251, 251, 251, .4)',
                },

                pointLabels: {
                    color: 'rgba(255, 255, 255, 1)',
                },

                ticks: {
                    color: 'rgba(251, 251, 251, 1)',
                    backdropColor: 'rgba(0, 0, 0, 0)',
                },
            }
        },
    },
};

//------------------Humidity CHART-----------------------------------------------------------------------------------

// setup
const humidityData = {
    labels:[],
    datasets: [{
        label: 'Humidité',
        data:[],
        borderColor: 'rgba(84, 179, 211, 1)',
        backgroundColor: 'rgba(26, 35, 126, .2)',
        fill: true,
        tension: 0,
        borderWidth: 2,
        pointStyle: 'circle',
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointHoverBorderColor: 'rgba(84, 179, 211, 1)',
        pointHoverBackgroundColor: 'rgba(84, 179, 211, 1)',
    }]
};

// config
export const humidityConfig = {
    type: 'line',
    data: humidityData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgba(251, 251, 251, .6)',
                },
            },
            tooltip: {
                borderWidth: 1,
                borderColor: 'rgba(251, 251, 251, .3)',
                displayColors: false,
                callbacks:{
                    label: function(context) {
                        if (context.datasetIndex === 0) {
                            return 'Humidité : ' + context.parsed.y + ' %';
                        }
                    }
                },
            },
        },
        scales: {
            x:{
                type: 'time',
                time: {
                    unit: 'hour',
                    tooltipFormat: "dd'/'MM'/'yyyy 'à' HH':'mm",
                    displayFormats:
                    {
                        hour: "HH'h'",
                    },
                },

                ticks: {
                    stepSize: 2,
                    color: 'rgba(251, 251, 251, .5)',
                },

                grid: {
                    color: 'rgba(251, 251, 251, .1)',
                },

            },
            y: {
                grid: {
                    color: 'rgba(251, 251, 251, .1)',
                },

                ticks: {
                    color: 'rgba(251, 251, 251, .5)',
                },
            }
        }
    }
}

//------------------PRESSURE CHART--------------------------------------------------------------------------------------------

// setup
const pressureData = {
    labels:[],
    datasets: [{
        label: 'Pression',
        data:[],
        borderColor: 'rgba(224, 64, 251, 1)',
        backgroundColor: 'rgba(100, 31, 136, .2)',
        fill: true,
        tension: 0,
        borderWidth: 2,
        pointStyle: 'circle',
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointHoverBorderColor: 'rgba(224, 64, 251, 1)',
        pointHoverBackgroundColor: 'rgba(224, 64, 251, 1)',
    }]
};

// config
export const pressureConfig = {
    type: 'line',
    data: pressureData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgba(251, 251, 251, .6)',
                },
            },
            tooltip: {
                borderWidth: 1,
                borderColor: 'rgba(251, 251, 251, .3)',
                displayColors: false,
                callbacks:{
                    label: function(context) {
                        if (context.datasetIndex === 0) {
                            return 'Pression : ' + context.parsed.y + ' hPa';
                        }
                    }
                },
            },
        },
        scales: {
            x:{
                type: 'time',
                time: {
                    unit: 'hour',
                    tooltipFormat: "dd'/'MM'/'yyyy 'à' HH':'mm",
                    displayFormats:
                    {
                        hour: "HH'h'",
                    },
                },

                ticks: {
                    stepSize: 2,
                    color: 'rgba(251, 251, 251, .5)',
                },

                grid: {
                    color: 'rgba(251, 251, 251, .1)',
                },

            },
            y: {
                grid: {
                    color: 'rgba(251, 251, 251, .1)',
                },

                ticks: {
                    color: 'rgba(251, 251, 251, .5)',
                },
            }
        }
    }
}