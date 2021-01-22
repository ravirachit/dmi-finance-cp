import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-dues',
  templateUrl: './my-dues.component.html',
  styleUrls: ['./my-dues.component.scss']
})
export class MyDuesComponent implements OnInit {
  userBasicInfo:any;
  duesDetails: any;
userName1:any
  constructor() { }

  ngOnInit() {
    this.userName1 = localStorage.getItem('user_basic_name')
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
    this.duesDetails = JSON.parse(localStorage.getItem('specific_loan_detail')) || [];
  }

}
