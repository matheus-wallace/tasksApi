import { FastifyReply, FastifyRequest } from 'fastify'
import makeTasksService from '../../services/factories/make-tasks-service'
import { z } from 'zod'

interface UpdateTaskRequestParams {
  id: string
}

export async function updateTask(
  request: FastifyRequest<{ Params: UpdateTaskRequestParams }>,
  reply: FastifyReply,
) {
  const updateTaskBodySchema = z
    .object({
      title: z.string().min(1).max(100).optional(),
      description: z.string().min(1).max(100).optional(),
    })
    .refine((data) => data.title || data.description, {
      message: 'At least one field (title or description) must be provided',
      path: ['title', 'descrption'],
    })

  const { id } = request.params

  const { ...data } = updateTaskBodySchema.parse(request.body)
  try {
    const tasksService = makeTasksService()
    const tasks = await tasksService.updateTask(id, data)
    return reply.status(200).send({ tasks })
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Internal Server Error' })
  }
}
