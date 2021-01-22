import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { IfStmt } from '@angular/compiler';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ShareDataService } from 'src/app/share-data.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  SpeceficLoanDetail: any;
  loanDetails:any;
  mobile : any;
  pageno : any = 1;
  records : any = 2;
  rating : any = '';
  reviews : any = '';
  session : any;
  showDial : boolean = false;
  rated : boolean = false;
  response:any;
  campign_number:any;
  eventName:any;
  userBasicInfo:any;
  clickedStar:boolean=false;

  showGood:boolean=false;
  showAvg:boolean=false;
  showPoor:boolean=false;
  getSession:any='';
  sessionAlert:boolean=false;
  sessionExist:boolean=false;
  checkedFeedLog:boolean=true;

  customer_id :any= "";
  name :any= "";
  user_email :any= "";
  user_phone:any= "";
  app_id:any= "";
  notify_channel= "none";
  is_generate_short_url= false;
  userBasicInfoRating:any='';
  url: SafeResourceUrl;
  feedbackResp:any='';
  feedbackResponse:any=[];
  userName1:any
  loanDetail:any='';
  channelName:any='';
  channelPartnerName:any='';

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;


  
  constructor(private data: DataService,
  private router: Router,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,public sanitizer: DomSanitizer,private service:ShareDataService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }
   ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  ngOnInit() {
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    this.userName1 = localStorage.getItem('user_basic_name')
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
    this.mobile = localStorage.getItem('dmi_phone');
    this.session = localStorage.getItem('token');
    this.SpeceficLoanDetail = JSON.parse(localStorage.getItem('specific_loan_detail'));
    if(localStorage.getItem('specefic_loan_id')){
      this
      .data
      .getSpecificLoan(localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'), localStorage.getItem('specefic_loan_id')).subscribe(
        data => {
          this.loanDetails = data
          this.SpeceficLoanDetail = this.loanDetails.data
          this.campign_number = this.SpeceficLoanDetail[0].name;
        },
        err => { this.SpeceficLoanDetail = [] }
      );
      
    }else{
      this.SpeceficLoanDetail = JSON.parse(localStorage.getItem('specific_loan_detail'));
    }
  }

 
  logout() {
     localStorage.clear();
     this.router.navigate(['']);
  }

  checkRatingLogout(){
    this.getSession = localStorage.getItem('sesssionRating');
    if(this.getSession!=null){
      this.sessionExist = true;
    }else if(this.getSession==null){
      this.logout();
      this.sessionExist = false;
    }
  }

  getfeedbackLogout(){
    let phone = localStorage.getItem('dmi_phone')
    let campign_number = this.campign_number;
    this.eventName = 'Made an action to "Logout" from Side Menu for Loan Name'+': '+ campign_number;
    let source = 'DMI-Customer-Portal'
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    if(this.channelName!=''){
      this.data.getEventName(phone, this.eventName, this.campign_number, source,this.SpeceficLoanDetail[0].Pulled_Lead_Source_Name__c).subscribe(res => {
      })
    }

    if(this.reviews==''){
      this.reviews='-';
    }
    if(this.clickedStar == true){
      localStorage.removeItem('sesssionRating');
      this.data.getFeedback(this.mobile,this.rating,this.reviews,localStorage.getItem('dmi_token'),localStorage.getItem('dmi_instance_url')).subscribe(res=>{
        if(res){
        }
        this.rating = '';
        this.showDial = false;
        this.showPoor=false;this.showAvg=false;this.showGood=false;
        this.logout();
      });
    }
    else{
      this.logout();
    }
  }

  onRate(newValue:number) {
    if(newValue>=1)
    { this.checkedFeedLog=false;}
    this.clickedStar=true;
    this.showPoor=false;this.showAvg=false;this.showGood=false;
    this.rating = newValue;
    if(newValue){this.showDial = true;}
    if(newValue<=7){this.showPoor=true;}
    else if(newValue<10&&newValue>7){this.showAvg=true;}
    else if(newValue>9){this.showGood=true;}
  }
  
  closeRate(){
    this.showDial = false;
    this.showPoor=false;this.showAvg=false;this.showGood=false;
  }

  checkRatingStats(){
    let phone = localStorage.getItem('dmi_phone')
    let campign_number = this.campign_number;
    this.eventName = 'Made an action to "Logout" from Side Menu for Loan Name'+': '+ campign_number;
    let source = 'DMI-Customer-Portal'
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    if(this.channelName!=''){
      this.data.getEventName(phone, this.eventName, this.campign_number, source,this.SpeceficLoanDetail[0].Pulled_Lead_Source_Name__c).subscribe(res => {
      });
    }

    this.userBasicInfoRating = JSON.parse(localStorage.getItem('user_basic_info'));
    this.customer_id = this.userBasicInfoRating.data[0].Id;
    this.name = this.userBasicInfoRating.data[0].Name;
    this.user_email = this.userBasicInfoRating.data[0].Email;
    this.user_phone = this.userBasicInfoRating.data[0].Phone;
    this.data.getRatingDetails(this.user_email,this.user_phone).subscribe(res=>{
    })

    this.data.getChannelPartner(localStorage.getItem('dmi_phone')).subscribe(res=>{
      this.channelName=res;
      this.channelPartnerName=this.channelName.data;
      if(this.channelName!=''){
        this.app_id = this.service.getAppIdforFeedback(this.channelPartnerName);
        if(this.app_id==''){this.app_id='juz6_test';}
        this.data.FeedbackLTMS(this.customer_id, this.name, this.user_email, this.user_phone, this.app_id,this.channelPartnerName).subscribe(res=>{
          if(res){
            this.feedbackResp = res;
            this.feedbackResponse = this.feedbackResp.data.data.long_url;
            this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.feedbackResponse);
          }
        });
      }
    });

   ////////////////////////////document///////////////////////////

   if (window.addEventListener)
   {
    window.addEventListener("message", onMessage, false);
   } 
   else if ((<any>window).attachEvent)
   {
      (<any>window).attachEvent("onmessage", onMessage, false);
    }
    function onMessage(event) {
      if (event.origin !== "https://app.litmusworld.com" || event.origin !== "https://app-india.litmusworld.com" || event.origin !== "https://dashboard.litmusworld.com" || event.origin !== "https://dashboard-india.litmusworld.com") return;
      var data = event.data;
      console.log('response after close feedback')
      if (typeof (window[data.func]) == "function") {
      // window[data.func].call(null, data.message);
      alert(event);
    }
  }

  ////////////////////////////document///////////////////////////

  }

  closeRateLogout(){
    let phone = localStorage.getItem('dmi_phone')
    let campign_number = this.campign_number;
    this.eventName = 'Made an action to "Logout" from Side Menu for Loan Name'+': '+ campign_number;
    let source = 'DMI-Customer-Portal'
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    if(this.channelName!=''){
      this.data.getEventName(phone, this.eventName, this.campign_number, source,this.SpeceficLoanDetail[0].Pulled_Lead_Source_Name__c).subscribe(res => {
      })
    }
    this.logout();
  }
}
