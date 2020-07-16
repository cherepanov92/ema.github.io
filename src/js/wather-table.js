'use strict';
class WatherTable {
  constructor(tableContainer) {
    this.tableContainer = tableContainer;
    this.theadTemplate = `<thead>
                            <tr>
                              <th scope="col">Дата/Время</th>
                              <th scope="col">Температура</th>
                              <th scope="col">Ощущается как</th>
                              <th scope="col">Давление</th>
                              <th scope="col">Влажность</th>
                            </tr>
                          </thead>`;
    this.removeOldData();
  };

  removeOldData() {
    console.log(this.tableContainer.firstChild);
    while (this.tableContainer.firstChild) {
      this.tableContainer.removeChild(this.tableContainer.firstChild);
    }
  }

  generation(data) {
    this.table = document.createElement("table");
    this.table.classList.add('table');
    this.table.innerHTML = this.theadTemplate;
    const tbody = document.createElement('tbody');

    Object.keys(data).forEach(function(item) {
      const tr = document.createElement('tr');

      tr.innerHTML = `<td>${item}</td>
                      <td>${data[item]['temp']}</td>
                      <td>${data[item]['feels_like']}</td>
                      <td>${data[item]['pressure']}</td>
                      <td>${data[item]['humidity']}</td>`
      tbody.appendChild(tr);
    });
    this.table.appendChild(tbody);
  }

  render() {
    this.tableContainer.appendChild(this.table);
  }
}
