import { TasksRepository } from './tasks-repository'
import { prisma } from '@/lib/primsa'

export class PrismaTasksRepository implements TasksRepository {
  async getTasks() {
    const tasks = await prisma.task.findMany()
    return tasks
  }
}
