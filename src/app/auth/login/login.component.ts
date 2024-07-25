import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  private tokenKey = 'auth_token';
  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next : (response: any) => {
      if(response && response.data){
        localStorage.setItem(this.tokenKey, response.data);
        this.router.navigate(['/tasks']);
      }
    },
    error :error=>{
      if(error && error.statusCode == 400){
        Notify.failure(error.message);
      }
    }});;
  }
  enableLoginBtn(){
    if(this.username!='' && this.password != ''){
      return true;
    }
    return false;
  }
}
