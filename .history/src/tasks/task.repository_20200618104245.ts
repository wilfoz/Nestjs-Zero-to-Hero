import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatus } from './tasks-status.enum';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    const { status, search } = filterDTO;
    const query = this.createQueryBuilder('task');

    if (status) {
        query.andWhere('task.status = :status', { status })
    }

    if (search) {
       query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTasks(
    createTaskDTO: CreateTaskDTO,
    user: User,
  ): Promise<Task> {
    const { title, description } = createTaskDTO;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();

    delete task.user;
    return task;
  }
}