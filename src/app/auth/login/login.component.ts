import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = ''
  password: string = ''

  constructor (private authService: AuthService ) {}

  ngOnInit(): void {}

  onSubmit(formValue: Login ) {

    this.authService.login(formValue.email, formValue.password)
  }


}
