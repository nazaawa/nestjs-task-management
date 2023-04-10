import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-fiter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService) {}
    
    @Get()
    getTasks(
        @Query() filterDto: GetTaskFilterDto
    ): Task[] {

        if(Object.keys(filterDto).length){
            
        }else {
            return this.tasksService.getAllTask();

        }

    }
    @Get("/:id")
    getTaskById(@Param('id') id: string): Task {
      
     return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto:CreateTaskDto ):Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete("/:id")
    deleteTask(@Param("id") id : string) : void  {
        return this.tasksService.deletTask(id);
    }
    @Patch("/:id")
    updateTask(@Param("id") id: string, @Body("status") status: TaskStatus)  {
        console.log(status);
        console.log(id);
    return this.tasksService.updateTask(id, status);
    }
} 
