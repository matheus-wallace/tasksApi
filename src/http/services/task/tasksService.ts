import { TasksRepository } from '@/repository/prisma/tasks-repository'
import { Task } from '@prisma/client'

interface TaskServiceParams {
  title: string
  description: string
}

export interface UpdateTaskParams {
  title?: string
  description?: string
}

interface GetTasksResponse {
  tasks: Task[]
}

interface createTasksResponse {
  task: Task
}

export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async createTask({
    title,
    description,
  }: TaskServiceParams): Promise<createTasksResponse> {
    const task = await this.tasksRepository.createTask({ title, description })
    return { task }
  }

  getAllTasks = async (): Promise<GetTasksResponse> => {
    const tasks = await this.tasksRepository.getTasks()
    return { tasks }
  }

  updateTask = async (id: string, data: UpdateTaskParams): Promise<Task> => {
    const task = await this.tasksRepository.updateTask(id, data)
    return task
  }

  deleteTask = async (id: string): Promise<boolean> => {
    const taskIsOnDatabase = await this.tasksRepository.findTask(id)

    if (!taskIsOnDatabase) {
      return false
    }

    const deletetTask = await this.tasksRepository.deleteTask(id)
    return deletetTask
  }
}
