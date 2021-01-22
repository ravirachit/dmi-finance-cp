import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.scss']
})
export class BlogdetailsComponent implements OnInit {
  userActivity;
  userInactive: Subject<any> = new Subject();
  blogDetail: any;
  description: any;
  blog_description: any;
  blog_title:any;
  channelName:any='';
  channelPartnerName:any='';

  constructor(
    public domSanatize: DomSanitizer,
    private router: Router,
    private data: DataService
  ) { 
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
    this.blogDetail = JSON.parse(localStorage.getItem('sliderBlogDetail'));
    this.description = this.blogDetail[0].blog_description;
    this.blog_title = this.blogDetail[0].blog_title;
    // this.blog_description = this.description.replace(/<[^>]*>/g, '');

    this.data.getChannelPartner(localStorage.getItem('dmi_phone')).subscribe(res=>{
      this.channelName=res;
      this.channelPartnerName=this.channelName.data;
      if(this.channelName!=''){
        let eventName = 'Visited blog details' + this.blog_title;
        let phone = localStorage.getItem('dmi_phone')
        let campign_number = 'null';
        let source = 'DMI-Customer-Portal';
        this.data.getEventName(phone, eventName, campign_number, source,this.channelPartnerName).subscribe(res => {
        })
      }
    });
  }

  ngOnDestroy(){ 
    clearTimeout(this.userActivity);
  }
}
