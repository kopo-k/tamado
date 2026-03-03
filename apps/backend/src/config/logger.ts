import type { FastifyServerOptions } from 'fastify'

const isDev = process.env.NODE_ENV !== 'production'

export const loggerConfig: FastifyServerOptions['logger'] = isDev
  ? {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    }
  : true
