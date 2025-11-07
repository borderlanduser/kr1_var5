import AbstractComponent from '../framework/view/abstract-component.js';

const createMovieItemTemplate = (movie) => `
  <div class="movie-item ${movie.watched ? 'watched' : 'unwatched'}" data-id="${movie.id}">
    <div class="movie-header">
      <div class="movie-title">${escapeHtml(movie.title)}</div>
      <div class="movie-status ${movie.watched ? 'watched' : 'unwatched'}">
        ${movie.watched ? 'Просмотрен' : 'Не просмотрен'}
      </div>
    </div>
    <div class="movie-actions">
      <button class="toggle-status" data-id="${movie.id}">
        ${movie.watched ? 'Отметить как непросмотренный' : 'Отметить как просмотренный'}
      </button>
      <button class="edit" data-id="${movie.id}">Редактировать</button>
      <button class="delete" data-id="${movie.id}">Удалить</button>
    </div>
  </div>
`;

const createMovieListTemplate = (movies) => `
  <div class="movies-section">
    <h2>Список Фильмов</h2>
    <div class="movies-list">
      ${movies.length === 0 
        ? '<div class="no-movies">Фильмы не найдены</div>' 
        : movies.map(movie => createMovieItemTemplate(movie)).join('')
      }
    </div>
  </div>
`;

// Функция экранирования HTML
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export default class MovieListComponent extends AbstractComponent {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return createMovieListTemplate(this._movies);
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelectorAll('.edit').forEach(button => {
      button.addEventListener('click', (evt) => {
        callback(parseInt(evt.target.dataset.id));
      });
    });
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelectorAll('.delete').forEach(button => {
      button.addEventListener('click', (evt) => {
        callback(parseInt(evt.target.dataset.id));
      });
    });
  }

  setToggleStatusHandler(callback) {
    this._callback.toggleStatus = callback;
    this.getElement().querySelectorAll('.toggle-status').forEach(button => {
      button.addEventListener('click', (evt) => {
        callback(parseInt(evt.target.dataset.id));
      });
    });
  }
}