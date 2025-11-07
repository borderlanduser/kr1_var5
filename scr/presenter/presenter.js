import MovieListComponent from '../view/movie-list-component.js';

export default class MoviePresenter {
  constructor({ movieModel, movieListContainer }) {
    this._movieModel = movieModel;
    this._movieListContainer = movieListContainer;
    this._movieListComponent = null;
    this._currentFilter = 'all';

    this._handleModelChange = this._handleModelChange.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleToggleStatus = this._handleToggleStatus.bind(this);

    this._movieModel.subscribe(this._handleModelChange);
  }

  init() {
    this._renderMovieList();
  }

  _handleModelChange() {
    this._renderMovieList();
  }

  _handleEditClick(movieId) {
    const movie = this._movieModel.getMovieById(movieId);
    if (movie) {
      
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      `;
      
      modal.innerHTML = `
        <div style="
          background: #1e293b;
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid #374151;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
        ">
          <h3 style="color: #f1f5f9; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.5rem;">✏️</span>
            Редактировать фильм
          </h3>
          
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: #f1f5f9; margin-bottom: 0.5rem; font-weight: 600;">
              Название фильма:
            </label>
            <input 
              type="text" 
              id="editMovieTitle" 
              value="${movie.title}"
              style="
                width: 100%;
                padding: 0.75rem;
                background: #334155;
                border: 1px solid #374151;
                border-radius: 8px;
                color: #f1f5f9;
                font-size: 1rem;
              "
            >
          </div>
          
          <div style="margin-bottom: 2rem;">
            <label style="display: flex; align-items: center; gap: 0.75rem; color: #f1f5f9; cursor: pointer;">
              <input 
                type="checkbox" 
                id="editMovieWatched" 
                ${movie.watched ? 'checked' : ''}
                style="display: none;"
              >
              <span id="customCheckbox" style="
                width: 20px;
                height: 20px;
                border: 2px solid #374151;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: ${movie.watched ? '#10b981' : '#334155'};
                border-color: ${movie.watched ? '#10b981' : '#374151'};
              ">
                ${movie.watched ? '✓' : ''}
              </span>
              Отметить как просмотренный
            </label>
          </div>
          
          <div style="display: flex; gap: 1rem;">
            <button id="saveEdit" style="
              flex: 1;
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
              color: white;
              border: none;
              padding: 0.75rem;
              border-radius: 8px;
              cursor: pointer;
              font-weight: 600;
            ">Сохранить</button>
            
            <button id="cancelEdit" style="
              flex: 1;
              background: #64748b;
              color: white;
              border: none;
              padding: 0.75rem;
              border-radius: 8px;
              cursor: pointer;
              font-weight: 600;
            ">Отмена</button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      
      const checkbox = modal.querySelector('#editMovieWatched');
      const customCheckbox = modal.querySelector('#customCheckbox');
      
      
      customCheckbox.addEventListener('click', () => {
        checkbox.checked = !checkbox.checked;
        customCheckbox.style.background = checkbox.checked ? '#10b981' : '#334155';
        customCheckbox.style.borderColor = checkbox.checked ? '#10b981' : '#374151';
        customCheckbox.innerHTML = checkbox.checked ? '✓' : '';
      });

      modal.querySelector('#saveEdit').addEventListener('click', () => {
        const newTitle = modal.querySelector('#editMovieTitle').value.trim();
        if (newTitle) {
          this._movieModel.updateMovie({
            ...movie,
            title: newTitle,
            watched: checkbox.checked
          });
        }
        document.body.removeChild(modal);
      });

    
      modal.querySelector('#cancelEdit').addEventListener('click', () => {
        document.body.removeChild(modal);
      });

    
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });
    }
  }

  _handleDeleteClick(movieId) {
    if (confirm('Вы уверены, что хотите удалить этот фильм?')) {
      this._movieModel.deleteMovie(movieId);
    }
  }

  _handleToggleStatus(movieId) {
    this._movieModel.toggleWatchedStatus(movieId);
  }

  _renderMovieList() {
    const movies = this._movieModel.filterMoviesByStatus(this._currentFilter);

  
    if (this._movieListComponent) {
      this._movieListComponent.removeElement();
    }

    
    this._movieListComponent = new MovieListComponent(movies);
    
    
    this._movieListContainer.innerHTML = '';
    this._movieListContainer.appendChild(this._movieListComponent.getElement());

    this._movieListComponent.setEditClickHandler(this._handleEditClick);
    this._movieListComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._movieListComponent.setToggleStatusHandler(this._handleToggleStatus);
  }

  setFilter(filter) {
    this._currentFilter = filter;
    this._renderMovieList();
  }
}