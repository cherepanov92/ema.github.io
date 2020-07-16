
const citiesList = [ "Екатеринбург", "Сочи", "Москва", "Магадан", "Крым", "Новосибирск"];

const api = new Api();
const root = document.querySelector('.root');
const tableContainer = root.querySelector('#watherTable');
let selectedDay = new Date();
let selectedDate = `${selectedDay.getDate()}.${selectedDay.getMonth()}`;
let clearApiData = {};

// Создаём и отслеживаем нажатие кнопок с названиями городов
const citiesBtnContainer = root.querySelector('#citiesBTN');
const citiesBtnGroup = new BtnGroup(citiesBtnContainer);
citiesBtnGroup.generation(citiesList, btnType="cityBtn");

// Навешиваем слушателя кнопки
citiesBtnContainer.addEventListener('click', selectCity);

function selectCity(event) {
    let city = event.target;
    city.classList.add('active');
    // todo: найти все остальные с активностью и удалить её
    // todo: активировать анимацию загрузки
    api.getCityWeatherInfo(city.value) 
        .then((data) => {
            data['list'].forEach(function(item) {
                const datetime = new Date(item['dt'] * 1000);
                const itemDate = `${datetime.getDate()}.${datetime.getMonth()}`;
                const itemTime = `${datetime.getHours()}:00`;

                if (typeof clearApiData[itemDate] !== "undefined") {
                    clearApiData[itemDate][itemTime] = item['main'];
                } else {
                    clearApiData[itemDate] = {};
                    clearApiData[itemDate][itemTime] = item['main'];
                }
            });
            renderPagination(clearApiData);
            renderDateData(selectedDate);
        })
        .catch(error => console.error(`Ошибка загрузки: ${error}`))

}

function selectDate(event) {
  event.target.classList.add('active');
  renderDateData(event.target.value);
}

function renderDateData(date) {
  let dayData = clearApiData[date];
  
  // отрисовываем график
  renderGraph(dayData);
  // отрисовываем таблицу
  renderWatherTable(dayData);
}

function renderPagination(clearData) {
  // Создаём и отслеживаем нажатие кнопок с датами
  const dateBtnContainer = root.querySelector('#dateBTN');
  const dateBtnGroup = new BtnGroup(dateBtnContainer);
  const dateList = Object.keys(clearData);
  dateBtnGroup.generation(dateList, btnType="dateBtn");
  
  // Навешиваем слушателя кнопки
  dateBtnContainer.addEventListener('click', selectDate);
}

function renderGraph(dayData) {
  const graph = new Graph();
  graph.generation(dayData);
  graph.render();
}

function renderWatherTable(dayData) {
  watherTable = new WatherTable(tableContainer);
  watherTable.generation(dayData);
  watherTable.render();
}

console.log('check');