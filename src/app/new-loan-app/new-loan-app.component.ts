import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-loan-app',
  templateUrl: './new-loan-app.component.html',
  styleUrls: ['./new-loan-app.component.scss']
})
export class NewLoanAppComponent implements OnInit {
  userBasicInfo:any;
  userName1:any;
  constructor() { }

  ngOnInit() {
    this.userName1 = localStorage.getItem('user_basic_name')
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
  }
}
