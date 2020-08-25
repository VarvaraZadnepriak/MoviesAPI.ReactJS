const express = require('express');

const api = express.Router();

const { MovieBaseModel, MovieModel } = require('../models/movie.model');
const movieCtrl = require('../controllers/movie.ctrl');

const validateRequestBody = (res, model, body) => {
    const { error } = model.validate(body);

    if (error) {
        res.status(400).send({ messages: error.details.map((e) => e.message) });
    } else {
        return true;
    }
};

api.get('/movies', async (req, res) => {
    const { offset, limit } = req.query;
    const { totalAmount, data } = await movieCtrl.getMovies(req.query);

    res.status(200).send({
        totalAmount,
        data,
        offset,
        limit
    });
});

api.get('/movies/:id/poster', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    const movie = await movieCtrl.getMoviePosterById(id);

    if (movie) {
        res.status(200).send(movie);
    } else {
        res.sendStatus(404);
    }
});

api.get('/movies/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    const movie = await movieCtrl.getMovieById(id);

    if (movie) {
        res.status(200).send(movie);
    } else {
        res.sendStatus(404);
    }
});

api.delete('/movies/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    const removedCount = await movieCtrl.deleteMovie(id);

    res.sendStatus(removedCount ? 204 : 404);
});

api.post('/movies', async (req, res) => {
    const movie = req.body;

    if (!validateRequestBody(res, MovieBaseModel, movie)) {
        return;
    }

    const newMovie = await movieCtrl.addMovie(movie);

    res.status(201).send(newMovie);
});

api.put('/movies', async (req, res) => {
    const movie = req.body;

    if (!validateRequestBody(res, MovieModel, movie)) {
        return;
    }

    const updatedMovie = await movieCtrl.updateMovie(movie);

    if (updatedMovie) {
        res.status(200).send(updatedMovie);
    } else {
        res.sendStatus(404);
    }
});

async function start() {
    await movieCtrl.loadMovies();
}

module.exports = {
    movieApi: api,
    start
};
