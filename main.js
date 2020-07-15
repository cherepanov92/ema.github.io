
const apiKey = "21b44faf29243a93f1e83d29526352cc"
const apiURL = "http://api.openweathermap.org/data/2.5/forecast?q=Khabarovsk,ru&mode=json&units=metric&appid="
const citiesList = [ "Екатеринбург", "Сочи", "Москва", "Магадан", "Крым", "Новосибирск"]

const api = new Api();
const root = document.querySelector('.root');

// Создаём и отслеживаем нажатие кнопок с названиями городов
const btnGroup = root.querySelector('.btn-group')
const citiesBTNGroup = new cityBtnGroup(btnGroup);
// Генерируем кнопки из citiesList
citiesList.forEach(function(item) {
    const newCityBtn = new CityBTN(item);
    citiesBTNGroup.btnRender(newCityBtn.create());
});
// Навешиваем слушателя кнопки
btnGroup.addEventListener('click', selectCity);

function selectCity(event) {
    let city = event.target;
    city.classList.add('active');
    // todo: найти все остальные с активностью и удалить её
    // todo: активировать анимацию загрузки
    api.getCityWeatherInfo(city.value) 
        .then((data) => {
            renderGraph(data)
        })
        .catch(error => console.error(`Ошибка загрузки: ${error}`))
}

function renderGraph(watherData) {
    console.log('watherData', watherData)
    // var ctxL = document.getElementById("lineChart").getContext('2d');
    // var myLineChart = new Chart(ctxL, {
    //     type: 'line',
    //     data: {
    //         labels: ["January", "February", "March", "April", "May", "June", "July"],
    //         datasets: [
    //             {label: "Погода ",
    //             data: [65, 59, 80, 81, 56, 55, 40],
    //             backgroundColor: ['rgba(105, 0, 132, .2)',],
    //             borderColor: ['rgba(200, 99, 132, .7)',],
    //             borderWidth: 2},
    //             {label: "My Second dataset",
    //             data: [28, 48, 40, 19, 86, 27, 90],
    //             backgroundColor: ['rgba(0, 137, 132, .2)',],
    //             borderColor: ['rgba(0, 10, 130, .7)',],
    //             borderWidth: 2}
    //         ]
    //     },
    //     options: {
    //         responsive: true
    //     }
    // });
}
console.log('check')