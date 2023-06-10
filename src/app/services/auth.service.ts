import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false) 
  isLoggedInGuard: boolean = false
  


  constructor(private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router ) { }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((logRef) => {

      this.toastr.success('Logged in successful...!')
      this.router.navigate(['/'])
      this.loggedIn.next(true)
      this.isLoggedInGuard = true
      this.loadUser()
        }).catch((e) => {
          this.toastr.warning('unauthorized user',  )
        })
      }


      loadUser() {
        return this.afAuth.authState.subscribe( user => {
         localStorage.setItem('user', JSON.stringify(user))
        })
      }

      logout() {
        return this.afAuth.signOut().then(() => {
          localStorage.removeItem('user')
          this.loggedIn.next(false)
          this.isLoggedInGuard = false
          this.router.navigate(['/login'])
          this.toastr.success('Logged out successful...!')
        })
      }

      isLoggedIn() {
        return this.loggedIn.asObservable();
      }
}
