import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss']
})

export class CustomerSupportComponent implements OnInit {
  userBasicInfo:any;
  channelName:any='';
  channelPartnerName:any='';

  constructor(private router: Router, private data: DataService) { }

  ngOnInit() {
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
    this.data.getChannelPartner(localStorage.getItem('dmi_phone')).subscribe(res=>{
      this.channelName=res;
      this.channelPartnerName=this.channelName.data;
      if(this.channelName!=''){
        // Start event tracking
        let eventName = 'Customer Support Page'
        let phone = localStorage.getItem('dmi_phone')
        let campign_number = 'null';
        let source = 'DMI-Customer-Portal';
        this.data.getEventName(phone, eventName, campign_number, source,this.channelPartnerName).subscribe(res => {
        })
        // end
      }
    });
  }

}
