import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ITask } from '../shared/interface';
import { TaskService } from '../shared/service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: ITask[] = [];
  filteredTasks: ITask[] = [];
  statusFilter = new FormControl('');
  priorityFilter = new FormControl('');
  displayedColumns: string[]=['title','description','dueDate','priority','status','actions'];

  constructor(private taskService: TaskService, private router : Router) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(result => {

      this.tasks = result.data;
      console.log("task list")
      console.log(this.tasks);
      this.filteredTasks = result.data;
    });
    this.statusFilter.valueChanges.subscribe(() => this.filterTasks());
    this.priorityFilter.valueChanges.subscribe(() => this.filterTasks());
  }
  viewTask(task: ITask) {
    this.router.navigate(['/task', task.id]);
  }
  deleteTask(id: any) {
    this.taskService.deleteTask(id).subscribe(result=>{
      console.log(result);
      window.location.reload();
      if(result && result.data){
        Notify.success(result.message);
      }
    });
  }
  filterTasks() {
    this.filteredTasks = this.tasks.filter(task => {
      const statusMatch = this.statusFilter.value ? task.status === this.statusFilter.value : true;
      const priorityMatch = this.priorityFilter.value ? task.priority === this.priorityFilter.value : true;
      return statusMatch && priorityMatch;
    });
  }
}
