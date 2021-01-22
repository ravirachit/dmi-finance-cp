import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-raise-dispute',
  templateUrl: './raise-dispute.component.html',
  styleUrls: ['./raise-dispute.component.scss']
})
export class RaiseDisputeComponent implements OnInit {
  userBasicInfo: any;
  speceficLoanDetail: any;
  complain: false
  selectedValue: any;
  expanded: boolean = false;
  status: boolean = false;
  status2: boolean = false;
  selectedComplain: string = '';
  ComplainTypes: string = '';
  RequestTypes: string = '';
  OtherTypes: string = '';
  faqs: any;
  ticketData: any;
  tktResData: any;
  loanAccount: string;
  statusData: string = 'Open';
  origin: string = 'facebook';
  priority: string = 'Medium';
  division: string = 'Retail';
  subject: string;
  description: string;
  ticketType: string = '';
  ticketSubType: string = '';
  contact_info: string;
  userPhone:any;
  attachment:any;
  loanId:any;
  loanDetail:any;
  loanNane:any;
  originValue = [{name: 'Phone'},
    {name: 'Facebook'},
    {name: 'Twitter'},
    {name: 'Email-Retail Customer Care'},
    {name: 'Email-Retail Grievance'},
    {name: 'Survey'},
    {name: 'Chat Bot'
  }]
  uploadtktimage:any;
  tktimgset:any;
  imagePath:any;
  channelName:any='';
  channelPartnerName:any='';

  constructor(private router: Router, private data: DataService,public domSanatize: DomSanitizer) { }

  ngOnInit() {
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
    this.userPhone = this.userBasicInfo.data[0].MobilePhone
    this.contact_info = 'Existing Contact'
    // this.contact_info = this.userBasicInfo.data[0].MailingCity + ', ' + this.userBasicInfo.data[0].MailingCountry + ', ' +
    // this.userBasicInfo.data[0].MailingPostalCode + ', ' + this.userBasicInfo.data[0].MailingState + ', ' + this.userBasicInfo.data[0].MailingStreet
    this.speceficLoanDetail = JSON.parse(localStorage.getItem('specific_loan_detail')) || [];
    this.loanAccount = this.speceficLoanDetail[0].name;
     this.loanId = this.speceficLoanDetail[0].Id;
    this.data.getFAQ().subscribe(res => {
      this.faqs = res;
    })
    this.data.getChannelPartner(localStorage.getItem('dmi_phone')).subscribe(res=>{
      this.channelName=res;
      this.channelPartnerName=this.channelName.data;
    });
    // Start event tracking
    let eventName = 'Service Request Page'
    let phone = localStorage.getItem('dmi_phone')
    let campign_number = this.loanAccount;
    let source = 'DMI-Customer-Portal'
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    if(this.channelName!=''){
      this.data.getEventName(phone, eventName, campign_number, source,this.speceficLoanDetail[0].Pulled_Lead_Source_Name__c).subscribe(res => {
      })
    }

    // end
  }

  getProfilePic(evt) {
    if (evt.target.files[0]['type'].includes('image')) {
      this.uploadtktimage = evt.target.files[0].name
      this.tktimgset = false;
      this.getBase64(evt.target.files[0], (base64Data) => {
        this.tktimgset = true;
        this.imagePath = base64Data;
        
      })
    } 
  }

  createTicket() {
    // Start event tracking
    let eventName = 'Send Ticket Request'
    let phone = localStorage.getItem('dmi_phone')
    let campign_number = this.loanAccount;
    let source = 'DMI-Customer-Portal'
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    if(this.channelName!=''){
      this.data.getEventName(phone, eventName, campign_number, source,this.speceficLoanDetail[0].Pulled_Lead_Source_Name__c).subscribe(res => {
      })
    }
    // end
    // this.ticketData = {
    //   Status: this.statusData,
    //   Origin: this.origin,
    //   Type: this.ticketType,
    //   Sub_Type_c: this.ticketSubType,
    //   Priority: this.priority,
    //   Associated_Loan_c: this.loanId,
    //   Contact_Info_c: this.contact_info,
    //   subject: this.subject,
    //   Description: this.description,
    //   Division_c: this.division,
    //   accesstoken: localStorage.getItem('dmi_token'),
    //   url: localStorage.getItem('dmi_instance_url'),
    //   phone: this.userPhone,
    // }
    // this.data.createTicketReq(this.statusData,this.origin,this.ticketType,this.ticketSubType,this.priority,this.loanId,this.contact_info,this.subject,this.description,this.division,localStorage.getItem('dmi_token'),localStorage.getItem('dmi_instance_url'),this.userPhone, this.imagePath).subscribe(res => {
    //   this.tktResData = res;
    //   alert('Your request has been received successfully.' +'\n'+ 'Your Ticket Id is:' +'  '+ this.tktResData.data.id)
    // })
  }


  ComplainSelect(event: any) {
    this.selectedComplain = event.target.value;
  }
  ComplainType(event: any) {
    this.ComplainTypes = event.target.value;
  }
  RequestType(event: any) {
    this.RequestTypes = event.target.value;
  }
  OtherType(event: any) {
    this.OtherTypes = event.target.value;
  }

  getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  }

}



// dl application no: 2452873219	
