import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status.enum';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) { }

     getTasks(filterDTO: GetTasksFilterDTO)  {
         //
     }

    

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }

        return found;
    }

     async createTasks(createTaskDTO: CreateTaskDTO): Promise<Task> {
         return this.taskRepository.createTasks(createTaskDTO)
     }

     async deleteTask(id: number): Promise<void> {
         const result = await this.taskRepository.delete(id); 
        
         if(result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
         }
     }

     async updateTaks(id: number, status: TaskStatus): Promise<Task> {
         const task = await this.getTaskById(id);
         task.status = status;
         task.save();

         return task
     }

}
