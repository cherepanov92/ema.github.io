
const root = document.querySelector('.root');
const tableContainer = root.querySelector('#watherTable');
const citiesBtnContainer = root.querySelector('#citiesBTN');
const dateBtnContainer = root.querySelector('#dateBTN');
const preloaderContainer = root.querySelector('#preloader')

const api = new Api();
const citiesBtnGroup = new BtnGroup(citiesBtnContainer);

const citiesList = [ "Екатеринбург", "Сочи", "Москва", "Магадан", "Крым", "Новосибирск"];

let selectedDay = new Date();
let selectedDate = `${selectedDay.getDate()}.${selectedDay.getMonth()}`;
let clearApiData = {};

// Создаём и отслеживаем нажатие кнопок с названиями городов
citiesBtnGroup.generation(citiesList, btnType="cityBtn");

// Навешиваем слушателя кнопок гродов
citiesBtnContainer.addEventListener('click', selectCity);

function selectCity(event) {
    let city = event.target;
    preloaderContainer.style.visibility = "visible";
    changeActiveBtn(citiesBtnContainer, city);
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
            preloaderContainer.style.visibility = "hidden";
            renderPagination(clearApiData);
            renderDateData(selectedDate);
        })
        .catch(error => alert(`Ошибка загрузки: ${error}`))
}


function selectDate(event) {
  let dataBtn = event.target;
  changeActiveBtn(dateBtnContainer, dataBtn);
  renderDateData(dataBtn.value);
}

function renderDateData(date) {
  var dateList = Object.keys(clearApiData)
  // Если текущее время > 23:00 то Api не выдаст данных по текущей дате, в таком случае берём следующий день
  date = selectedDate = dateList.includes(date) ? date : dateList[0];
  let dayData = clearApiData[date];
  
  // отрисовываем график
  renderGraph(dayData);
  // отрисовываем таблицу
  renderWatherTable(dayData);
}

function renderPagination(clearData) {
  // Создаём и отслеживаем нажатие кнопок с датами
  const dateBtnGroup = new BtnGroup(dateBtnContainer);
  const dateList = Object.keys(clearData);
  dateBtnGroup.generation(dateList, btnType="dateBtn");
  
  // Навешиваем слушателя кнопки
  dateBtnContainer.addEventListener('click', selectDate);
}

function changeActiveBtn(obj, newBtn) {
  if (obj.querySelector('.active')){
    obj.querySelector('.active').classList.remove('active');
  };
  newBtn.classList.add('active');
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
