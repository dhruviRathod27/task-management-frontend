import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../shared/service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})

export class TaskCreateComponent implements OnInit {
  createTaskForm: FormGroup;

  constructor(private fb: FormBuilder,private taskService: TaskService, private router: Router) {
    this.createTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: [false]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.createTaskForm.valid) {
      this.taskService.addTask(this.createTaskForm.value).subscribe({
        next :result=>{
        if(result && result.data){
          Notify.success(result.message)
        }
      },
    error: error=>{
      Notify.failure(error.message);
    }});
      this.createTaskForm.reset();
      this.router.navigate([`/tasks`])
      
    }
  }
}