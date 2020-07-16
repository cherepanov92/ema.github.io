class Api {
  constructor() {
    this.token = "21b44faf29243a93f1e83d29526352cc";
  }

  _sendRequest(url, request) {
    return fetch(url, request)
      .then((req) => {
        if (req.ok){
          return req.json();
        }
        return Promise.reject(`resopnce status:${req.status}`);
      })
  }

  getCityWeatherInfo(city) {
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},ru&mode=json&units=metric&appid=${this.token}`
    return this._sendRequest(url, this.baseRequest);
  }
}
