import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask, NetworkResponse } from './interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private httpClient: HttpClient){}


  getTasks() {
    return this.httpClient.get<NetworkResponse<Array<any>>>(`/task/table`)
  }

  // static generateQuery(options: any): string {
  //   return Object.keys(options)
  //     .filter(key => options[key] !== '')
  //     .map(key => `${key}=${options[key]}`)
  //     .join('&');
  // }

  addTask(task: Omit<ITask, 'id'>) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'*/*',
    });
    const options = {
      headers
    };
    console.log("add task", task);
    return this.httpClient.post<NetworkResponse<any>>(`/task`,task, options)
  }

  getTaskById(id: any) {
    console.log('id',id)
    console.log("resonse",this.httpClient.get(`/task/${id}`))
    return this.httpClient.get(`/task/${id}`);
  }

  updateTask(updatedTask: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'*/*',
    });
    const options = {
      headers
    };
    return this.httpClient.put<NetworkResponse<any>>(`/task/${updatedTask._id}`,updatedTask,options);
  }

  deleteTask(id: any) {
    return this.httpClient.delete<NetworkResponse<any>>(`/task/${id}`)
  }
}
