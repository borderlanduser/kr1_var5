import { mockMovies } from '../mock/mock.js';

export default class MovieModel {
  constructor() {
    this.movies = this.loadMovies();
    this.listeners = [];
  }

  loadMovies() {
    const savedMovies = localStorage.getItem('movies');
    if (savedMovies) {
      return JSON.parse(savedMovies);
    }
    return [...mockMovies];
  }

  saveMovies() {
    localStorage.setItem('movies', JSON.stringify(this.movies));
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(listener => listener(this.movies));
  }

  getMovies() {
    return this.movies;
  }

  addMovie(movie) {
    const newMovie = {
      ...movie,
      id: Date.now()
    };
    this.movies.push(newMovie);
    this.saveMovies();
    this.notify();
    return newMovie;
  }

  deleteMovie(id) {
    this.movies = this.movies.filter(movie => movie.id !== id);
    this.saveMovies();
    this.notify();
  }

  updateMovie(updatedMovie) {
    const index = this.movies.findIndex(movie => movie.id === updatedMovie.id);
    if (index !== -1) {
      this.movies[index] = updatedMovie;
      this.saveMovies();
      this.notify();
      return true;
    }
    return false;
  }

  getMovieById(id) {
    return this.movies.find(movie => movie.id === id);
  }

  toggleWatchedStatus(id) {
    const movie = this.getMovieById(id);
    if (movie) {
      movie.watched = !movie.watched;
      this.saveMovies();
      this.notify();
      return true;
    }
    return false;
  }

  filterMoviesByStatus(status) {
    switch (status) {
      case 'watched':
        return this.movies.filter(movie => movie.watched);
      case 'unwatched':
        return this.movies.filter(movie => !movie.watched);
      default:
        return this.movies;
    }
  }
}