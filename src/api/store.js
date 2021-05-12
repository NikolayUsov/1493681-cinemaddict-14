export default class Store {
  constructor(key,store) {
    this._store = store;
    this._key = key;
    console.log( this._store, this._key);
  }

  setItems (items) {
    this._store.setItem(this._key,  JSON.stringify(items));
  }

  getItems () {
    try {
      return  JSON.parse(this._store.getItem(this._key)) || {};
    } catch(err) {
      return {};
    }
  }
}
