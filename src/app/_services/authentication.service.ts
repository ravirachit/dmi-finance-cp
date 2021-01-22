import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    // baseurl = "https://dmi.vistaconnect.com/dmi-clubbed-backend/api/"

  // production Url
    baseurl = "https://los.dmifinance.in/los/api/"

    loginWithPassword(phone: string, password: string,accesstoken:string,url:string) {
        return this.http.post<any>(this.baseurl+'logincp',{ phone, password , accesstoken, url })
            .pipe(map(user => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user))
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    verifyOtp(otp: string) {
        return this.http.get<any>(this.baseurl + 'verifyotpcp/' + otp)
            .pipe(map(user => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user + localStorage.getItem('dmi_token')))
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        localStorage.clear();
        this.currentUserSubject.next(null);
    }
}