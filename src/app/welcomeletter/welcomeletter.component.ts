
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-welcomeletter',
  templateUrl: './welcomeletter.component.html',
  styleUrls: ['./welcomeletter.component.scss']
})
export class WelcomeletterComponent implements OnInit {
  // src = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  welcomeLetter: any;
  welcomedoc: any;
  welcomedoc1: any;
  welcomeLetterPdf: SafeResourceUrl;
  userBasicInfo: any;
  speceficLoanDetail: any;
  createdWelcomeLetter: any;
  welcomeLetterUrl: any;
  userName:any;
  loanAccountNo:any;
  phone:any;
  address:any;

  loanid:any;
  access_token:any;
  url:any;
  ispdf:boolean = false;
  fileUrl:any;
  ab:any;
  userName1:any;
  loanDetail:any='';

  constructor(public sanitizer: DomSanitizer,
    private router: Router,
    private data: DataService,
  ) { }


  ngOnInit() {
    this.userName1 = localStorage.getItem('user_basic_name')
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
    let userEmail = this.userBasicInfo.data[0].Email
    this.userName = this.userBasicInfo.data[0].Name  
    this.phone = this.userBasicInfo.data[0].MobilePhone
    this.address = this.userBasicInfo.data[0].MailingStreet + ', ' + this.userBasicInfo.data[0].MailingCity + ', ' + this.userBasicInfo.data[0].MailingState + ', ' + this.userBasicInfo.data[0].MailingPostalCode + ', ' + this.userBasicInfo.data[0].MailingCountry ;
    this.loanAccountNo = "52456312123"
    // Start event tracking
    let eventName = 'Welcome Letter'
    let phone = localStorage.getItem('dmi_phone')
    let campign_number = localStorage.getItem('single_loan_name');
    let source = 'DMI-Customer-Portal'
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    this.data.getEventName(phone, eventName, campign_number, source,sessionStorage.getItem('company_Name')).subscribe(res => { })
    // end
    // this
    //   .data
    //   .getWelcomeLetter(localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'), localStorage.getItem('specefic_loan_id')).subscribe(
    //     data => {
    //       this.welcomeLetter = data
    //       this.welcomedoc = this.welcomeLetter.data.records[0].Welcome_Letter_Url__c;
    //       this.welcomeLetterUrl = this.welcomeLetter.data.records[0].Welcome_Letter_Url__c;
    //       if(this.welcomeLetterUrl !== null){
    //         this.ispdf = true
    //       }
    //       this.welcomeLetterPdf = this.sanitizer.bypassSecurityTrustResourceUrl(this.welcomedoc);
    //       this.loanid = localStorage.getItem('specefic_loan_id');
    //       this.access_token = localStorage.getItem('dmi_token');
    //       this.url = localStorage.getItem('dmi_instance_url');
          
    //       this.data.createWelComeLetter(localStorage.getItem('single_loan_name'),userEmail,this.access_token,this.url,this.loanid).subscribe(res => {
    //           this.createdWelcomeLetter = res;
    //           this.welcomeLetterPdf = this.sanitizer.bypassSecurityTrustResourceUrl(this.createdWelcomeLetter.data);
    //           this.ab = this.createdWelcomeLetter.data;
    //           if(this.welcomeLetterPdf !== null){
    //             this.ispdf = true
    //           }
            
    //         // localStorage.setItem('createdWelcomeLetter', JSON.stringify(this.createdWelcomeLetter.data));
    //         // this.welcomedoc1 = this.createdWelcomeLetter.FileURL
    //       })
    //     },
    //     err => { this.welcomeLetter = [] }
    //   );

    this.loanid = localStorage.getItem('specefic_loan_id');
    this.access_token = localStorage.getItem('dmi_token');
    this.url = localStorage.getItem('dmi_instance_url');
    
    this.data.createWelComeLetter(localStorage.getItem('single_loan_name'),userEmail,this.access_token,this.url,this.loanid).subscribe(res => {
      this.createdWelcomeLetter = res;
      this.welcomeLetterPdf = this.sanitizer.bypassSecurityTrustResourceUrl(this.createdWelcomeLetter.data);
      this.ab = this.createdWelcomeLetter.data;
      this.ispdf = true
      if(this.ab != null && this.ab != ''){
        
        this.data.getEventName(phone, 'Welcome Letter created.', campign_number, source,sessionStorage.getItem('company_Name')).subscribe(res => { })
      }
      else 
        {
          this.data.getEventName(phone, 'Welcome Letter Blank issue ' + campign_number, campign_number, source,sessionStorage.getItem('company_Name')).subscribe(res => { })
        }
      // localStorage.setItem('createdWelcomeLetter', JSON.stringify(this.createdWelcomeLetter.data));
      // this.welcomedoc1 = this.createdWelcomeLetter.FileURL
  },
    error => {
      this.ispdf  = true;
      this.data.getEventName(phone, 'Welcome Letter API Error issue ' + campign_number, campign_number, source,sessionStorage.getItem('company_Name')).subscribe(res => { })
    });

  }
  
}
