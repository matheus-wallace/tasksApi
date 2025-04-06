import { PrismaTasksRepository } from '@/repository/prisma/prisma-tasks-repository'
import { TasksService } from '../task/tasksService'

export default function makeTasksService() {
  const prismaTaskRepository = new PrismaTasksRepository()
  const taskService = new TasksService(prismaTaskRepository)
  return taskService
}
