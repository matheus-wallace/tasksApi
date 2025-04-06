import { TasksRepository } from '@/repository/prisma/tasks-repository'
import { Task } from '@prisma/client'

interface GetTasksResponse {
  tasks: Task[]
}

export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(): Promise<GetTasksResponse> {
    const tasks = await this.tasksRepository.getTasks()
    return { tasks }
  }

  getAllTasks = async (): Promise<GetTasksResponse> => {
    const tasks = await this.tasksRepository.getTasks()
    return { tasks }
  }
}
