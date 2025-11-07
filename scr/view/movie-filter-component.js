import AbstractComponent from '../framework/view/abstract-component.js';

const createFilterTemplate = () => `
  <div class="filter-section">
    <h2>Фильтры</h2>
    <div class="filter-group">
      <label><input type="radio" name="statusFilter" value="all" checked> Все</label>
      <label><input type="radio" name="statusFilter" value="watched"> Просмотренные</label>
      <label><input type="radio" name="statusFilter" value="unwatched"> Непросмотренные</label>
    </div>
  </div>
`;

export default class MovieFilterComponent extends AbstractComponent {
  constructor() {
    super();
    this._onFilterChangeHandler = this._onFilterChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate();
  }

  _onFilterChangeHandler(evt) {
    this._callback.filterChange(evt.target.value);
  }

  setFilterChangeHandler(callback) {
    this._callback.filterChange = callback;
    this.getElement().querySelectorAll('input[name="statusFilter"]').forEach(radio => {
      radio.addEventListener('change', this._onFilterChangeHandler);
    });
  }
}