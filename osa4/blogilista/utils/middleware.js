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

module.exports = {
  requestLogger,
  unknownEndpoint
}
