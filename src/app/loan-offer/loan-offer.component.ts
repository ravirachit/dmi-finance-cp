import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-loan-offer',
  templateUrl: './loan-offer.component.html',
  styleUrls: ['./loan-offer.component.scss']
})
export class LoanOfferComponent implements OnInit {
userActivity;
userInactive: Subject<any> = new Subject();
loanOffer:any;
offerAmount:any;
convertedOfferAmt:any;
userBasicInfo:any;
service:any;
trendingArr : any = [];
pageno:any;
loanName:any='DMI0002664589';
loanAmount:any='2,50,000';
bankName:any='HDFC';
accountNumber:any='83651495845';
ifsc:any='UTIB0000007';
userAddress:any;
tenor:any='60 Months';
rate:any='16%';
emiDate:any='03-Feb-2020';
emiAmount:any='8000';
blogDetailsData:any;
displayModal:any='none';
channelName:any='';
channelPartnerName:any='';
loanRestuctUrl:any='';
showLoader:boolean=true;
callbackValue:any='';

  constructor(private router: Router, private data: DataService,
    private modalService:NgbModal,private sanitizer: DomSanitizer) { 
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
    this.data.getChannelPartner(localStorage.getItem('dmi_phone')).subscribe(res=>{
      this.channelName=res;
      this.channelPartnerName=this.channelName.data;
      if(this.channelName!=''){
        // Start event tracking
        let eventName = 'Visited : Offers'
        let phone = localStorage.getItem('dmi_phone')
        let campign_number = 'null';
        let source = 'DMI-Customer-Portal';
        this.data.getEventName(phone, eventName, campign_number, source,this.channelPartnerName).subscribe(res => {
        })
        // end
      }
    });
    this.pageno = '1';
    this.data.getTrendingDataList(this.pageno).subscribe( res=>
    {
      this.trendingArr = res;
    });

    // get loan offer from localStorage
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info'));
    this.loanOffer = JSON.parse(localStorage.getItem('loan_offer')) || [];
    this.offerAmount =  this.loanOffer[0].Offered_Amount__c;
    this.convertedOfferAmt = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.offerAmount);
    this.userAddress =  this.userBasicInfo.data[0].MailingStreet + ',' + this.userBasicInfo.data[0].MailingCity + ',' + this.userBasicInfo.data[0].MailingState + ',' + this.userBasicInfo.data[0].MailingPostalCode + ', ' + this.userBasicInfo.data[0].MailingCountry;
  }

  loanDetails(id){
    this.data.getBlogDetails(id).subscribe(res =>{
      this.blogDetailsData = res;
      localStorage.setItem('sliderBlogDetail', JSON.stringify(this.blogDetailsData.data))
      this.router.navigate(['blogdetails'])
    });
  }

  openModal(userDetails){
    this.displayModal='block';
  }

  showStatus(){
    let callback = sessionStorage.getItem('callback');
    if(callback=='1'){this.callbackValue="Successful"}
    else if(callback=='2'){this.callbackValue="Failed"}
    else if(callback=='3'){this.callbackValue="Already Submitted"}
  }

  getNewLoan(){
    this.displayModal='none';
    this.showLoader=false;
    this.loanRestuctUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://dev.vistaconnect.com/LRService/?key=DMI003");
  }

  submitDetails(){
    window.open('https://dmi.vistaconnect.com/x-sell/?mobileNumber=8889997776&key=asFgG145R57yb08IuuGh1');
  }

  ngOnDestroy(){ 
    clearTimeout(this.userActivity);
  }

}
