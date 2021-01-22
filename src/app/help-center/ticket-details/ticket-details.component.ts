import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  userActivity;
  userInactive: Subject<any> = new Subject();
  alltickets:any;
  tktDetails:any;

  constructor(private service:DataService,private router: Router) {
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
    let no_of_records_per_page = 3
    this.service.getalltickets(localStorage.getItem('dmi_token'),localStorage.getItem('dmi_instance_url'),localStorage.getItem('dmi_phone'),no_of_records_per_page).subscribe(res => {
      this.alltickets = res;
      let abc = this.alltickets.data[0].Status;
    })

  }

  ticketDetails(ticket){
    let ticket_id = ticket.Id;
    this.service.getticketdetails(localStorage.getItem('dmi_token'),localStorage.getItem('dmi_instance_url'),localStorage.getItem('dmi_phone'),ticket_id).subscribe(res => {
      this.tktDetails = res;
    })
  }

  noOfRecords(alltickets){
    let no_of_records_per_page = alltickets.data.length + 3
    this.service.getalltickets(localStorage.getItem('dmi_token'),localStorage.getItem('dmi_instance_url'),localStorage.getItem('dmi_phone'),no_of_records_per_page).subscribe(res => {
      this.alltickets = res;
      let abc = this.alltickets.data[0].Status;
    })
  }

  ngOnDestroy(){ 
    clearTimeout(this.userActivity);
  }

}
