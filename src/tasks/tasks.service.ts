import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uud } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-fiter.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTask(): Task[] {
    return this.tasks;
  }
  getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
    const { search, status } = filterDto;
    // define a temporary array to hold the filtered tasks
    let tasks = this.getAllTask();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks.filter((task) => {
        return task.title.includes(search) || task.description.includes(search);
      });
    }
    return tasks;
  }
  getTaskById(taskId: string): Task {
    const found = 
     this.tasks.find((task) => task.id === taskId);

     if (!found) {
      throw new NotFoundException(`Task with ID "${taskId}" not found`);
     }
     return found;
  }
  
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uud(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deletTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
  updateTask(taskId: string, status: TaskStatus): Task {
    const task = this.getTaskById(taskId);
    task.status = status;
    return task;
  }
}
