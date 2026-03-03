import type { FastifyInstance, FastifyError } from 'fastify'
import { ZodError } from 'zod'
import { AppError } from '../errors/AppError.js'

export async function errorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler((error: FastifyError | Error, request, reply) => {
    request.log.error(error)

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        error: error.name,
        message: error.message,
        code: error.code,
      })
    }

    if (error instanceof ZodError) {
      return reply.status(400).send({
        error: 'ValidationError',
        message: 'Validation failed',
        details: error.issues,
      })
    }

    if ('statusCode' in error && typeof error.statusCode === 'number') {
      return reply.status(error.statusCode).send({
        error: error.name || 'Error',
        message: error.message,
      })
    }

    return reply.status(500).send({
      error: 'InternalServerError',
      message:
        process.env.NODE_ENV === 'production'
          ? 'Internal Server Error'
          : error.message,
    })
  })
}
