import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Injectable()
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loginData:any;
  passNotCurrect:any;
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private data: DataService
  ) {}

  // login(user: User) {
  //   if (user.phone !== '' && user.password !== '' ) {
  //     this.data.getUserLogin(user.phone,user.password).subscribe(res=>{
  //       this.loginData = res;
  //       // localStorage.setItem('phone', this.loginData.data[0].mobile)
  //       // localStorage.setItem('id', this.loginData.data[0].id)  
  //       this.loggedIn.next(true);
  //       this.router.navigate(['/dashboard']);
  //     },
  //     err=>{
  //       alert("Invalid login credentials.");
  //     })
  //   }
  // }

  // otplogin(user: User) {
  //   if (user.otp !== '') {
  //     this.data.verifyOtp(user.otp).subscribe(res=>{
  //       this.loginData = res;
  //       // localStorage.setItem('phone', this.loginData.data[0].mobile)
  //       // localStorage.setItem('id', this.loginData.data[0].id)
  //       this.loggedIn.next(true);
  //       // this.router.navigate(['/dashboard']);
  //     },
  //     err=>{
  //       alert('Please enter a valid OTP');
  //       return;
  //     })
  //   }
  // }


  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}