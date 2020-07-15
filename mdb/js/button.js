'use strict';
class cityBtnGroup {
  constructor(btnContainer) {
    this.btnContainer = btnContainer;
  }

  btnRender(btn) {
    this.btnContainer.appendChild(btn);
  }
}

class CityBTN {
  constructor(value) {
    this.value = value;
    console.log(this.value)
  }

  create() {
    // todo: улучшить
    this.btn = document.createElement("button");
    this.btn.value = this.value;
    this.btn.textContent = this.value;
    this.btn.type = "button";
    this.btn.classList.add("btn","btn-secondary");
    return this.btn;
  }
}