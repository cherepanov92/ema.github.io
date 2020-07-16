'use strict';
class cityBtnGroup {
  constructor(btnContainer) {
    this.btnContainer = btnContainer;
  }
  
  generation(data){
    const container = this.btnContainer
    data.forEach(function(item) {
      console.log(item);
      const newCityBtn = new CityBTN(item);
      const newBtn = newCityBtn.create();
      container.appendChild(newBtn);
    })
  }
}

class CityBTN {
  constructor(value) {
    this.value = value;
  }

  create() {
    this.btn = document.createElement("button");
    this.btn.value = this.value;
    this.btn.textContent = this.value;
    this.btn.type = "button";
    this.btn.classList.add("btn","btn-primary", "btn-ln");
    return this.btn;
  }
}