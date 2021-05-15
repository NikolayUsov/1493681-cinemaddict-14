import Observer from '..//utils/observe.js';
import { FILTER } from '..//utils/filter-utils.js';

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._activeFilter = FILTER.ALL_MOVIES;
  }

  set(updateType, filterType) {
    this._activeFilter = filterType;
    this._notify(updateType, filterType);
  }

  get() {
    return this._activeFilter;
  }
}
