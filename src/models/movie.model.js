const Joi = require('@hapi/joi')

const MovieBaseModel = Joi.object({
  title: Joi.string()
    .required(),

  tagline: Joi.string(),

  vote_average: Joi.number()
    .min(0)
    .max(100),

  vote_count: Joi.number()
    .integer()
    .min(0),

  release_date: Joi.string()
    .isoDate(),

  poster_path: Joi.string()
    .uri()
    .required(),

  overview: Joi.string()
    .required(),

  budget: Joi.number()
    .integer()
    .min(0),

  revenue: Joi.number()
    .integer()
    .min(0),

  genres: Joi.array()
    .items(Joi.string().required()),

  runtime: Joi.number()
    .integer()
    .min(0)
    .required(),
})
  .prefs({ convert: false, abortEarly: false })

const MovieModel = MovieBaseModel.append({
  id: Joi.number()
    .integer()
    .required(),
})
  .prefs({ convert: false, abortEarly: false })

module.exports = {
  MovieBaseModel,
  MovieModel,
}
