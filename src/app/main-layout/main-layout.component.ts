import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  userBasicInfo: any;
  loanDetails: any;
  SpecificLoanDetail: any;
  selectedId: string;
  isLoading:boolean;
  userName1:any

  constructor(
    private data: DataService,
    private http: HttpClient,
    location: Location,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userName1 = localStorage.getItem('user_basic_name')
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
    this.loanDetails = JSON.parse(localStorage.getItem('loan_details')) || [];
  }

  selectValue(loan) {
    this.selectedId = loan.Id;
    this.isLoading = true;
    this
      .data
      .getSpecificLoan(localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'), this.selectedId).subscribe(
        data => {
          this.SpecificLoanDetail = data
          localStorage.setItem('specific_loan_detail', JSON.stringify(this.SpecificLoanDetail.data));
          this.router.navigate(['/loanDetail']);
          this.isLoading = false;
          if (this.router.url === '/loanDetail') {
            this.isLoading = true;
            window.location.reload();
            this.isLoading = false;
          }
        },
        err => { this.SpecificLoanDetail = [] }
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }
}
