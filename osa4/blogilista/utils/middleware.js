const logger = require('./logger')

const requestLogger = (request, response, next) => {
  const body = request.method === 'POST' || request.method === 'PUT'
    ? JSON.stringify(request.body)
    : ''
  logger.info(`${request.method} ${request.path} ${body}`)
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
