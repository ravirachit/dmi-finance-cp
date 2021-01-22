import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-knowladgebase',
  templateUrl: './knowladgebase.component.html',
  styleUrls: ['./knowladgebase.component.scss']
})
export class KnowladgebaseComponent implements OnInit {

  channelName:any='';
  channelPartnerName:any='';

  constructor(private http:HttpClient, private data:DataService, private route: Router) { }

  kbposts: any;
  ngOnInit() {
    this.data.getChannelPartner(localStorage.getItem('dmi_phone')).subscribe(res=>{
      this.channelName=res;
      this.channelPartnerName=this.channelName.data;
      if(this.channelName!=''){
         // Start event tracking
        let eventName = 'Knowledgebase Page'
        let phone = localStorage.getItem('dmi_phone')
        let campign_number = 'null';
        let source = 'DMI-Customer-Portal';
        this.data.getEventName(phone, eventName, campign_number, source,this.channelPartnerName).subscribe(res => {
        })
        // end
      }
    });
    this.data.getKBdata().subscribe( data=> {this.kbposts = data;
    }
      )
  }
}
