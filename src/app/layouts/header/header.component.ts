import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userEmail: string = ''
  isLoggedIn$: Observable<boolean> = new Observable<boolean>

  constructor (private authService: AuthService ) {}

  ngOnInit(): void {

   // this.userEmail = JSON.parse( localStorage.getItem('user')).email  

  
    const user = localStorage.getItem('user');

  
    if (user) {
      try {
        this.userEmail = JSON.parse(user).email;
        //this.userEmail = userData.email;
        // console.log(this.userEmail);
      } catch (error) {
        console.log('Error parsing user data from localStorage:', error);
      }
    } 

   this.isLoggedIn$ =  this.authService.isLoggedIn()

  } 


  onLogOut() {
    
    this.authService.logout()
  }

  
}
