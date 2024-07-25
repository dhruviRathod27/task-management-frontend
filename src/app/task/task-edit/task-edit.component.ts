import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../shared/service';
import { ITask } from '../shared/interface';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent {
  editTaskForm: FormGroup;
  task :any;
  constructor(private fb: FormBuilder,private taskService: TaskService, private router: Router,
    private route: ActivatedRoute,
  ) {
    this.editTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: [false]
    });
  }
  ngOnInit(): void {
    const taskId = this.route.snapshot.params['id'];
    this.taskService.getTaskById(taskId).subscribe({
      next : (result : any)=>{
      this.task=result.data[0];
      if (this.task) {
        this.editTaskForm.patchValue(this.task);
      }
    },
    error: error=> Notify.failure(error.message)
    });
  }
  onSubmit() {
    if (this.editTaskForm.valid && this.task) {
      const updatedTask = { ...this.task, ...this.editTaskForm.value };
      this.taskService.updateTask(updatedTask).subscribe({
        next : result=>{
        if(result && result.data){
          Notify.success(result.message);
        }
      },
      error : error=>Notify.failure(error.message)
    });
      this.router.navigate(['/tasks']);
    }
  }
}
