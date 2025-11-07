import MovieModel from './model/movie-model.js';
import MoviePresenter from './presenter/presenter.js';
import MovieFormComponent from './view/movie-form-component.js';
import MovieFilterComponent from './view/movie-filter-component.js';
import { render } from './framework/render.js';

const movieModel = new MovieModel();


const moviePresenter = new MoviePresenter({
  movieModel: movieModel,
  movieListContainer: document.querySelector('.movies-container')
});

// Форма добавления фильма
const movieFormComponent = new MovieFormComponent();
movieFormComponent.setSubmitHandler((movieData) => {
  movieModel.addMovie(movieData);
});
render(movieFormComponent, '.form-container');


const movieFilterComponent = new MovieFilterComponent();
movieFilterComponent.setFilterChangeHandler((filterValue) => {
  moviePresenter.setFilter(filterValue);
});
render(movieFilterComponent, '.filter-container');


moviePresenter.init();