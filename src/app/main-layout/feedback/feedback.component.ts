import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
import { HttpClient, HttpHeaders ,HttpParams,HttpRequest,HttpClientXsrfModule} from '@angular/common/http';
import { DataService } from 'src/app/data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {Location } from '@angular/common';
import { ShareDataService } from 'src/app/share-data.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  user_details:any;
  params:any;
  isFound :boolean= false;
  feedbackResp:any='';
  feedbackResponse:any=[];
  customer_id :any= "";
  name :any= "";
  user_email :any= "";
  user_phone:any= "";
  app_id= "";
  notify_channel= "none";
  is_generate_short_url= false;
  showFeedback:boolean=false;
  userBasicInfo:any='';
  private location:Location;
  channelName:any='';
  channelPartnerName:any='';
  url:any='https://app-india.litmusworld.com/rateus/api/feedbackrequests/generate_customer_feedback_url';


  constructor(private http: HttpClient,private service:DataService,public sanitizer: DomSanitizer,public data: ShareDataService) {
  }

  ngOnInit() {
    this.service.getChannelPartner(localStorage.getItem('dmi_phone')).subscribe(res=>{
      this.channelName=res;
      this.channelPartnerName=this.channelName.data;
      if(this.channelName!=''){
        this.customer_id = this.userBasicInfo.data[0].Id;
        this.name = this.userBasicInfo.data[0].Name;
        this.user_email = this.userBasicInfo.data[0].Email;
        this.user_phone = this.userBasicInfo.data[0].Phone;
        this.app_id = this.data.getAppIdforFeedback(this.channelPartnerName);
        this.service.FeedbackLTMS(this.customer_id, this.name, this.user_email, this.user_phone, this.app_id,this.channelPartnerName).subscribe(res=>{
          if(res){
            this.feedbackResp = res;
            this.showFeedback=true;
            this.feedbackResponse = this.feedbackResp.data.data.long_url;
          }
        });
      }
    });
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info'));
  }

  getSafeUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.feedbackResponse);
  }

  previousPage(){
    this.location.back();
  }

}
