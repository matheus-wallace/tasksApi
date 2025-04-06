import { FastifyReply, FastifyRequest } from 'fastify'
import makeTasksService from '../services/factories/make-tasks-service'

export async function getTasks(request: FastifyRequest, reply: FastifyReply) {
  try {
    const tasksService = makeTasksService()
    const { tasks } = await tasksService.getAllTasks()
    return reply.status(200).send({ tasks })
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Internal Server Error' })
  }
}
