import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service'
import { ShareDataService } from '../share-data.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']
})
export class HelpCenterComponent implements OnInit {
  userActivity;
  userInactive: Subject<any> = new Subject();
  searchPanel: boolean = false;
  search: any = [];
  searching: any;
  article_id: any;
  searchDataValue: any;
  notificationArr: any = [];
  faqArr: any = [];
  categoryArr: any = [];
  mobile: any;
  pageno: any = 1;
  records: any = 2;
  clickedId: any;
  category_id: any;
  notification_type: any = 1;
  click = -1;
  desc: any;
  tktlistData:any;
  setClickedFromFirst : boolean = false;
  userName : any;
  user_name:any;
  campign_number:any;
  eventName:any;
  userName1:any;
  loanDetail:any='';
  channelName:any='';
  channelPartnerName:any='';

  constructor(private router: Router, private service: DataService, private data: ShareDataService) { 
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
      let phone = localStorage.getItem('dmi_phone')
      this.campign_number = 'null';
      this.eventName = 'Visited : Help Center'
      let source = 'DMI-Customer-Portal';
      if(this.channelName!=''){
        this.service.getEventName(phone, this.eventName, this.campign_number, source,this.channelPartnerName).subscribe(res => {
        })
      }
    });
    this.userName1 = localStorage.getItem('user_basic_name')
    this.mobile = localStorage.getItem("dmi_phone");
    this.userName = JSON.parse(localStorage.getItem('user_basic_info'));
    this.user_name = this.userName.data[0].Name;
    this.getNotification();
    this.getCategories();
    this.getFAQList();

    this.service.getlastthreeTkt(localStorage.getItem('dmi_token'),localStorage.getItem('dmi_instance_url'),localStorage.getItem('dmi_phone')).subscribe(res => {
      this.tktlistData = res;
    })

  }

  ticketdetails() {
    this.router.navigate(['helpcenter/serviceticketdetails']);
  }
  
  notificationAndAlertDetails() {
    if(this.channelName!=''){
      let phone = localStorage.getItem('dmi_phone')
      this.campign_number = 'null';
      this.eventName = 'Made an action to "View All" for Notification and Alerts from Help Center';
      let source = 'DMI-Customer-Portal';
      this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
      this.service.getEventName(phone, this.eventName, this.campign_number, source,this.channelPartnerName).subscribe(res => {
      });
    }

    this.router.navigate(['helpcenter/notification&alertdetails'])
  }
  categorydetails(event,name)
  { 
    if(this.channelName!=''){
      let phone = localStorage.getItem('dmi_phone')
      this.campign_number = 'null';
      this.eventName = 'Made an action to view "' +name+ '" from Help Center';
      let source = 'DMI-Customer-Portal';
      this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
      this.service.getEventName(phone, this.eventName, this.campign_number, source,this.channelPartnerName).subscribe(res => {
      });
    }
    this.data.setCategoryId(event);
    this.data.setCategoryName(name);
    this.data.setClickedFromFirst(true);
    this.router.navigate(['helpcenter/categorydetails']);
  }
  openSearchResults() {
    this.searchPanel = true;
  }
  createTickets() {
    this.router.navigate(['helpcenter/createtickets'])
  }

  blogDetail() {
    this.service.getArticleSearch(this.searching).subscribe(res => {
      this.search = res;
    })
  }

  searchData() {
    this.data.setId(this.article_id);
    this.data.setCategoryId(this.category_id);
    this.data.setClickedFromFirst(true);
    this.router.navigate(['helpcenter/categorydetails']);
  }

  header(index, value) {
    let phone = localStorage.getItem('dmi_phone')
    this.campign_number = 'null';
    this.eventName = 'Search for : "Search Term"'
    let source = 'DMI-Customer-Portal';
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    this.service.getEventName(phone, this.eventName, this.campign_number, source,this.channelPartnerName).subscribe(res => {
    })

  this.article_id = index;
    this.category_id = value;
    let arr = this.search.data;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == index) { this.searching = arr[i].title; this.search = []; }
    }
    this.searchData();
  }

  getDetails() {
    this.service.getArticleDetails(this.article_id).subscribe(res => {
    });
  }

  getNotification() {
    this.service.getNotificationList(this.mobile, this.pageno, this.records, this.notification_type).subscribe(res => {
    this.notificationArr = res;
    });
  }

  getCategories() {
    this.service.getCategoryList().subscribe(res => {
    this.categoryArr = res;
    })
  }

  getFAQList() {
    this.service.getFAQList().subscribe(res => {
    this.faqArr = res;
    }
    )
  }

  listClick(ind) {
    if (this.click === ind) {
      this.click = -1;
    } else {
      this.click = ind;
    }
  }

  ngOnDestroy(){ 
    clearTimeout(this.userActivity);
  }

}
