import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  userActivity;
  userInactive: Subject<any> = new Subject();
  blogData: any;
  paginationData: any;
  page = 1;
  pageSize = 9;
  collectionSize: any;
  staticPage: any;
  blogDetailsData: any;
  blogs: any;
  channelName:any='';
  channelPartnerName:any='';

  constructor(
    private data: DataService,
    private http: HttpClient,
    public domSanatize: DomSanitizer,
    private router: Router
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
    this.data.getChannelPartner(localStorage.getItem('dmi_phone')).subscribe(res=>{
      this.channelName=res;
      this.channelPartnerName=this.channelName.data;
      if(this.channelName!=''){
        // Start event tracking
        let eventName = 'Visited : Blogs'
        let phone = localStorage.getItem('dmi_phone')
        let campign_number = 'null';
        let source = 'DMI-Customer-Portal';
        this.data.getEventName(phone, eventName, campign_number, source,this.channelPartnerName).subscribe(res => {
        })
        // end
      }
    });
    
    this.staticPage = '1'
    this.data.getBlogList(this.staticPage).subscribe(res => {
      this.blogData = res;
    })

    this.data.getPagination().subscribe(res => {
      this.paginationData = res;
      this.collectionSize = this.paginationData.data.totalblog;
    })
  }

  loadPage(page: number) {
    this.data.getBlogList(page).subscribe(res => {
      this.blogData = res;
    })
    window.scroll(0, 0);
  }

  blogDetail(blog) {
    // Start event tracking
    let eventName = 'Blog Detail Page'
    let phone = localStorage.getItem('dmi_phone')
    let campign_number = 'null';
    let source = 'DMI-Customer-Portal';
    this.data.getEventName(phone, eventName, campign_number, source,this.channelPartnerName).subscribe(res => {
    })
    // end

    this.data.getBlogDetails(blog.id).subscribe(res => {
      this.blogDetailsData = res;
      localStorage.setItem('blogDetail', JSON.stringify(this.blogDetailsData.data))
      this.router.navigate(['blogdetails'])
    })
  }

  ngOnDestroy(){ 
    clearTimeout(this.userActivity);
  }

}
