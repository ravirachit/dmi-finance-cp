import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experian-history',
  templateUrl: './experian-history.component.html',
  styleUrls: ['./experian-history.component.scss']
})
export class ExperianHistoryComponent implements OnInit {
creditScoreData:any = [];
getCreditScore:any;
isDisabled:boolean;

  constructor(private data:DataService, private router:Router) { }

  ngOnInit() {
    this.creditScoreData = JSON.parse(localStorage.getItem('Credit_Score_Data')) || [];
  }
  viewMoreCreditScore(multibureauId){
    this.isDisabled = true;
    this.eventTracking('View More Credit Score')
    this.data.getExperianDataByMBID(multibureauId).subscribe(res=>{
      this.getCreditScore = res;
      this.isDisabled = false;
      this.eventTracking('Get-Experian-Data-Success'); 
      if(this.getCreditScore.data.SCORE !== null){
        let jsonResponse = {score: this.getCreditScore.data.SCORE.BureauScore,account: this.getCreditScore.data.ACCOUNT.CAIS_Summary.Credit_Account}
        sessionStorage.setItem('CRValue',JSON.stringify(jsonResponse));
        this.router.navigate(["/creditScore"]);
      }else{
        Swal.fire({
          title: 'Alert',
          text: 'No More Record found!',
          type: 'warning',
          confirmButtonText: 'OK'
        });
        }  
    });
  }
  eventTracking(eventName){
    let phone = localStorage.getItem('dmi_phone');
    let campign_number = localStorage.getItem('single_loan_name');
    this.data.getEventName(phone, eventName,campign_number, 'DMI-Customer-Portal',sessionStorage.getItem('company_Name')).subscribe();
  }

}
