import { FastifyReply, FastifyRequest } from 'fastify'
import makeTasksService from '../../services/factories/make-tasks-service'
import { z } from 'zod'

export async function createTask(request: FastifyRequest, reply: FastifyReply) {
  const createTaskBodySchema = z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
  })

  const { title, description } = createTaskBodySchema.parse(request.body)

  try {
    const tasksService = makeTasksService()
    await tasksService.createTask({
      title,
      description,
    })
    return reply.status(201).send({ title, description })
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Internal Server Error' })
  }
}
