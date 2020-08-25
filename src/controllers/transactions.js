const JsonStream = require('../utils/json-stream');

const transactionData = new JsonStream('../data/movies.log', __dirname);
const NEW_MOVIE = 1000000000000;

async function saveTransaction(transactionType, id, data) {
    const tm = new Date();
    await transactionData.writeData({ t: transactionType, tm, id, data });
}

function getDiff(obj1, obj2) {
    const o2 = { ...obj2 };
    const diff1 = Object.entries(obj1).reduce((prevDiff, [key, value]) => {
        if (JSON.stringify(obj2[key]) !== JSON.stringify(value)) {
            prevDiff[key] = value;
        }

        o2[key] = undefined;
        return prevDiff;
    }, {});

    const diff2 = Object.entries(o2).reduce((prevDiff, [key, value]) => {
        if (typeof value !== 'undefined') {
            prevDiff[key] = null;
        }
        return prevDiff;
    }, diff1);

    return diff2;
}

function newMovie(movie) {
    return saveTransaction('NEW', movie.id, movie);
}

function deleteMovie(movieId) {
    if (movieId > NEW_MOVIE) {
        return saveTransaction('DEL', movieId, null);
    }
}

function editMovie(movie, original) {
    if (movie.id > NEW_MOVIE) {
        return saveTransaction('UPD', movie.id, getDiff(movie, original));
    }
}

function updateMoviePoster(id, posterPathData) {
    return saveTransaction('IMG', id, posterPathData);
}

async function getTransactions(callback) {
    transactionData.on('data', async (data) => {
        await callback(data);
    });
    await transactionData.readData();
}

module.exports = {
    newMovie,
    deleteMovie,
    editMovie,
    updateMoviePoster,
    getTransactions
};
