const remove = require('lodash/remove');

let movies = [];
const transactions = require('./transactions');

const { generateId } = require('../utils');
const { searchMovies, filterMovies, sortMovies, paginateMovies } = require('../utils/search');
const { getPosterUrl } = require('../utils/get-movie-poster');

const loadMovies = async () => {
    movies = require('../data/movies.json');
    await transactions.getTransactions(async (ta) => {
        switch (ta.t) {
            case 'NEW': {
                await addMovie(ta.data);
                break;
            }

            case 'UPD':
            case 'IMG': {
                await updateMovie({ ...ta.data, id: ta.id });
                break;
            }

            case 'DEL': {
                await deleteMovie(ta.id);
                break;
            }
        }
    });
};

const getMovies = async (query) => {
    const foundMovies = searchMovies(movies, query);
    const filteredMovies = filterMovies(foundMovies, query);
    const sortedMovies = sortMovies(filteredMovies, query);
    const paginatedMovies = paginateMovies(sortedMovies, query);

    return paginatedMovies;
};

const getMovieById = async (movieId) => {
    return movies.find((movie) => movie.id === movieId);
};

const getMoviePosterById = async (movieId) => {
    const movieIndex = movies.findIndex((m) => m.id === movieId);

    if (movieIndex < 0) {
        console.log(`movieAPI: Movie #${movieId} not found`);
        return null;
    }

    const posterUrl = await getPosterUrl(movieId);

    const movie = movies[movieIndex];
    if (posterUrl) {
        movie['poster_path'] = posterUrl;
    }
    movies[movieIndex] = movie;

    if (posterUrl) {
        await transactions.updateMoviePoster(movieId, { poster_path: posterUrl });
    }
    return movie;
};

async function deleteMovie(movieId) {
    const removedElements = remove(movies, (m) => m.id === movieId);

    await transactions.deleteMovie(movieId);
    return removedElements.length;
}

async function addMovie(movie) {
    const id = movie.id || generateId();

    const newMovie = {
        ...movie,
        id
    };

    const movieIndex = movies.findIndex((m) => m.id === id);
    if (movieIndex >= 0) {
        const oldMovie = movies[movieIndex];
        movies[movieIndex] = {
            ...oldMovie,
            ...newMovie
        };
    } else {
        movies.push(newMovie);
    }

    await transactions.newMovie(newMovie);
    return newMovie;
}

async function updateMovie(movie) {
    const movieIndex = movies.findIndex((m) => m.id === movie.id);

    if (movieIndex < 0) {
        return null;
    }

    const prevMovie = movies[movieIndex];
    movies[movieIndex] = {
        ...prevMovie,
        ...movie
    };

    await transactions.editMovie(movie, prevMovie);
    return movie;
}

module.exports = {
    loadMovies,
    getMovies,
    getMovieById,
    getMoviePosterById,
    deleteMovie,
    addMovie,
    updateMovie
};
