export default class Observer {
  constructor() {
    this._observers = [];
  }

  addToObserve(observer) {
    this._observers.push(observer);
  }

  removeObserve(removeObserver) {
    this._observers.filter((observer) => observer !== removeObserver);
  }

  _notify(event, payload, popupStatus) {
    this._observers.forEach((observe) => observe(event, payload, popupStatus));
  }
}
