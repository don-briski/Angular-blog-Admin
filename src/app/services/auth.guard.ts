import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate  {

  
  
    constructor( private authService: AuthService, private router: Router, 
      private Afauth: AngularFireAuth, private toastr: ToastrService ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.authService.isLoggedInGuard) {
      console.log("access granted ...");
      return true;
    } else {
      this.toastr.warning('unauthorized user')
     this.router.navigate(['/login']);
      return false;
    }
    
  }
    
  
};
