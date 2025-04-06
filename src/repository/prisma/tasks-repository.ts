import { Task } from '@prisma/client'

export interface TasksRepository {
  getTasks: () => Promise<Task[]>
}
