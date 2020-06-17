import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuidv1 } from 'uuid'
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    // getTasks(): Task[]  {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
    //     const { status, search } = filterDTO;
    //     let tasks = this.getTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search) ||
    //             task.description.includes(search)
    //         )
    //     }

    //     return tasks;
    // }

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find(task => task.id === id);

    //     if (!found) {
    //         throw new NotFoundException(`Task with ID ${id} not found`);
    //     }

    //     return found;
    // }

    // createTasks(createTaskDTO: CreateTaskDTO): Task {
    //     const { title, description } = createTaskDTO;

    //     const task: Task = {
    //         id: uuidv1(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     }

    //     this.tasks.push(task)
    //     return task;
    // }

    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id);
    // }

    // updateTaks(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task
    // }

}
