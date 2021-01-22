import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-loan-statement',
  templateUrl: './loan-statement.component.html',
  styleUrls: ['./loan-statement.component.scss']
})
export class LoanStatementComponent implements OnInit {
  
  userBasicInfo: any;
  speceficLoanDetail: any;
  loanName: any;
  accStatement: any;
  Statementdata: any;
  headerStatementdata: any;
  headerPaymentData: any;
  constructor(private router: Router,
    private data: DataService, ) { }

  ngOnInit() {

    // get data from localStorage
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
    this.speceficLoanDetail = JSON.parse(localStorage.getItem('specific_loan_detail')) || [];
    this.loanName = this.speceficLoanDetail[0].name;
    this
      .data
      .getStatement(localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'), this.loanName).subscribe(
        data => {
          this.accStatement = data
          this.Statementdata = this.accStatement.data;
          this.headerStatementdata = this.Statementdata.header_details[0]
          this.headerPaymentData = this.Statementdata.payment_schedule
          
        },
        err => { this.accStatement = [] }
      );
  }

  

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }

}
