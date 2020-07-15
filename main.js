
const apiKey = "21b44faf29243a93f1e83d29526352cc"
const apiURL = "http://api.openweathermap.org/data/2.5/forecast?q=Khabarovsk,ru&mode=json&units=metric&appid="
const citiesList = [ "Екатеринбург", "Сочи", "Москва", "Магадан", "Крым", "Новосибирск"]

const api = new Api();
const root = document.querySelector('.root');
let selectedDate = new Date().getDate()

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
            clear_data = {};
            data['list'].forEach(function(item) {
                const datetime = new Date(item['dt'] * 1000)
                const itemDate = datetime.getDate()
                const itemTime = datetime.getHours()
        
                if (typeof clear_data[itemDate] !== "undefined") {
                    clear_data[itemDate][itemTime] = item['main']
                } else {
                    clear_data[itemDate] = {}
                    clear_data[itemDate][itemTime] = item['main']
                }
            });
            // todo:отрисовываем пагинацию

            // отрисовываем график
            renderGraph(clear_data)
        })
        .catch(error => console.error(`Ошибка загрузки: ${error}`))
}

function renderGraph(watherData) {
    dayData = watherData[selectedDate]

    // берём только необходимые для графика данные
    const dayLabels = []
    const dayTemp = []
    const dayHumidity = []

    Object.keys(dayData).forEach(function(item) {
        dayLabels.push(item)
        dayTemp.push(dayData[item]["temp"])
        dayHumidity.push(dayData[item]["humidity"])
    });

    // Отрисовываем график
    var ctxL = document.getElementById("lineChart").getContext('2d');
    var myLineChart = new Chart(ctxL, {
        type: 'line',
        data: {
            labels: dayLabels,
            datasets: [
                {label: "Температура ",
                data: dayTemp,
                backgroundColor: ['rgba(105, 0, 132, .2)',],
                borderColor: ['rgba(200, 99, 132, .7)',],
                borderWidth: 2},
                {label: "Влажность",
                data: dayHumidity,
                backgroundColor: ['rgba(0, 137, 132, .2)',],
                borderColor: ['rgba(0, 10, 130, .7)',],
                borderWidth: 2}
            ]
        },
        options: {
            responsive: true
        }
    });
}
console.log('check')