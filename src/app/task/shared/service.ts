import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask, NetworkResponse } from './interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private httpClient: HttpClient, private authService: AuthService) { }


  getTasks() {
    const userId = this.authService.loggedInUserId();
    return this.httpClient.get<NetworkResponse<Array<any>>>(`/task/table?userId=${userId}`)
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
      'Accept': '*/*',
    });
    const options = {
      headers
    };
    const userId = this.authService.loggedInUserId();
    if (userId) {
      task.userId = userId
    }
    return this.httpClient.post<NetworkResponse<any>>(`/task`, task, options)
  }

  getTaskById(id: any) {
    return this.httpClient.get(`/task/${id}`);
  }

  updateTask(updatedTask: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*',
    });
    const options = {
      headers
    };
    const userId = this.authService.loggedInUserId();
    if (userId) {
      updatedTask.userId = userId
    }
    return this.httpClient.put<NetworkResponse<any>>(`/task/${updatedTask._id}`, updatedTask, options);
  }

  deleteTask(id: any) {
    return this.httpClient.delete<NetworkResponse<any>>(`/task/${id}`)
  }
}
