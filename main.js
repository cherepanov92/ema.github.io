const apiKey = "21b44faf29243a93f1e83d29526352cc"
const apiURL = "http://api.openweathermap.org/data/2.5/forecast?q=Khabarovsk,ru&mode=json&units=metric&appid="

// запрашиваем данные
let fakeData = {
    "cod":"200",
    "message":0,
    "cnt":40,
    "list":[
        {"dt":1594814400,
        "main":{
            "temp":23.98,
            "feels_like":25.56,
            "temp_min":20.82,
            "temp_max":23.98,
            "pressure":1001,
            "sea_level":1001,
            "grnd_level":991,
            "humidity":70,
            "temp_kf":3.16},
        "weather":[
            {"id":800,
            "main":"Clear",
            "description":"clear sky",
            "icon":"01n"}],
        "clouds":{
            "all":0},
        "wind":{
            "speed":1.84,
            "deg":201},
        "sys":{
            "pod":"n"},
        "dt_txt":"2020-07-15 12:00:00"},
    ],
    "city":{
        "id":2022890,
        "name":"Khabarovsk",
        "coord":{
            "lat":48.4808,
            "lon":135.0928
        },
        "country":"RU",
        "population":579000,
        "timezone":36000,
        "sunrise":1594754015,
        "sunset":1594810630}
}

//line
var ctxL = document.getElementById("lineChart").getContext('2d');
var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {label: "My First dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: ['rgba(105, 0, 132, .2)',],
            borderColor: ['rgba(200, 99, 132, .7)',],
            borderWidth: 2},
            {label: "My Second dataset",
            data: [28, 48, 40, 19, 86, 27, 90],
            backgroundColor: ['rgba(0, 137, 132, .2)',],
            borderColor: ['rgba(0, 10, 130, .7)',],
            borderWidth: 2}
        ]
    },
    options: {
        responsive: true
    }
});

console.log('check')