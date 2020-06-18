import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaksStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

     @Get()
     getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDTO): Promise<Task[]> {
        return this.tasksService.getTasks(filterDTO);
     }

    @Get('/:id')
    getTaksById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

     @Post()
     @UsePipes(ValidationPipe)
     createTask(
         @Body() createTaskDTO: CreateTaskDTO,
         @GetUser() user: User
        ): Promise<Task> {
         return this.tasksService.createTasks(createTaskDTO, user)
     }

     @Delete('/:id')
     deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return  this.tasksService.deleteTask(id)
     }

     @Patch('/:id/status')
     updateTaskStatus(
         @Param('id', ParseIntPipe) id: number,
         @Body('status', TaksStatusValidationPipe) status: TaskStatus
     ): Promise<Task> {
         return this.tasksService.updateTaks(id, status);
     }

}
