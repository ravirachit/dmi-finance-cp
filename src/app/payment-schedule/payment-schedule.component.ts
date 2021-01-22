
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-payment-schedule',
  templateUrl: './payment-schedule.component.html',
  styleUrls: ['./payment-schedule.component.scss']
})
export class PaymentScheduleComponent implements OnInit {
  speceficLoanDetail: any;
  loanName: any;
  paymentSchedule: any;
  userBasicInfo: any;
  scheduledata: any;
  loanNumber: any;

  constructor(private router: Router,
    private data: DataService, ) { }

  ngOnInit() {

    // this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
    // this.speceficLoanDetail = JSON.parse(localStorage.getItem('specific_loan_detail')) || [];
    // this.loanName = this.speceficLoanDetail[0].name;
    // this
    //   .data
    //   .getPaymentSchedule(localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'), this.loanName).subscribe(
    //     data => {
    //       this.paymentSchedule = data
    //       this.scheduledata = this.paymentSchedule.data;

    //     },
    //     err => { this.paymentSchedule = [] }
    //   );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }


}
