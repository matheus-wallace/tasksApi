import { FastifyReply, FastifyRequest } from 'fastify'
import makeTasksService from '../../services/factories/make-tasks-service'
import { z } from 'zod'

interface UpdateTaskRequestParams {
  id: string
}

export async function deleteTask(
  request: FastifyRequest<{ Params: UpdateTaskRequestParams }>,
  reply: FastifyReply,
) {
  const deleteTaskParamsSchema = z.object({
    id: z.string().uuid({ message: 'ID deve ser um UUID válido' }),
  })
  try {
    const { id } = deleteTaskParamsSchema.parse(request.params)
    const tasksService = makeTasksService()
    const deleteTask = await tasksService.deleteTask(id)
    if (!deleteTask) {
      return reply.status(404).send({ error: 'task not found' })
    }
    return reply.status(204).send()
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Internal Server Error' })
  }
}
