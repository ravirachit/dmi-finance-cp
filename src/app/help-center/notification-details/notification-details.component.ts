import { Component, OnInit ,ViewContainerRef, HostListener} from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.scss']
})
export class NotificationDetailsComponent implements OnInit
{
  userActivity;
  userInactive: Subject<any> = new Subject();
  mobile : any;
  pageno : any = 1;
  records : any = 2;
  loanDetail:any='';
  notification_type_notif : any = 1;
  notification_type_alert : any = 2;
  tabId : any;

  notificationArr : any = [];
  alertArr : any = [];
  trendingArr : any = [];
  arrofTrending : any = [];
  blogDetailsData:any;
  channelName:any='';
  channelPartnerName:any='';


  constructor(private service : DataService,
    private router: Router) { 
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
    this.service.getChannelPartner(localStorage.getItem('dmi_phone')).subscribe(res=>{
      this.channelName=res;
      this.channelPartnerName=this.channelName.data;
    });
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    this.mobile = localStorage.getItem('dmi_phone');
    this.getNotification();
    this.getTrendingList();
  }

  getNotification(){
    if(this.channelName!=''){
      let eventName = 'Notification Event'
      let phone = localStorage.getItem('dmi_phone');
      let campign_number = 'Not Available'
      let source = 'DMI-Customer-Portal';
      this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
      this.service.getEventName(phone, eventName, campign_number,source,this.channelPartnerName).subscribe(res => {
      }) 
    }

    this.service.getNotificationList(this.mobile,this.pageno,this.records,this.notification_type_notif).subscribe(res=>
    {this.notificationArr = res;
    });
  }

  getAlert(){
    if(this.channelName!=''){
      let eventName = 'Alert Event'
      let phone = localStorage.getItem('dmi_phone');
      let campign_number = 'Not Available'
      let source = 'DMI-Customer-Portal';
      this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
      this.service.getEventName(phone, eventName, campign_number,source,this.channelPartnerName).subscribe(res => {
      }) 
    }

    this.service.getNotificationList(this.mobile,this.pageno,this.records,this.notification_type_alert).subscribe(res=>
    {this.alertArr = res;
    });
  }

  getTabchange(event)
  {
    this.tabId = event.nextId;
    if(this.tabId == "Notification")
    {
      this.getNotification();
    }
    else if(this.tabId == "Alert")
    {
      this.getAlert();
    }
  }

  getTrendingList(){
    this.service.getTrendingDataList(this.pageno).subscribe( res=>
    {
      this.trendingArr = res;
    });
  }
  // gotoblogpage(){
  //   this.router.navigate(['blog'])
  // }

  loanDetails(id){
    this.service.getBlogDetails(id).subscribe(res =>{
      this.blogDetailsData = res;
      localStorage.setItem('sliderBlogDetail', JSON.stringify(this.blogDetailsData.data))
      this.router.navigate(['blogdetails'])
    });
  }

  ngOnDestroy(){ 
    clearTimeout(this.userActivity);
  }

}
