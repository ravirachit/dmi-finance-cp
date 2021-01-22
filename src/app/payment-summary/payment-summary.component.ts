import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import {ShareDataService} from '../share-data.service'
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})
export class PaymentSummaryComponent implements OnInit {
  userActivity;
  userInactive: Subject<any> = new Subject();
  speceficLoanDetail: any;
  loanName: any;
  paymentSchedule: any;
  userBasicInfo: any;
  scheduledata: any;
  loanNumber: any;
  paymentStatus: any;
  statusData: string = 'Open';
  origin: string = 'facebook';
  priority: string = 'Medium';
  division: string = 'Retail';
  ticketType: string = 'Complaint';
  ticketSubType: string = 'EMI Related Complaint';
  tktResData:any;
  loanId:any;
  contact_info:any;
  subject:string = 'Statement of account generation';
  remarks:string = '';
  userPhone:any;
  imagePath:string = '';
  opp_id:any;
  opp_name:any;
  response : any = [];
  responseofList : any;
  code:any;
  pdf : boolean = false;
  btnstatus : any = 'Download  Statement';
  userName1:any;
  loanDetail:any='';
  downloadStatementDisable:boolean =  false

  constructor(private data: DataService, private router: Router,private service : ShareDataService,private http: HttpClient) { 
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
    this.opp_id = this.service.getLoanId();
    this.opp_name = this.service.getLoanName();
    // this.opp_id = '0062v00001ABRFjAAP';
    // this.opp_name = 'DMI0001681646';
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
    this.userPhone = this.userBasicInfo.data[0].MobilePhone;
    this.speceficLoanDetail = JSON.parse(localStorage.getItem('specific_loan_detail')) || [];
    this.loanName = this.speceficLoanDetail[0].name;
    this.loanId = this.speceficLoanDetail[0].Id;
    // Start event tracking
    let eventName = 'Payment Summary Page'
    let phone = localStorage.getItem('dmi_phone')
    let campign_number = this.loanName;
    let source = 'DMI-Customer-Portal'
    this.contact_info = 'Existing Contact'
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    this.data.getEventName(phone, eventName, campign_number, source,this.speceficLoanDetail[0].Pulled_Lead_Source_Name__c).subscribe(res => {
    })
    // end
    this
      .data
      .getPaymentSchedule(localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'), this.loanName).subscribe(
        data => {
          this.paymentSchedule = data
          this.scheduledata = this.paymentSchedule.data;
          // let givenDate = this.scheduledata[0].Date__c
          // let current_date = new Date();
          // givenDate = new Date(givenDate)
          // if(givenDate > current_date){
          //   alert('given date is grater than current date');
          //   this.paymentStatus = 'undefined';
          //   this.isUndefined = false;
          // }else{
          //   alert('given date is less than current date');
          // }

        },
        err => { this.paymentSchedule = [] }
      );

  }

  downloadStatement() {
    this.downloadStatementDisable = true
    // Start event tracking
    let eventName = 'Download Statement'
    let phone = localStorage.getItem('dmi_phone')
    let campign_number = this.loanName;
    let source = 'DMI-Customer-Portal'
    this.btnstatus = 'Please Wait...';
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    this.data.getEventName(phone, eventName, campign_number, source,this.speceficLoanDetail[0].Pulled_Lead_Source_Name__c).subscribe(res => {
    });

    this.data.downloadStatement(this.opp_id,this.opp_name).subscribe(res=>
    {
      this.downloadStatementDisable = false
      this.responseofList  = res;
      this.code=this.responseofList.data.error;
      this.response = this.responseofList.data.result.pdf_url;
      if(res){this.btnstatus='Download  Statement'};

      // if(this.responseofList.data.result.pdf_url)
      // {

      // }
      if(this.response!='')
      {
        window.open(this.response);
      }


      //  if(this.code!='200'){
      //   this.data.createTicketReq(this.statusData,this.origin,this.ticketType,this.ticketSubType,this.priority,this.loanId,this.contact_info,this.subject,this.remarks,this.division,localStorage.getItem('dmi_token'),localStorage.getItem('dmi_instance_url'),this.userPhone,this.imagePath).subscribe(res => {
      //     this.tktResData = res;
      //     alert('Your request has been received successfully.' +'\n'+ 'Your Ticket Id is:' +'  '+ this.tktResData.data.id)
      //   })
      //  }
    });

   

    // end



    // window.open(
    //   'https://dmi-qw-cp-soa.s3.ap-south-1.amazonaws.com/SoA/DMI0002711010/SoA_DMI0002711010_101615072019.pdf',
    //   '_blank'
    // );
  }

  ngOnDestroy(){ 
    clearTimeout(this.userActivity);
  }

}
