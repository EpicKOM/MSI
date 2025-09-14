$(document).ready(function() {
    //------------------TEMPERATURE CHART-----------------------------------------------------------------------------------
    let dateData = $('#forecastsTemperatureChartValues').attr('values-w').split(',').slice(0, -1);
    let temperatureMinData = $('#forecastsTemperatureChartValues').attr('values-x').split(',').slice(0, -1).map(Number);
    let temperatureMeanData = $('#forecastsTemperatureChartValues').attr('values-y').split(',').slice(0, -1).map(Number);
    let temperatureMaxData = $('#forecastsTemperatureChartValues').attr('values-z').split(',').slice(0, -1).map(Number);
    let precipitationData = $('#forecastsRainChartValues').attr('values-x').split(',').slice(0, -1).map(Number);

    // setup
    const temperatureData = {
        labels: dateData,
        datasets: [{
            label: 'Temp.min',
            data: temperatureMinData,
            borderColor: 'rgba(84, 180, 211, 1)',
            tension: 0,
            borderWidth: 2,
            pointStyle: 'circle',
            pointBorderColor: 'rgba(84, 180, 211, 1)',
            pointBackgroundColor: 'rgba(84, 180, 211, 1)',
            pointHoverBorderColor: 'rgba(84, 180, 211, 1)',
            pointHoverBackgroundColor: 'rgba(84, 180, 211, 1)',
        },
        {
            label: 'Temp.moy',
            data: temperatureMeanData,
            borderColor: 'rgba(29, 233, 182, 1)',
            tension: 0,
            borderWidth: 2,
            pointStyle: 'circle',
            pointBorderColor: 'rgba(29, 233, 182, 1)',
            pointBackgroundColor: 'rgba(29, 233, 182, 1)',
            pointHoverBorderColor: 'rgba(29, 233, 182, 1)',
            pointHoverBackgroundColor: 'rgba(29, 233, 182, 1)',
        },
        {
            label: 'Temp.max',
            data: temperatureMaxData,
            borderColor: 'rgba(220, 76, 100, 1)',
            tension: 0,
            borderWidth: 2,
            pointStyle: 'circle',
            pointBorderColor: 'rgba(220, 76, 100, 1)',
            pointBackgroundColor: 'rgba(220, 76, 100, 1)',
            pointHoverBorderColor: 'rgba(220, 76, 100, 1)',
            pointHoverBackgroundColor: 'rgba(220, 76, 100, 1)',
        }]
    };

    // config
    const temperatureConfig = {
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
                tooltip: {
                    borderWidth: 1,
                    borderColor: 'rgba(251, 251, 251, .3)',
                    displayColors: false,
                    callbacks:{
                        label: function(context) {
                            if (context.datasetIndex === 0) {
                                return 'Temp.min : ' + context.parsed.y + ' °C';
                            }
                            else if (context.datasetIndex === 1) {
                                return 'Temp.moy : ' + context.parsed.y + ' °C';
                            }
                            else if (context.datasetIndex === 2) {
                                return 'Temp.max : ' + context.parsed.y + ' °C';
                            }
                        }
                    },
                },
            },
            scales: {
                x:{
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: "dd'/'MM'/'yyyy",
                        displayFormats:
                        {
                            day: "dd/MM",
                        },
                    },

                    ticks: {
                        stepSize: 1,
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

    // setup
    const rainData = {
        labels: dateData,
        datasets: [{
            label: 'Précipitation',
            data: precipitationData,
            borderColor: 'rgba(74, 171, 237, 1)',
            backgroundColor: 'rgba(74, 171, 237, .2)',
            borderWidth: 2,
            borderRadius: 6,
        }]
    };

    // config
    const rainConfig = {
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
                                return 'Précipitation : ' + context.parsed.y + ' mm';
                            }
                        }
                    },
                },
            },
            scales: {
                x:{
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: "dd'/'MM'/'yyyy",
                        displayFormats:
                        {
                            day: "dd/MM",
                        },
                    },

                    ticks: {
                        stepSize: 1,
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

    //Chart Init
    const forecastsTemperatureChart = new Chart(document.getElementById('forecastsTemperatureChart'), temperatureConfig);
    const forecastsRainChart = new Chart(document.getElementById('forecastsRainChart'), rainConfig);
})

