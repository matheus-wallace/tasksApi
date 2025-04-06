import { FastifyInstance } from 'fastify'
import { getTasks } from './controllers/tasks/get-tasks'
import { createTask } from './controllers/tasks/create-tasks'
import { updateTask } from './controllers/tasks/update-tasks'
import { deleteTask } from './controllers/tasks/delete-tasks'

export async function appRoutes(app: FastifyInstance) {
  app.get('/tasks', getTasks)
  app.post('/tasks', createTask)
  app.put('/tasks/:id', updateTask)
  app.delete('/tasks/:id', deleteTask)
}
