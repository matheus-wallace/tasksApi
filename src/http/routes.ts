import { FastifyInstance } from 'fastify'
import { getTasks } from './controllers/tasks'

export async function appRoutes(app: FastifyInstance) {
  app.get('/tasks', getTasks)
}
