import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-noc',
  templateUrl: './noc.component.html',
  styleUrls: ['./noc.component.scss']
})
export class NocComponent implements OnInit {
  userActivity;
  userInactive: Subject<any> = new Subject();
  userBasicInfo: any;
  speceficLoanDetail: any;
  noc_letter_pdf: SafeResourceUrl;
  welcomedoc1: any;
  createdWelcomeLetter: any;
  welcomeLetterUrl: any;
  userName: any;
  loanAccountNo: any;
  phone: any;
  address: any;
  opp_Acc_Name: any;
  loanDetail: any;
  amount: any;
  Opp_Name: any;
  noc_letter_data: any;
  noc_letter: any;
  a: any;
  userName1:any;
  channelName:any='';
  channelPartnerName:any='';

  constructor(public sanitizer: DomSanitizer,
    private router: Router,
    private data: DataService) { 
      this.setTimeout();
      this.userInactive.subscribe(()=>{
        localStorage.clear();
        this.router.navigate(['customerportal&currentuser&sessiontimeout'])
      });
    }
    setTimeout() {
      this.userActivity = setTimeout(() => this.userInactive.next(undefined), 900000);
    }
  
    @HostListener('window:mousemove') refreshUserState() {
      clearTimeout(this.userActivity);
      this.setTimeout();
    }

  ngOnInit() {
    this.userName1 = localStorage.getItem('user_basic_name')
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
    this.userName = this.userBasicInfo.data[0].Name
    this.phone = this.userBasicInfo.data[0].MobilePhone
    this.address = this.userBasicInfo.data[0].MailingStreet + ', ' + this.userBasicInfo.data[0].MailingCity + ', ' + this.userBasicInfo.data[0].MailingState + ', ' + this.userBasicInfo.data[0].MailingPostalCode + ', ' + this.userBasicInfo.data[0].MailingCountry;
    this.loanAccountNo = "52456312123"

    this.loanDetail = JSON.parse(localStorage.getItem('specific_loan_detail'));
    this.amount = this.loanDetail[0].Sanction_Amount__c;
    this.Opp_Name = this.loanDetail[0].name;

    this.data.getChannelPartner(localStorage.getItem('dmi_phone')).subscribe(res=>{
      this.channelName=res;
      this.channelPartnerName=this.channelName.data;
    });
    // Start event tracking
    let eventName = 'NOC Document Page';
    let phone = localStorage.getItem('dmi_phone');
    let campign_number = this.Opp_Name;
    let source = 'DMI-Customer-Portal';
    if(this.channelName!=''){
      this.data.getEventName(phone, eventName, campign_number, source,this.loanDetail[0].Pulled_Lead_Source_Name__c).subscribe(res => {
      });
    }
    // end

    this.data.createNocLetter(this.userName, this.address, this.Opp_Name, this.amount).subscribe(res => {
      this.noc_letter_data = res;
      let nocLetter = this.noc_letter_data.data.status;
      this.noc_letter = nocLetter.slice(27);
      let final_nocLetter = this.noc_letter.split(';')[0]
      this.noc_letter_pdf = this.sanitizer.bypassSecurityTrustResourceUrl(final_nocLetter);

      let eventName = 'NOC Document Created';
      let phone = localStorage.getItem('dmi_phone');
      let campign_number = this.Opp_Name;
      let source = 'DMI-Customer-Portal';
      this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
      if(this.channelName!=''){
        this.data.getEventName(phone, eventName, campign_number, source,this.loanDetail[0].Pulled_Lead_Source_Name__c).subscribe(res => {
        });
      }
    })

  }

  ngOnDestroy(){ 
    clearTimeout(this.userActivity);
  }
}
