import { UpdateTaskParams } from '@/http/services/task/tasksService'
import { Prisma, Task } from '@prisma/client'

export interface TasksRepository {
  createTask: (data: Prisma.TaskCreateInput) => Promise<Task>
  getTasks: () => Promise<Task[]>
  updateTask: (id: string, data: UpdateTaskParams) => Promise<Task>
  deleteTask: (id: string) => Promise<boolean>
}
