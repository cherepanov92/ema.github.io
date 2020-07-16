'use strict';
class BtnGroup {
  constructor(btnContainer) {
    this.btnContainer = btnContainer;
    this.removeOldData();
  };

  removeOldData() {
    while (this.btnContainer.firstChild) {
      this.btnContainer.removeChild(this.btnContainer.firstChild);
    }
  };
  
  generation(data, btnType){
    const type = btnType;
    const container = this.btnContainer;
    data.forEach(function(item) {
      const newBtnObj = new BTN(item, type);
      const newBtn = newBtnObj.create();
      container.appendChild(newBtn);
    })
  }
};

class BTN {
  constructor(value, type, text) {
    this.value = value;
    this.text = text ? text : value;
    this.btnType = {"cityBtn":["btn","btn-primary", "btn-ln"],
                    "dateBtn":["btn","btn-primary", "btn-sm"]}
    this.btnStyleClasses = Object.keys(this.btnType).includes(type) ? this.btnType[type] : [];
  };

  create() {
    const btn = document.createElement("button");
    btn.value = this.value;
    btn.textContent = this.text;
    btn.type = "button";
    this.btnStyleClasses.forEach(function(item) {
      btn.classList.add(item);
    });
    return btn;
  };
}