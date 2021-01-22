import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/data.service';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-tickets',
  templateUrl: './create-tickets.component.html',
  styleUrls: ['./create-tickets.component.scss']
})
export class CreateTicketsComponent implements OnInit {
  userActivity;
  userInactive: Subject<any> = new Subject();
  uploadtktimage = '';
  uploadtktimagewrite: any = '';
  tktimgset: boolean = false;
  remarkErr: any;
  remarkErrwrite: any;
  paymentDerr: any;
  transactionRefNoerr: any;
  amtPaidErr: any;
  emailIdErr: any;
  subjectErr: any;
  subjectErrwrite: any;
  imagePath: any;
  loanDetail: any;
  paymentDate: string = '';
  loanNane: string = '';
  loanNanewrite: string = '';
  transactionRefNo: string = '';
  amtPaid: string = '';
  emailId: string = '';
  remarks: string = '';
  remarkswrite: string = '';
  tktResData: any;
  statusData: string = 'Open';
  origin: string = 'Customer Portal';
  priority: string = 'Medium';
  division: string = 'Retail';
  ticketType: string = 'Complaint';
  ticketSubType: string = 'EMI Related Complaint';
  contact_info: any;
  userBasicInfo: any;
  userPhone: any;
  subject: string = '';
  subjectwrite: string = '';
  other: any;
  samsungUI:boolean=false;
  createTktSection: boolean = false;
  notallowedcreateTkt: boolean = false;
  paymentnotreflectinsection: boolean = false;
  otherSection: boolean = true;
  display = 'none';
  display1 = 'none';
  fileSizeExceedErr: any;
  disableDate: any;
  loanNameErr: any;
  loanNameErrwrite: any;
  attachmentReq: string = "";
  attachmentReqwrite: string = '';
  campign_number: any;
  eventName: any;
  issubmitTkt: boolean = false;
  tktcaseno:any;

  filetoUpload : Array<File> = [];
  filetoUploadWrite : Array<File> = [];

  fileName:string='Upload File';
  fileNameWrite:string='Upload File';

  attachFile : any = 'assets/attachment-icon.svg';
  extension : any;
  attachFileWrite : any = 'assets/attachment-icon.svg';
  extensionWrite : any;
  issidenaav: boolean = false;
  showloader:boolean=false;
  showAlert:boolean=false;
  userName1:any;
  company_name:any='';
  channelName:any='';
  channelPartnerName:any='';
  selectionType:any='';
  samsungSubject:any='';
  selectedLoan:any='';
  selectionTypeArray:any=[{name:'Payment made but not reflecting',Id:4},{name:'Write to Us',Id:5}];

   // UAT Url
  //  baseurl = "https://dmi.vistaconnect.com/dmi-clubbed-backend/api/"

   // production Url
   baseurl = "https://los.dmifinance.in/los/api/"

  constructor(public domSanatize: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private router: Router, private config: NgbDatepickerConfig,private http : HttpClient) { 
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
    });
    this.userName1 = localStorage.getItem('user_basic_name')

    if(this.router.url === '/createtickets'){
      this.issidenaav = true;
    }

    let phone = localStorage.getItem('dmi_phone')
    if (localStorage.getItem('single_loan_name')) {
      this.campign_number = localStorage.getItem('single_loan_name');
      this.company_name=sessionStorage.getItem('company_Name')
      this.eventName = 'Service ticket creation From ' + localStorage.getItem('single_loan_name')
    } else {
      this.campign_number = 'Not Available';
      this.company_name=this.channelPartnerName
      this.eventName = 'Service ticket creation For Search Term "from Help Center"'
    }
    let source = 'DMI-Customer-Portal';
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    this.data.getEventName(phone, this.eventName, this.campign_number, source,this.company_name).subscribe(res => {
    });
    const current = new Date();
    this.disableDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate() - 3
    };
    if (this.other) {
      this.ticketType = '';
      this.ticketSubType = '';
    }
    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
    this.userPhone = this.userBasicInfo.data[0].MobilePhone;
    this.contact_info = 'Existing Contact';
    this.emailId = this.userBasicInfo.data[0].Email;
    this.loanNane = this.loanDetail[0].Id;
    this.loanNanewrite = this.loanDetail[0].Id;
    this.selectedLoanChange(this.loanNanewrite);
  }

  notAllowedToCreateTkt() {
    let phone = localStorage.getItem('dmi_phone')
    if (localStorage.getItem('single_loan_name')) {
      this.campign_number = localStorage.getItem('single_loan_name');
      this.company_name=sessionStorage.getItem('company_Name')
      this.eventName = 'Selected "Yes, I have recently made the payment"' + localStorage.getItem('single_loan_name');
    } else {
      this.campign_number = 'Not Available';
      this.company_name=this.channelPartnerName;
      this.eventName = 'Selected "Yes, I have recently made the payment "'
    }
    let source = 'DMI-Customer-Portal';
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    this.data.getEventName(phone, this.eventName, this.campign_number, source,this.company_name).subscribe(res => {
    });

    this.createTktSection = false;
    this.display = 'block';
    // alert('Payment is made within the last 3 working days, your payment will be updated soon in our records');
    // this.router.navigate(['helpcenter'])
  }

  createTktSec() {

    let phone = localStorage.getItem('dmi_phone')
    if (localStorage.getItem('single_loan_name')) {
      this.campign_number = localStorage.getItem('single_loan_name');
      this.company_name=sessionStorage.getItem('company_Name')
      this.eventName = 'Selected "No, its has been more than 3 working days now"' + localStorage.getItem('single_loan_name');
    } else {
      this.campign_number = 'Not Available';
      this.company_name=this.channelPartnerName;
      this.eventName = 'Selected "No, its has been more than 3 working days now"'
    }
    let source = 'DMI-Customer-Portal';
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    this.data.getEventName(phone, this.eventName, this.campign_number, source,this.company_name).subscribe(res => {
    })

    this.createTktSection = true;
    this.samsungUI=false;
    this.notallowedcreateTkt = false;
  }

  getProfilePic(element) {
    this.filetoUpload = element.target.files;
    if(this.filetoUpload!=[])
    {
      this.attachmentReqwrite='';
      this.fileName = this.filetoUpload[0].name;
      this.extension = this.fileName.split('.');
      if(this.filetoUpload[0].size > 5300000){
        this.fileSizeExceedErr = "Maximum size upto 5MB Allowed";
        return;
      }
      else if(this.extension[1] == 'pdf'){
        this.attachFile = 'assets/pdf-icon.jpeg';
      }
      else if(this.extension[1] !== 'jpeg' && this.extension[1] !== 'jpg' && this.extension[1] !== 'png' && this.extension[1] !== 'pdf'){
        this.fileName = "Please attach the allowed file format.";
        this.attachFile = 'assets/alert.svg';
      }
      else{
        // this.attachFile = 'assets/letter.svg';
        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(this.filetoUpload[0]);
        fileReader.onload = (event:Event) => 
        { this.attachFile = fileReader.result; }
      }
    }
  }
  
  getProfilePicWrite(element) {
    this.fileSizeExceedErr = '';
    this.filetoUploadWrite = element.target.files;
    if(this.filetoUploadWrite!=[])
    {
      this.fileNameWrite = this.filetoUploadWrite[0].name;
      this.extensionWrite = this.fileNameWrite.split('.');
      if(this.filetoUploadWrite[0].size > 5300000){
        this.fileSizeExceedErr = "Maximum size upto 5MB Allowed";
        return;
      }
      else if(this.extensionWrite[1] == 'pdf'){
        this.attachFileWrite = 'assets/pdf-icon.jpeg';
      }
      else if(this.extensionWrite[1] !== 'jpeg' && this.extensionWrite[1] !== 'jpg' && this.extensionWrite[1] !== 'png' && this.extensionWrite[1] !== 'pdf'){
        this.fileNameWrite = "Please attach the allowed file format.";
        this.attachFileWrite = 'assets/alert.svg';
      }
      else{
        // this.attachFile = 'assets/letter.svg';
        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(this.filetoUploadWrite[0]);
        fileReader.onload = (event:Event) => 
        { this.attachFileWrite = fileReader.result; }
      }
    }
  }

  ifpaymentnotreflecting() {
    let phone = localStorage.getItem('dmi_phone')
    if (localStorage.getItem('single_loan_name')) {
      this.campign_number = localStorage.getItem('single_loan_name');
      this.company_name=sessionStorage.getItem('company_Name')
      this.eventName = 'Selected "Payment made but not reflecting"'
    } else {
      this.campign_number = 'Not Available';
      this.company_name=this.channelPartnerName;
      this.eventName = 'Selected "Payment made but not reflecting"'
    }
    let source = 'DMI-Customer-Portal';
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    this.data.getEventName(phone, this.eventName, this.campign_number, source,this.company_name).subscribe(res => {
    })

    this.paymentnotreflectinsection = true;
    this.createTktSection = false;
    this.otherSection = false;
  }

  createothertkt() {
    this.paymentnotreflectinsection = false;
    this.otherSection = true;
  }

  createTicketPayment()
  {
    let validateEmail = this.validateEmail(this.emailId);
    let dateFormat = this.paymentDate['day'] + '-'+ this.paymentDate['month'] + '-'+ this.paymentDate['year'];
    let phone = localStorage.getItem('dmi_phone')
    if (localStorage.getItem('single_loan_name')) {
      this.campign_number = localStorage.getItem('single_loan_name');
      this.company_name=sessionStorage.getItem('company_Name')
      this.eventName = 'Made a "Submit" action to create a service ticket request for Loan Account' + localStorage.getItem('single_loan_name');
    } else {
      this.campign_number = 'Not Available';
      this.company_name=this.channelPartnerName;
      this.eventName = 'Made a "Submit" action to create a service ticket request'
    }
    let source = 'DMI-Customer-Portal';
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    this.data.getEventName(phone, this.eventName, this.campign_number, source,this.company_name).subscribe(res => {
    })
    if (this.loanNanewrite == "") {
      this.loanNameErr = 'Loan Name is Required'
    }
    else if (this.emailId == "") {
      this.emailIdErr = 'Email ID is required'
    } else if(validateEmail==false){
      this.emailIdErr = 'Please enter valid email'
    } else if (this.subject == "") {
      this.subjectErr = 'Subject is required'
    }else if (this.remarks == "") {
      this.remarkErr = 'Remark is required'
    }else if (this.filetoUpload.length == 0) {
      this.attachmentReqwrite = 'Please attach the payment proof.'
    }
    else {  
      if(this.selectionType==4||this.selectionType==5){
        this.issubmitTkt = true;
        let inputdate = this.paymentDate;
        let currentDate = new Date();
        if (new Date(inputdate) <= currentDate || new Date(inputdate) >= currentDate) {
          this.display = 'block';
        }
        else if (this.paymentDate == "") {
          this.paymentDerr = 'Date of Transaction is required'
        }else if (this.transactionRefNo == "") {
          this.transactionRefNoerr = 'Transaction Reference Number is required'
        } else if (this.amtPaid == "") {
          this.amtPaidErr = 'Amount Paid is required'
        }
        else{
          this.showloader=true;
          let formData = new FormData();
          for(let i=0;i<this.filetoUpload.length;i++)
          {
            formData.append("Status",this.statusData);
            formData.append("Origin",this.origin);
            formData.append("Type",this.ticketType);
            formData.append("Sub_Type__c",this.ticketSubType);
            formData.append("category", "Payment Not Updated");
            formData.append("Priority",this.priority);
            formData.append("Associated_Loan__c",this.loanNanewrite);
            formData.append("Contact_Info__c",this.contact_info);
            formData.append("subject",this.subject);
            formData.append("Description",this.remarks);
            formData.append("Division__c",this.division);
            formData.append("accesstoken",localStorage.getItem('dmi_token'));
            formData.append("url",localStorage.getItem('dmi_instance_url'));
            formData.append("caller_phone__c",localStorage.getItem('dmi_phone'));
            formData.append("attachment",this.filetoUpload[i],this.filetoUpload[i].name);
            formData.append("paid_amount",this.amtPaid);
            formData.append("transaction_ref_no",this.transactionRefNo);
            formData.append("payment_date",dateFormat);
          }

          this.http.post(this.baseurl+'createticketpayment', formData).subscribe((response) =>
          {
            this.tktResData = response;
            if(response){this.showloader=false;}
            this.tktcaseno = this.tktResData.data[0].CaseNumber
            this.issubmitTkt = false;
            let phone = localStorage.getItem('dmi_phone')
            if (localStorage.getItem('single_loan_name')) {
              this.campign_number = localStorage.getItem('single_loan_name');
              this.company_name=sessionStorage.getItem('company_Name')
              this.eventName = 'Created service ticket request id : ' + this.tktResData.data[0].CaseNumber
            } else {
              this.campign_number = 'Not Available';
              this.company_name=this.channelPartnerName;202
              this.eventName = 'Created service ticket request id : ' + this.tktResData.data[0].CaseNumber
            }
            let source = 'DMI-Customer-Portal';
            this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
            this.data.getEventName(phone, this.eventName, this.campign_number, source,this.company_name).subscribe(res => {
            })
            this.display1 = 'block';
            // alert('Your request has been received successfully.' + '\n' + 'Your Ticket Id is:' + '  ' + this.tktResData.data[0].CaseNumber)
            // this.router.navigate(['helpcenter']);
          });
        }
      }

      if(this.selectionType==1||this.selectionType==2||this.selectionType==3){
        if(this.selectionType==1){
          if (this.paymentDate == "") {
            this.paymentDerr = 'Date of Transaction is required'
          }else if (this.transactionRefNo == "") {
            this.transactionRefNoerr = 'Transaction Reference Number is required'
          } else if (this.amtPaid == "") {
            this.amtPaidErr = 'Amount Paid is required'
          }
          else{
            this.showloader=true;
            let formDataSamsung = new FormData();
            for(let i=0;i<this.filetoUpload.length;i++)
            {
              formDataSamsung.append("type",this.selectionType);
              formDataSamsung.append("subject",this.samsungSubject);
              formDataSamsung.append("email",this.emailId);
              formDataSamsung.append("loan_name",this.selectedLoan);
              formDataSamsung.append("stage_name", this.loanDetail[0].StageName);
              formDataSamsung.append("description",this.remarks);
              formDataSamsung.append("payment_date",dateFormat);
              formDataSamsung.append("payment_refernce_number",this.transactionRefNo);
              formDataSamsung.append("amount",this.amtPaid);
              formDataSamsung.append("attachment",this.filetoUpload[i],this.filetoUpload[i].name);
            }

            this.http.post(this.baseurl +'freshdeskdb', formDataSamsung).subscribe((response) =>
            {
              this.tktResData = response;
              if(response){this.showloader=false;}
              this.showAlert=true;
              this.tktcaseno = this.tktResData.data[0].CaseNumber
              this.issubmitTkt = false;
              let phone = localStorage.getItem('dmi_phone')
              if (localStorage.getItem('single_loan_name')) {
                this.campign_number = localStorage.getItem('single_loan_name');
                this.company_name=sessionStorage.getItem('company_Name')
                this.eventName = 'Created service ticket request id : ' + this.tktResData.data[0].CaseNumber
              } else {
                this.campign_number = 'Not Available';
                this.company_name=this.channelPartnerName;
                this.eventName = 'Created service ticket request id : ' + this.tktResData.data[0].CaseNumber
              }
              let source = 'DMI-Customer-Portal';
              this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
              this.data.getEventName(phone, this.eventName, this.campign_number, source,this.company_name).subscribe(res => {
              })
              this.display1 = 'block';
            });
          }
        }

        if(this.selectionType==2 || this.selectionType==3){
          if(this.selectionType==3){this.samsungSubject=this.subject}
          let formDataSamsungOther = new FormData();
          this.showloader=true;
          for(let i=0;i<this.filetoUpload.length;i++)
          {
            formDataSamsungOther.append("type",this.selectionType);
            formDataSamsungOther.append("subject",this.samsungSubject);
            formDataSamsungOther.append("email",this.emailId);
            formDataSamsungOther.append("loan_name",this.selectedLoan);
            formDataSamsungOther.append("stage_name", this.loanDetail[0].StageName);
            formDataSamsungOther.append("description",this.remarks);
            formDataSamsungOther.append("attachment",this.filetoUpload[i],this.filetoUpload[i].name);
          }
          this.http.post(this.baseurl +'freshdeskdb', formDataSamsungOther).subscribe((response) =>
          {
            this.tktResData = response;
            if(response){this.showloader=false;}
            this.showAlert=true;
            this.tktcaseno = this.tktResData.data[0].CaseNumber
            this.issubmitTkt = false;
            let phone = localStorage.getItem('dmi_phone')
            if (localStorage.getItem('single_loan_name')) {
              this.campign_number = localStorage.getItem('single_loan_name');
              this.company_name=sessionStorage.getItem('company_Name');
              this.eventName = 'Created service ticket request id : ' + this.tktResData.data[0].CaseNumber;
            } else {
              this.campign_number = 'Not Available';
              this.company_name=this.channelPartnerName;
              this.eventName = 'Created service ticket request id : ' + this.tktResData.data[0].CaseNumber;
            }
            let source = 'DMI-Customer-Portal';
            this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
            this.data.getEventName(phone, this.eventName, this.campign_number, source,this.company_name).subscribe(res => {
            });
            this.display1 = 'block';
          });
        }        

        
      }
    }
  }

  createTicketWrite()
  {
    let phone = localStorage.getItem('dmi_phone')
    if (localStorage.getItem('single_loan_name')) {
      this.campign_number = localStorage.getItem('single_loan_name');
      this.company_name=sessionStorage.getItem('company_Name')
      this.eventName = 'Made a "Submit" action to create a service ticket request for Loan Account' + localStorage.getItem('single_loan_name');
    } else {
      this.campign_number = 'Not Available';
      this.company_name=this.channelPartnerName;
      this.eventName = 'Made a "Submit" action to create a service ticket request'
    }
    let source = 'DMI-Customer-Portal';
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
   
    if (this.loanNanewrite == "") {
      this.loanNameErrwrite = 'Loan Name is Required';
    }
    else if (this.subjectwrite == "") {
      this.subjectErrwrite = 'Subject is required'
    }
    else if (this.remarkswrite == "") {
      this.remarkErrwrite = 'Remark is required'
    }
    else
    {
      this.issubmitTkt = true;
      let formData = new FormData();
      if(this.filetoUploadWrite.length == 0){
        formData.append("Status",this.statusData);
        formData.append("Origin",this.origin);
        formData.append("Type",'');
        formData.append("Sub_Type__c",'');
        formData.append("category", "");
        formData.append("Priority",this.priority);
        formData.append("Associated_Loan__c",this.loanNanewrite);
        formData.append("Contact_Info__c",this.contact_info);
        formData.append("subject",this.subjectwrite);
        formData.append("Description",this.remarkswrite);
        formData.append("Division__c",this.division);
        formData.append("accesstoken",localStorage.getItem('dmi_token'));
        formData.append("url",localStorage.getItem('dmi_instance_url'));
        formData.append("caller_phone__c",localStorage.getItem('dmi_phone'));
        formData.append("attachment",'');
      }
      else{
        for(let i=0;i<this.filetoUploadWrite.length;i++)
        {
          formData.append("Status",this.statusData);
          formData.append("Origin",this.origin);
          formData.append("Type",'');
          formData.append("Sub_Type__c",'');
          formData.append("category", "");
          formData.append("Priority",this.priority);
          formData.append("Associated_Loan__c",this.loanNanewrite);
          formData.append("Contact_Info__c",this.contact_info);
          formData.append("subject",this.subjectwrite);
          formData.append("Description",this.remarkswrite);
          formData.append("Division__c",this.division);
          formData.append("accesstoken",localStorage.getItem('dmi_token'));
          formData.append("url",localStorage.getItem('dmi_instance_url'));
          formData.append("caller_phone__c",localStorage.getItem('dmi_phone'));
          formData.append("attachment",this.filetoUploadWrite[i],this.filetoUploadWrite[i].name);
        }
      }
      this.data.getEventName(phone, this.eventName, this.campign_number, source,this.company_name).subscribe(res => { });
      this.http.post(this.baseurl+'createticket', formData).subscribe((response) =>
      {
        this.tktResData = response;
        this.issubmitTkt = true;
        this.issubmitTkt = false;
        this.tktcaseno = this.tktResData.data[0].CaseNumber
        let phone = localStorage.getItem('dmi_phone')
        if (localStorage.getItem('single_loan_name')) {
          this.campign_number = localStorage.getItem('single_loan_name');
          this.company_name=sessionStorage.getItem('company_Name')
          this.eventName = 'Created service ticket request id : ' + this.tktResData.data[0].CaseNumber
        } else {
          this.campign_number = 'Not Available';
          this.company_name=this.channelPartnerName;
          this.eventName = 'Created service ticket request id : ' + this.tktResData.data[0].CaseNumber
        }
        let source = 'DMI-Customer-Portal';
        this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
        this.data.getEventName(phone, this.eventName, this.campign_number, source,this.company_name).subscribe(res => {
        })
        this.display1 = 'block';
        // alert('Your request has been received successfully.' + '\n' + 'Your Ticket Id is:' + '  ' + this.tktResData.data[0].CaseNumber)
        // this.router.navigate(['helpcenter']);
      });
    }
  }

  removeErr(){
    this.loanNameErr='';
    this.paymentDerr='';
    this.transactionRefNoerr='';
    this.amtPaidErr='';
    this.emailIdErr='';
    this.subjectErr='';
    this.remarkErr='';
    this.attachmentReqwrite='';
  }

  removeErrNumber(event){
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  removeErrWrite(){
    this.subjectErrwrite='';
    this.remarkErrwrite='';
  }

  dateChange(){
      this.paymentDerr = '';
  }

  selectedLoanChange(event){
    this.selectionTypeArray = [];
    for(let i=0;i<this.loanDetail.length;i++){
      if(event == this.loanDetail[i].Id){
        if(this.loanDetail[i].Pulled_Lead_Source_Name__c == 'Samsung'){
          this.selectedTypeChange(1);
          this.selectedLoan = this.loanDetail[i].name;
          this.createTktSection=true;this.samsungUI=true;this.otherSection=false;this.paymentnotreflectinsection=true;
          this.selectionTypeArray=[{name:'Payment done but Phone Locked',Id:1},{name:'Phone locked due to Technical Issue',Id:2},{name:'Others',Id:3}];
        }
        else{
          this.selectedTypeChange(4);
          this.selectionTypeArray=[{name:'Payment made but not reflecting',Id:4},{name:'Write to Us',Id:5}];
        }
      }
    }
    this.selectionType = this.selectionTypeArray[0].Id;
  }

  selectedTypeChange(event){
    if(event==1){this.samsungSubject="Payment not updated";this.subject="Payment not updated"}
    else if(event==2){this.samsungSubject="Phone locked due to technical issue";this.subject="Phone locked due to technical issue"}
    else if(event==3){this.subject=''}
    else if(event==4){this.ifpaymentnotreflecting()}
    else if(event==5){this.createothertkt()}
  }

  // createTicket() {
  //   if(this.loanNane == ""){
  //     this.loanNameErr = 'Loan Name is Required'
  //   }
  //   if (this.paymentDate == "") {
  //     this.paymentDerr = 'Date of Transaction is required'
  //   }if (this.transactionRefNo == "") {
  //     this.transactionRefNoerr = 'Transaction Reference Number is required'
  //   }if (this.amtPaid == "") {
  //     this.amtPaidErr = 'Amount Paid is required'
  //   }if (this.emailId == "") {
  //     this.emailIdErr = 'Email ID is required'
  //   }if (this.subject == "") {
  //     this.subjectErr = 'Subject is required'
  //   }
  //   if(this.uploadtktimage == ''){
  //     this.attachmentReq = 'Please attach the payment proof.'
  //   }
  //    if(this.remarks == "") {
  //     this.remarkErr = 'Remark is required'
  //   }else{
  //   let inputdate = this.paymentDate;
  //   let currentDate = new Date();
  //   if (new Date(inputdate) <= currentDate || new Date(inputdate) >= currentDate) {
  //     this.display = 'block';
  //     // alert('Please allows us 3 working days from the date of payments to update your records with us.')
  //   }
  //   let remark = {
  //     remark: this.remarks,
  //     payment_date: this.paymentDate,
  //     transaction_ref_no: this.transactionRefNo,
  //     paid_amount: this.amtPaid,
  //     email_id: this.emailId
  //   }
  //   this.data.createTicketReq(this.statusData, this.origin, this.ticketType, this.ticketSubType, this.priority, this.loanNane, this.contact_info, this.subject, this.remarks, this.division, localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'), this.userPhone, this.uploadtktimage).subscribe(res => {
  //     this.tktResData = res;
  //     alert('Your request has been received successfully.' + '\n' + 'Your Ticket Id is:' + '  ' + this.tktResData.data[0].CaseNumber)
  //     this.router.navigate(['helpcenter'])
  //   })
  // }
  // }

  getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  }

  dismisModel() {
    this.display = 'none'
    this.router.navigate(['helpcenter'])
  }

  ngOnDestroy(){ 
    clearTimeout(this.userActivity);
  }
}
