const logger = require('./logger')

const requestLogger = (request, response, next) => {
  const body = Object.assign({}, request.body)
  if (request.path === '/api/users' || request.path === '/api/login') body.password = '***'
  const bodyToLog = request.method === 'POST' || request.method === 'PUT'
    ? JSON.stringify(body)
    : ''
  logger.info(`${request.method} ${request.path} ${bodyToLog}`)
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
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
