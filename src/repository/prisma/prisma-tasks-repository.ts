import { Prisma } from '@prisma/client'
import { TasksRepository } from './tasks-repository'
import { prisma } from '@/lib/primsa'
import { UpdateTaskParams } from '@/http/services/task/tasksService'

export class PrismaTasksRepository implements TasksRepository {
  async updateTask(id: string, data: UpdateTaskParams) {
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
      },
    })

    return task
  }

  async deleteTask(id: string): Promise<boolean> {
    await prisma.task.delete({
      where: {
        id,
      },
    })
    return true
  }

  async findTask(id: string): Promise<boolean> {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    })

    return !!task
  }

  async createTask(data: Prisma.TaskCreateInput) {
    const task = await prisma.task.create({
      data,
    })
    return task
  }

  async getTasks() {
    const tasks = await prisma.task.findMany()
    return tasks
  }
}
