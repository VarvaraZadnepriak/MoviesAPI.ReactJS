const axios = require('axios');
const cheerio = require('cheerio');

const url = require('url');
const path = require('path');

const URL_MOVIE = 'https://www.themoviedb.org/movie/';
const URL_PREFIX = 'https://image.tmdb.org/t/p/w500/';

async function getPosterUrl(movieId) {
    let posterUrl = null;
    const urlMovie = `${URL_MOVIE}${movieId}`;

    return new Promise((resolve) => {
        axios
            .get(urlMovie)
            .then(function (response) {
                // handle success
                const html = response.data;
                const $ = cheerio.load(html);
                const poster = $('img.poster.lazyload');

                if (poster) {
                    const posterUrlOrig = poster.attr('src');
                    const urlParsed = url.parse(posterUrlOrig);
                    posterUrl = `${URL_PREFIX}${path.basename(urlParsed.path)}`;
                }
                resolve(posterUrl);
            })
            .catch((error) => {
                console.log(`movieAPI: movie #${movieId}, get movie poster error: ${error.message}`);
                resolve(null);
            });
    });
}

module.exports = {
    getPosterUrl
};
