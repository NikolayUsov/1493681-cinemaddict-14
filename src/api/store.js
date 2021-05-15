export default class Store {
  constructor(key, store) {
    this._store = store;
    this._key = key;
  }

  setItems(items) {
    this._store.setItem(this._key, JSON.stringify(items));
  }

  getItems() {
    try {
      return JSON.parse(this._store.getItem(this._key)) || {};
    } catch (err) {
      return {};
    }
  }

  setItem(key, value) {
    const store = this.getItems();
    this._store.setItem(
      this._key,
      JSON.stringify(
        Object.assign({}, store, { [key]: value }),
      ),
    );
  }

  removeItem(key) {
    const store = this.getItems();
    delete store[key];
    this._store.setItem(this._key, JSON.stringify(store));
  }
}
