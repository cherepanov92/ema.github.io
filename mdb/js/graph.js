'use strict';
class Graph {
  constructor(tableContainer) {
    // берём только необходимые для графика данные
    this.dayLabels = [];
    this.dayTemp = [];
    this.dayHumidity = [];
    this.container = document.getElementById("graphContainer");
    this.removeOldData();
  }
  
  removeOldData() {
    console.log(this.container.firstChild);
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  generation(dayData) {
    console.log(dayData);
    let dayLabels = []
    let dayTemp = []
    let dayHumidity = []

    Object.keys(dayData).forEach(function(item , current) {
      dayLabels.push(item);
      dayTemp.push(dayData[item]["temp"]);
      dayHumidity.push(dayData[item]["humidity"]);
    });

    this.dayLabels = dayLabels;
    this.dayTemp = dayTemp;
    this.dayHumidity = dayHumidity;
  }


  // Отрисовываем график
  render() {
    this.graph = document.createElement("canvas");
    this.graph.id = "lineChart";
    this.container.appendChild(this.graph)

    const ctxL = document.getElementById("lineChart").getContext('2d');
    const myLineChart = new Chart(ctxL, {
      type: 'line',
      data: {
        labels: this.dayLabels,
        datasets: [
          {label: "Температура ",
          data: this.dayTemp,
          backgroundColor: ['rgba(105, 0, 132, .2)',],
          borderColor: ['rgba(200, 99, 132, .7)',],
          borderWidth: 2},
          {label: "Влажность",
          data: this.dayHumidity,
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
}