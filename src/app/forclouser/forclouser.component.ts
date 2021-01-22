declare var Razorpay: any;
import { Component, OnInit,ViewChild,ElementRef, HostListener} from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as jsPDF from 'jspdf'
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-forclouser',
  templateUrl: './forclouser.component.html',
  styleUrls: ['./forclouser.component.scss']
})
export class ForclouserComponent implements OnInit {
 loan_borrower_name = localStorage.getItem('loan_borrower_name');
 loan_stage = localStorage.getItem('loan_stage');
 loanName = localStorage.getItem('single_loan_name');
 loan_lead_source_name = localStorage.getItem('loan_lead_source_name');
  loanId = localStorage.getItem('specefic_loan_id');
  phone = localStorage.getItem('dmi_phone')
  responsedata:any;
  forcluserdata:any;
  fortrue:boolean = false;
  showRemarks:boolean=false;
  dashboardloader:boolean=false;
  disableBtn:boolean=true;
  paynowDisable:boolean=false;
  foreclosureValues:any=[];
  opName:any='';
  Remarks:any='';
  creationDate:any='';
  formula : string = '';
  csvResp  = [];
  downloadData:boolean=false;
  userActivity:any='';
  userInactive: Subject<any> = new Subject();
  @ViewChild('pdfTable') pdfTable: ElementRef;

  // payment
  loanDetail:any = ''
  channelName:any='';
  channelPartnerName:any='';
  city: any;country: any;postalCode: any;state: any;street: any;billingAddress: any; userBasicInfo: any;email: any; acHolderName: any;loanDetails: any;
  userName: any; phoneNo: any; 
  payNowData: any;
  payNowcustomerId: any;
  payNoworderId: any;
  display2 = 'none';
  payNowModel = 'none';
  userName1:any;
  paidPayableAmount:any;
  totalAmt:any

  constructor(private data: DataService, private router: Router,private http: HttpClient) {
    this.setTimeout();
    this.userInactive.subscribe(() =>{
      localStorage.clear();
      this.router.navigate(['customerportal&currentuser&sessiontimeout']);
    })
   }

  ngOnInit() {
    this.fortrue = false;
    this.dashboardloader=true;
    let source = 'DMI-Customer-Portal'
    let campign_number = localStorage.getItem('single_loan_name');
    this.userName1 = localStorage.getItem('user_basic_name');
    this.getUserInfo()
    let eventName = 'Foreclosure page'
    this.data.getEventName(this.phone,eventName,campign_number, source, sessionStorage.getItem('company_Name')).subscribe(res=>{ });
    this
      .data
      .getForclosure(localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'), this.loanId).subscribe(
        data => {
          this.fortrue=true;
          this.responsedata = data;
          this.dashboardloader=false;
          this.forcluserdata = this.responsedata.data;
          this.paidPayableAmount = this.forcluserdata[0].total_amount_to_be_paid;
          this.totalAmt  = this.paidPayableAmount.toString().replace(/^-+/, '');
          // console.log('all_data', this.forcluserdata)
          // this.loanName = this.forcluserdata.data[0].name;
          // console.log('1', this.loanName)
          if(this.forcluserdata.length==1){this.showRemarks=false;
            this.opName=this.forcluserdata[0].opName;
            this.creationDate=this.forcluserdata[0].calculation_as_on_dated;
            let eventName = 'Foreclosure-Success'
            this.data.getEventName(this.phone,eventName,campign_number, source, sessionStorage.getItem('company_Name')).subscribe(res=>{ });
            this.foreclosureValues.push(
              // {name:'Loan ID',value:this.forcluserdata[0].opName},
              {name:'Calculation as on Dated',value:this.forcluserdata[0].calculation_as_on_dated},
              {name:'Principal Outstanding',value:this.forcluserdata[0].principal_outstanding},
              {name:'Advance EMI Amount',value:this.forcluserdata[0].advance_emi},
              {name:'Net Principal as per Today',value:this.forcluserdata[0].net_principal_as_per_today},
              {name:'Arrears',value:this.forcluserdata[0].arrears},
              {name:'Interest Amount',value:this.forcluserdata[0].total_due_interest},
              {name:'Overdue Interest',value:this.forcluserdata[0].total_overdue_interest},
              {name:'Bounce Charges',value:this.forcluserdata[0].bounce_charges},
              {name:'Foreclosure Charges',value:this.forcluserdata[0].foreclosureCharges},
              {name:'GST 18%',value:this.forcluserdata[0].gstCharges},
              {name:'Net Amount To Be Paid Today',value:this.forcluserdata[0].total_amount_to_be_paid},
              {name:'Per Day Interest',value:this.forcluserdata[0].per_day_interest},
            )
            for(let i=0;i<this.foreclosureValues.length;i++){
              this.csvResp[i]=this.foreclosureValues[i];
            }
            this.csvResp.push({name:'Loan ID',value:this.forcluserdata[0].opName});
            this.disableBtn = false;
          }
          else{this.showRemarks=true;this.Remarks=this.forcluserdata.Remark1;
            let eventName = 'Foreclosure-Not Allowed'
            this.data.getEventName(this.phone,eventName,campign_number, source, sessionStorage.getItem('company_Name')).subscribe(res=>{ });
          }
        },
        err => { this.forcluserdata = [];
          let eventName = 'Foreclosure-Failed'
          this.data.getEventName(this.phone,eventName,campign_number, source, sessionStorage.getItem('company_Name')).subscribe(res=>{ });
         }
      );
     
      this.getPartnerName()
  }

  // downloadFile(){
  //   this.formula = 'foreclosureDetails';
  //   var options = {
  //     title : '',
  //     fieldSeparator : ',',
  //     quoteStrings : '"',
  //     decimalSeparator : '.',
  //     showLabels : true,
  //     showTitle : false,
  //     useBom : true
  //   }
  //   new Angular5Csv(this.csvResp,this.formula,options);
  // }

  public downloadFile() {
    let source = 'DMI-Customer-Portal'
    let eventName = 'Download Foreclosure';
    this.disableBtn = true;
    this.data.getEventName(this.phone,eventName,localStorage.getItem('single_loan_name'), source, sessionStorage.getItem('company_Name')).subscribe(res=>{ 
      this.disableBtn = false;
    });

    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save(this.opName+'-'+this.creationDate+'.pdf');
  }
  getUserInfo()
  {
    
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
    this.city = this.userBasicInfo.data[0].MailingCity;
    this.country = this.userBasicInfo.data[0].MailingCountry;
    this.postalCode = this.userBasicInfo.data[0].MailingPostalCode;
    this.state = this.userBasicInfo.data[0].MailingState;
    this.street = this.userBasicInfo.data[0].MailingStreet;
    this.billingAddress = this.city + ',' + this.country + ',' + this.postalCode + ',' + this.state + ',' + this.street;
    this.userName = this.userBasicInfo.data[0].Name;
    this.email = this.userBasicInfo.data[0].Email;
    this.acHolderName = this.userBasicInfo.data[0].Name;
    this.loanDetails = JSON.parse(localStorage.getItem('loan_details')) || [];

    if(this.userBasicInfo.data[0].MobilePhone==null || this.userBasicInfo.data[0].MobilePhone=='' || this.userBasicInfo.data[0].MobilePhone=='null')
    {this.phoneNo = this.userBasicInfo.data[0].Phone;}
    else 
    {this.phoneNo = this.userBasicInfo.data[0].MobilePhone;}

  }
  getPartnerName()
  {
    this.data.getChannelPartner(localStorage.getItem('dmi_phone')).subscribe(res=>{
      this.channelName=res;
      this.channelPartnerName=this.channelName.data;
    });
  }



  payAmountNow() {
    
    // Start event tracking
    this.paynowDisable = true;
    let eventName = 'Pay Loan EMI Amount'
    this.phone = localStorage.getItem('dmi_phone');
    let campign_number = this.loanName;
    let source = 'DMI-Customer-Portal';
    let method = 'Payment';
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    if(this.channelName!=''){
      this.data.getEventName(this.phone, eventName, campign_number, source,sessionStorage.getItem('company_Name')).subscribe(res => {
      })
    }
    // end

    // this.paidPayableAmount = this.forcluserdata[0].total_amount_to_be_paid;
    // this.totalAmt  = this.paidPayableAmount.toString().replace(/[^A-Za-z0-9]+/g,"");
     let amount = Math.trunc(this.totalAmt);
  // console.log(amount)
    this.data.getPayNow(this.phone, this.userName, this.loanName, amount).subscribe(res => {
      this.paynowDisable = false;
      this.payNowData = res
     // console.log(this.payNowData)
      this.payNowcustomerId = this.payNowData.data.customerid.id;
      this.payNoworderId = this.payNowData.data.orderid.id;
      var payNowOptions = {
        "key": "rzp_live_yYLo9BAVCiDsOX",
        "currency": "INR",
        "name": this.loanName,
        "description": "Pay your emi",
        "image": "https://los.dmifinance.in/assets/images/logo.svg",
        "order_id": this.payNoworderId,//Order ID is generated as Orders API has been implemented. Refer the Checkout form table given below
        "handler":(response)=> {
          this.display2 = 'block';
          this.data.getpaymentRecords(this.phone,this.loanName,amount,source,method,this.payNowcustomerId,this.payNoworderId,this.userName,this.email).subscribe(res=>{
            if(res)
            {this.data.foreclosurePayInfo(this.phone, this.loanName, amount, 'null' ).subscribe(res => {} )}
            // alert('Saved payment record successfully.')
          })
        },
        "prefill": {
          "email": this.email,
          "contact": this.phone
        },
        "notes": {
          "opportunityName": this.loanName,
          "senderId": "DMI",
          "opportunityID ": this.loanId,
          "billingAddress": this.billingAddress,
          "customerName": this.userName1
        },
        "theme": {
          "color": "#F37254"
        }
      };
      var rzp1 = new Razorpay(payNowOptions);
      rzp1.open();
      if (rzp1.open()) {
        this.payNowModel = 'none';
      //  this.payNowForm.reset();
      }
    })
  }




  setTimeout(){
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 900000);
  }

  @HostListener('window:mousemove') refreshUserState(){
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  ngOnDestroy(){ 
    clearTimeout(this.userActivity);
  }

}
