import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.username, this.password)
      .subscribe({
        next :(result: any) => {
        if (result && result.data) {
          Notify.success(result.message);
          console.log('User registered successfully');
          this.router.navigate(['/login']);
        }
      }, 
      error : error => {
        Notify.failure(error.message);
      }});
  }
  enableRegisterBtn() {
    if (this.username != '' && this.password != '') {
      return true;
    }
    return true;
  }
}
