import { Component, OnInit,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/share-data.service';
import { DataService } from 'src/app/data.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  userActivity;
  userInactive: Subject<any> = new Subject();
  categorylist:boolean = true;
  categorylistdetails:boolean = false;
  clickedId : any = '';
  page : any = 1;
  records : any = 8;
  categoryArr : any = [];
  categoryListArr : any = [];
  recentArr : any = [];
  likedValue : any;
  details : any = [];
  categoryId : any;
  categoryIdDetails : any;
  clickedSearch : boolean = false;
  article_id : any;
  setClickedFromFirst : boolean = false;
  mobile : any;
  clickedButton : any;
  response : any;
  clickedCategoryName : any;
  campign_number:any;
  eventName:any;
  loanDetail:any='';
  channelName:any='';
  channelPartnerName:any='';

  constructor(private router: Router,private data:ShareDataService,private service : DataService) { 
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

  ngOnInit(){
    this.service.getChannelPartner(localStorage.getItem('dmi_phone')).subscribe(res=>{
      this.channelName=res;
      this.channelPartnerName=this.channelName.data;
      if(this.channelName!=''){
        let phone = localStorage.getItem('dmi_phone')
        this.campign_number = 'null';
        this.eventName = 'Visited: Category Details';
        let source = 'DMI-Customer-Portal';
        this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
        this.service.getEventName(phone, this.eventName, this.campign_number, source,this.channelPartnerName).subscribe(res => {
        });
      }
    });
      this.mobile = localStorage.getItem("dmi_phone");
      this.setClickedFromFirst = this.data.getClickedFromFirst();
      if(this.setClickedFromFirst == true){
      this.categoryId = this.data.getCategoryId();
      this.clickedCategoryName = this.data.getCategoryName();
      this.getCategoryClickedDetail();
      this.getRecentClickedDetails();
    }
    this.getCategories();
  }

  // listCategoryPage(){
  //   this.categorylistdetails = true;
  //   this.categorylist = false;
  // }

  getDetails(id,value)
  {
    if(this.channelName!=''){
      let phone = localStorage.getItem('dmi_phone')
      this.campign_number = 'null';
      this.eventName = 'Made an action to view "' +value+ '" from Category Details';
      let source = 'DMI-Customer-Portal';
      this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
      this.service.getEventName(phone, this.eventName, this.campign_number, source,this.channelPartnerName).subscribe(res => {
      });
    }
    this.categoryId  = id;
    this.clickedCategoryName = value;
    this.setClickedFromFirst = false;
    this.categorylistdetails = false;
    this.categorylist = true;

    this.service.getCategoryDetails(this.categoryId,this.page,this.records).subscribe(res=>
    {
      this.categoryArr = res;
    });
    this.getRecent(this.categoryId);
  }

  getCategories()
  {
    this.service.getCategoryList().subscribe(res=>
      {this.categoryListArr = res;
    });
  }

  getRecent(cat_id){
    this.service.getRecentActivity(cat_id).subscribe(res=>
    {
      this.recentArr = res;
    });
  }

  getDetailArticle(event)
  {
    if(this.channelName!=''){
      let phone = localStorage.getItem('dmi_phone')
      this.campign_number = 'null';
      this.eventName = 'Opened the article' +""+ event.title +""+ 'from Category Detail';
      let source = 'DMI-Customer-Portal';
      this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
      this.service.getEventName(phone, this.eventName, this.campign_number, source,this.channelPartnerName).subscribe(res => {
      });
    }
    this.article_id = event;
    this.service.getArticleDetails(event).subscribe(res=>
    {
      this.details = res;
    });
    this.categorylistdetails = true;
    this.categorylist = false;
  }

  likedArticle(){
    if(this.channelName!=''){
      let phone = localStorage.getItem('dmi_phone')
      this.campign_number = 'null';
      this.eventName = 'Article Feedback: "Liked"';
      let source = 'DMI-Customer-Portal';
      this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
      this.service.getEventName(phone, this.eventName, this.campign_number, source,this.channelPartnerName).subscribe(res => {
      })
    }

    this.clickedButton=1;
    this.imageClicked();
  }

  unlikedArticle(){
    if(this.channelName!=''){
      let phone = localStorage.getItem('dmi_phone')
      this.campign_number = 'null';
      this.eventName = 'Article Feedback: "Un-Liked"';
      let source = 'DMI-Customer-Portal';
      this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
      this.service.getEventName(phone, this.eventName, this.campign_number, source,this.channelPartnerName).subscribe(res => {
      })
    }
    this.clickedButton=0;
    this.imageClicked();
  }

  imageClicked(){
    // let userId = this.data.getUserId();
    let userId = localStorage.getItem('userId');
    this.service.likeArticle(userId,this.mobile,this.article_id,this.clickedButton).subscribe(res=>
    {
      this.response = res;
      if(res)
      {
        if(this.setClickedFromFirst == true){
          this.getCategoryClickedDetail();
          this.getRecentClickedDetails();
        }
        else{
          this.service.getCategoryDetails(this.categoryId,this.page,this.records).subscribe(res=>
          {
            this.categoryArr = res;
          });
          this.getRecent(this.categoryId);
        }
        this.categorylistdetails = false;
        this.categorylist = true;
      }
      alert(this.response.message);
    });
  }

  getCategoryClickedDetail(){
    this.service.getCategoryDetails(this.categoryId,this.page,this.records).subscribe(res=>
    {
      this.categoryArr = res;
    });
    this.categorylistdetails = false;
    this.categorylist = true;
  }

  getRecentClickedDetails(){
    this.service.getRecentActivity(this.categoryId).subscribe(res=>
    {
      this.recentArr = res;
    });
  }

  ngOnDestroy(){ 
    clearTimeout(this.userActivity);
  }

}
