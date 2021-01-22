import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { ShareDataService } from 'src/app/share-data.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ExperianModalComponent } from 'src/app/modal/experian-modal/experian-modal.component';
import { ExperianHistoryComponent } from 'src/app/modal/experian-history/experian-history.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  mobile : any;
  pageno : any = 1;
  records : any = 2;
  notification_type : any = 1;
  notificationArr : any = [];
  rating : any = '';
  ratingLog:any= '';
  reviews : any = '';
  showDial : boolean = false;
  campign_number:any;
  eventName:any;
  showGood:boolean=false;
  showAvg:boolean=false;
  showPoor:boolean=false;
  clickedStar:boolean=false;
  checkedFeedOnly:boolean=true;
  checkedFeedLog:boolean=true;
  getSession:any='';
  sessionAlert:boolean=false;
  sessionExist:boolean=false;
  showFeedback:boolean=false;
  feedBackLiabrary:boolean = false;
  user_details:any;
  params:any;
  isFound :boolean= false;
  feedbackResp:any='';
  feedbackResponse:any=[];
  customer_id :any= "";
  name :any= "";
  user_email :any= "";
  user_phone:any= "";
  otpSentResponse:any='';
  app_id:any= "";
  notify_channel= "none";
  experian_error:any='';
  is_generate_short_url= false;
  userBasicInfo:any='';
  url: SafeResourceUrl;
  channelName:any='';
  channelPartnerName:any=[];
  selectedGender:number;
  responseResult:any=[];
  titleAlert: string = 'This field is required';
  loanDetail:any='';
  creditScoreRes:any = [];

  constructor(private router:Router,private data:DataService,
    public sanitizer: DomSanitizer,private http: HttpClient,
    private modalService: NgbModal,
    public service:ShareDataService) {}

  ngOnInit() {
    this.getNotification();
    this.getChannelPartnerName();
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info'));
    this.mobile = localStorage.getItem('dmi_phone');
    if(this.userBasicInfo != null){
      this.customer_id = this.userBasicInfo.data[0].Id;
    }
  }

  experian(){
    let phone = localStorage.getItem('dmi_phone')
    this.campign_number = 'null';
    this.eventName = 'Get Credit Score'
    let source = 'DMI-Customer-Portal';
    this.data.getEventName(phone, this.eventName, this.campign_number, source,this.channelPartnerName).subscribe();

    this.data.getCreditScoreRecord(phone).subscribe(res=>{
      if(res){
        this.creditScoreRes = res;
        localStorage.setItem("Credit_Score_Data", JSON.stringify(this.creditScoreRes.data));
        this.router.navigate(['/creditScoreDetail']);
      }else{
        let modalObj : NgbModalOptions = {
          backdrop: 'static',
          centered: true,
          windowClass: 'myCustomModalClass',
          keyboard: false,
        }
        const modal = this.modalService.open(ExperianModalComponent,modalObj);
      }
    },
    err=>{
      let modalObj : NgbModalOptions = {
        backdrop: 'static',
        centered: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
      }
      const modal = this.modalService.open(ExperianModalComponent,modalObj);
  
      // let modalObj1 : NgbModalOptions = {
      //   backdrop: 'static',
      //   centered: true,
      //   windowClass: 'myCustomExpModal',
      //   keyboard: false,
      // }
      // const modal1 = this.modalService.open(ExperianHistoryComponent,modalObj1);
    });
  }

  checkRatingStats(){
    this.showFeedback=true;
    this.userBasicInfo = '';
    this.customer_id = '';
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info'));
    this.customer_id = this.userBasicInfo.data[0].Id;
    this.name = this.userBasicInfo.data[0].Name;
    this.user_email = this.userBasicInfo.data[0].Email;
    if(this.userBasicInfo.data[0].Phone==null){
      this.user_phone = this.userBasicInfo.data[0].MobilePhone;
    }else{this.user_phone = this.userBasicInfo.data[0].Phone;}
    this.data.getRatingDetails(this.user_email,this.user_phone).subscribe(res=>{
    });

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
      if (event.origin !== "https://app.litmusworld.com" || event.origin !== "https://app-india.litmusworld.com" || event.origin !== "https://dashboard.litmusworld.com" || 
         event.origin !== "https://dashboard-india.litmusworld.com") return;

      var data = event.data;
      if (typeof (window[data.func]) == "function") {
      // window[data.func].call(null, data.message);
      alert(event);
    }
  }

  ////////////////////////////document///////////////////////////
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

  logout() {
     localStorage.clear();
     this.router.navigate(['']);
  }

  getfeedbackLogout(){
    let phone = localStorage.getItem('dmi_phone')
    this.campign_number = 'null';
    this.eventName = 'Made an action to "Logout" from Top Menu'
    let source = 'DMI-Customer-Portal'
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    if(this.channelName!=''){
        this.data.getEventName(phone, this.eventName, this.campign_number, source,this.channelPartnerName).subscribe(res => {
      })
    }

    if(this.reviews==''){
      this.reviews='-';
    }
    if(this.clickedStar == true){
      localStorage.removeItem('sesssionRating');
      this.data.getFeedback(this.mobile,this.ratingLog,this.reviews,localStorage.getItem('dmi_token'),localStorage.getItem('dmi_instance_url')).subscribe(res=>{
        if(res){
        }
        this.ratingLog = '';
        this.showDial = false;
        this.showPoor=false;this.showAvg=false;this.showGood=false;
        this.logout();
      });
    }
    else{
      this.logout();
    }
  }

  getfeedbackOnly(){
    let phone = localStorage.getItem('dmi_phone')
    this.campign_number = 'null';
    this.eventName = 'Made an action to "Give Feedback" From Top Menu'
    let source = 'DMI-Customer-Portal'
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    if(this.channelName!=''){
      this.data.getEventName(phone, this.eventName, this.campign_number, source,this.channelPartnerName).subscribe(res => {
      })
    }
    if(this.reviews==''){
      this.reviews='-';
    }
    localStorage.removeItem('sesssionRating');

    this.data.getFeedback(this.mobile,this.rating,this.reviews,localStorage.getItem('dmi_token'),localStorage.getItem('dmi_instance_url')).subscribe(res=>{
      if(res){
      }
      this.rating = '';
      this.showDial = false;
      this.showPoor=false;this.showAvg=false;this.showGood=false;
    });
  }

  onRate(newValue:number) {
    this.clickedStar=false;
    if(newValue>=1){
      this.checkedFeedOnly=false;
    }
    this.showPoor=false;this.showAvg=false;this.showGood=false;
    this.rating = newValue;
    if(newValue){this.showDial = true;}
    if(newValue<=7){this.showPoor=true;}
    else if(newValue<10&&newValue>7){this.showAvg=true;}
    else if(newValue>9){this.showGood=true;}
  }

  onRateLogout(newValue:number) {
    this.clickedStar=true;
    if(newValue>=1){
      this.checkedFeedLog=false;
    }
    this.showPoor=false;this.showAvg=false;this.showGood=false;
    this.ratingLog = newValue;
    if(newValue){this.showDial = true;}
    if(newValue<=7){this.showPoor=true;}
    else if(newValue<10&&newValue>7){this.showAvg=true;}
    else if(newValue>9){this.showGood=true;}
  }

  closeRate(){
    if(this.channelName!=''){
      let phone = localStorage.getItem('dmi_phone')
      this.campign_number = 'null';
      this.eventName = 'Made an action to "Give Feedback" From Top Menu'
      let source = 'DMI-Customer-Portal';
      this.data.getEventName(phone, this.eventName, this.campign_number, source,this.channelPartnerName).subscribe(res => {
      })
    }
    this.showDial = false;
    this.showPoor=false;this.showAvg=false;this.showGood=false;
  }

  closeRateLogout(){
    if(this.channelName!=''){
      let phone = localStorage.getItem('dmi_phone')
      this.campign_number = 'null';
      this.eventName = 'Logout from Feedback window'
      let source = 'DMI-Customer-Portal';
      this.data.getEventName(phone, this.eventName, this.campign_number, source,this.channelPartnerName).subscribe(res => {
      });
      this.logout();
    }
  }

  getNotification(){
    this.data.getNotificationList(localStorage.getItem('dmi_phone'),this.pageno,this.records,this.notification_type).subscribe(res=>
    {this.notificationArr = res;});
  }
  
  notificationDetails(){
    this.router.navigate(['helpcenter/notification&alertdetails'])
  }

  getSafeUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.feedbackResponse);
  }
  
  getChannelPartnerName(){
    this.data.getChannelPartner(localStorage.getItem('dmi_phone')).subscribe(res=>{
      this.channelName=res;
      this.channelPartnerName=this.channelName.data;
    });
  }

}
