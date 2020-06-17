import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaksStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDTO): Task[]  {
    //     if (Object.keys(filterDTO).length) {
    //         return this.tasksService.getTasksWithFilters(filterDTO);
    //     } else {
    //         return this.tasksService.getTasks();
    //     }
    // }

    // @Get('/:id')
    // getTaksById(@Param('id') id: string): Task {
    //     return this.tasksService.getTaskById(id)
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(
    //     @Body() createTaskDTO: CreateTaskDTO): Task {
    //     return this.tasksService.createTasks(createTaskDTO)
    // }

    // @Delete()
    // deleteTask(@Param('id') id: string): void {
    //     this.tasksService.deleteTask(id)
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id: string,
    //     @Body('status', TaksStatusValidationPipe) status: TaskStatus
    // ): Task {
    //     return this.tasksService.updateTaks(id, status);
    // }

}
