import AbstractComponent from '../framework/view/abstract-component.js';

const createMovieFormTemplate = () => `
  <div class="form-section">
    <h2>Добавить Фильм</h2>
    <form id="movieForm">
      <div class="form-group">
        <label for="movieTitle">Название фильма:</label>
        <input type="text" id="movieTitle" placeholder="Например, Начало" required>
      </div>
      <div class="form-group">
        <label class="checkbox-label">
          <input type="checkbox" id="movieWatched">
          <span class="checkmark"></span>
          Отметить как просмотренный
        </label>
      </div>
      <button type="submit">Добавить Фильм</button>
    </form>
  </div>
`;

export default class MovieFormComponent extends AbstractComponent {
  constructor() {
    super();
    this._onSubmitHandler = this._onSubmitHandler.bind(this);
  }

  getTemplate() {
    return createMovieFormTemplate();
  }

  _onSubmitHandler(evt) {
    evt.preventDefault();
    const title = this.getElement().querySelector('#movieTitle').value;
    const watched = this.getElement().querySelector('#movieWatched').checked;

    if (!title.trim()) {
      alert('Введите название фильма');
      return;
    }

    this._callback.submit({ title, watched });
    this.getElement().querySelector('#movieForm').reset();
  }

  setSubmitHandler(callback) {
    this._callback.submit = callback;
    this.getElement().querySelector('#movieForm').addEventListener('submit', this._onSubmitHandler);
  }
}