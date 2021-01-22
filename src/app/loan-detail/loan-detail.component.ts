declare var Razorpay: any;
import { Component, OnInit, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import {ShareDataService} from '../share-data.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.scss']
})
export class LoanDetailComponent implements OnInit {
  userActivity;
  displayModal:any='none';
  userInactive: Subject<any> = new Subject();
  userBasicInfo: any;
  loanDetails: any;
  loanId: any;
  isLoading: boolean;
  welcomedata: any;
  selectedId: any;
  SpecificLoanDetail: any;
  loanStatementData: any;
  specificLoanAmt: any;
  convertedLoanAmt: any;
  display = 'none';
  display1 = 'none';
  display2 = 'none';
  display3 = 'none';
  payNowModel = 'none';
  paymentMethod: any;
  accountType:any;
  isNetBanking: boolean = true;
  isDebit: boolean = false;
  enableBtn: boolean = false;
  netBanking: any = 'Net Banking';
  debitCard: any;
  selectedBankName: any;
  selectedBankName2: any;
  loanName: any;
  userName: any;
  email: any;
  phoneNo: any;
  orderId: any;
  customerId: any;
  createCO: any;
  forNetBankingAmt: any;
  accountNo: any;
  accountIFSC: any;
  acHolderName: any;
  requiredError: any;
  requiredError1: any;
  requiredError2: any;
  nachResponse: any;
  fourDigitIFSC: any;
  interval: any;
  timeLeft: number = 8;
  payableInput: boolean = true;
  otherInput: boolean = false;
  paidPayableAmount: any;
  otherAmount: any;
  payNowData: any;
  payNowcustomerId: any;
  payNoworderId: any;
  billingAddress: any;
  city: any;
  country: any;
  postalCode: any;
  state: any;
  street: any;
  nachCheckData: any;
  nachErrData: any;
  alreadyRegisNach: boolean;
  forNachRegis: boolean;
  loanNumber: any;
  payNowForm: FormGroup;
  principleAmt: number;
  dueAmt: number;
  PaidAmt: number;
  staticDueAmt:any;
  emitotalTenor:any;
  dueAmount:any;
  perc:any;
  uiPercentage:any;
  response : any;
  totalpaid : any;
  totalunpaid : any;
  totalemiamount : any;
  totalpaidemi : any;
  totalemi : any;
  totalpayableamount: any;
  ifTotalpayMount:any;
  loanNameValue : any;
  phone : any;
  localData:any;
  previous_amount:any;
  current_amount:any;
  current_month_due_date : any;
  status : any;
  date:any;
  payNow:boolean=false;
  register:boolean=false;
  payPrevious:boolean=false;
  payTotal:boolean=false;
  stageName:any;
  maturedCond:boolean;
  PaymentMethodOption = [{ name: "Net Banking" }, { name: "Debit Card" }];
  UserAccountType = [{name: "Savings",value:'savings'},{name: "Current",value:'current'}];
  lastPaidAmt:any;
  lastPaymentDate:any='';
  matureSum:any;
  incaseNoOpp:boolean = false;
  maturedcase:boolean = true;
  companyName:any='';
  dueDate:any='';
  modeofpayment:any;
  Accountid:any;
  presendat:any;
  maxAmount: any;
  amtToString: any;
  netPaymentC:any;
  gettokendata:any;
  getPPName:any;
  sendPPName:any;
  getPPAmount:any='';
  specificLoanAmt1:any;
  specificLoanAmt2:any;
  userName1:any;
  userNameForm:any;
  loanAmount:any="Loan Amount";
  loanDetail:any='';
  tokennew: any;
  channelName:any='';
  channelPartnerName:any='';
  eventsSubject : Subject<void> = new Subject<void>();
  // button disable 
  paynowdisable:boolean = false; loandetailnachdisable:boolean = false

  netbankingDropdown:any=[
    {key:'Andhra Bank',value:'ANDB'},
    {key:'Axis Bank',value:'UTIB'},
    {key:'Bank of Baroda',value:'BARB_R'},
    {key:'Bank of Maharashtra',value:'MAHB'},
    {key:'Canara Bank',value:'CNRB'},
    {key:'Central Bank of India',value:'CBIN'},
    {key:'City Union Bank',value:'CIUB'},
    {key:'Cosmos Co-operative Bank',value:'COSB'},
    {key:'Deutsche Bank',value:'DEUT'},
    {key:'Dhanalaxmi Bank',value:'DLXB'},
    {key:'Equitas Small Finance Bank',value:'ESFB'},
    {key:'Federal Bank',value:'FDRL'},
    {key:'HDFC Bank',value:'HDFC'},
    {key:'ICICI Bank',value:'ICIC'},
    {key:'IDBI Bank',value:'IBKL'},
    {key:'IDFC First Bank',value:'IDFB'},
    {key:'Indian Overseas Bank',value:'IOBA'},
    {key:'Indusind Bank',value:'INDB'},
    {key:'Kotak Mahindra Bank',value:'KKBK'},
    {key:'Karnataka Bank LTD',value:'KARB'},
    {key:'Oriental Bank of Commerce',value:'ORBC'},
    {key:'Paytm Payments Bank',value:'PYTM'},
    {key:'Punjab National Bank',value:'PUNB_R'},
    {key:'RBL Bank',value:'RATN'},
    {key:'Standard Charted Bank',value:'SCBL'},
    {key:'State Bank of India',value:'SBIN'},
    {key:'Tamilnadu Mercantile Bank',value:'TMBL'},
    {key:'Ujjivan Small Finance Bank LTD',value:'USFB'},
    {key:'United Bank of India',value:'UTBI'},
    // {key:'Yes Bank',value:'YESB'},
   ];

  debitDropdown:any=[
    {key:'Bank of Maharashtra',value:'MAHB'},
    {key:'Citi Bank',value:'CITI'},
    {key:'Deutsche Bank',value:'DEUT'},
    {key:'Equitas Small Finance Bank',value:'ESFB'},
    {key:'Federal Bank',value:'FDRL'},
    {key:'HDFC Bank',value:'HDFC'},
    {key:'ICICI Bank',value:'ICIC'},
    {key:'IDBI Bank',value:'IBKL'},
    {key:'IDFC First Bank',value:'IDFB'},
    {key:'Indusind Bank',value:'INDB'},
    {key:'Karnataka Bank LTD',value:'KARB'},
    {key:'Kotak Mahindra Bank',value:'KKBK'},
    {key:'Punjab National Bank',value:'PUNB_R'},
    {key:'RBL Bank',value:'RATN'},
    {key:'South Indian Bank',value:'SIBL'},
    {key:'State Bank of India',value:'SBIN'},
    {key:'Ujjivan Small Finance Bank LTD',value:'USFB'},
    {key:'United Bank of India',value:'UTBI'},
    // {key:'Yes Bank',value:'YESB'},
  ];
 
  constructor(private router: Router,
    private data: DataService,
    private formBuilder: FormBuilder,private service : ShareDataService ,private modalService:NgbModal) {
      this.setTimeout();
      this.userInactive.subscribe(()=>{
        localStorage.clear();
        this.router.navigate(['customerportal&currentuser&sessiontimeout'])
    });
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 1500000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
  
  ngOnInit(){
    this.data.getChannelPartner(localStorage.getItem('dmi_phone')).subscribe(res=>{
      this.channelName=res;
      this.channelPartnerName=this.channelName.data;
    });
    this.accountType = this.UserAccountType[0].name;
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    this.loanNameValue = this.service.getName();
    this.payNowForm = this.formBuilder.group({payableAmount: ['']});
     this.userName1 = localStorage.getItem('user_basic_name');
     this.userNameForm = this.userName1;
    
    this.data.getSpecificLoan(localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'), localStorage.getItem('specefic_loan_id')).subscribe(data => {
        this.SpecificLoanDetail = data;
        localStorage.setItem('principleAmt', this.SpecificLoanDetail.data[0].Original_Face__c);
        localStorage.setItem('dueMonth', this.SpecificLoanDetail.data[0].Date__c);
        localStorage.setItem('dueAmt', this.SpecificLoanDetail.data[0].Due);
        localStorage.setItem('specific_loan_detail', JSON.stringify(this.SpecificLoanDetail.data));
        this.paidPayableAmount = this.SpecificLoanDetail.data[0].EMI__c;
        this.dueAmount = this.SpecificLoanDetail.data[0].Due;
        this.emitotalTenor = this.SpecificLoanDetail.data[0].Loan_Tenor_in_Month__c;
        this.specificLoanAmt = this.SpecificLoanDetail.data[0].Original_Face__c;
        this.specificLoanAmt1 = this.SpecificLoanDetail.data[0].Original_Face__c;
        this.netPaymentC = this.SpecificLoanDetail.data[0].Net_Payment__c;
        this.convertedLoanAmt = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.specificLoanAmt);
        this.loanId = this.SpecificLoanDetail.data[0].Id;
        this.loanName = this.SpecificLoanDetail.data[0].name;
        this.stageName = this.SpecificLoanDetail.data[0].StageName;
        this.companyName = this.SpecificLoanDetail.data[0].Pulled_Lead_Source_Name__c;
        this.Accountid = this.SpecificLoanDetail.data[0].Accountid;
        this.getPPName = this.SpecificLoanDetail.data[0].parent_opp;
        this.getPPAmount = this.SpecificLoanDetail.data[0].pp_amount;
        this.dueDate = localStorage.getItem('dueMonth');
        let nachStatus = this.SpecificLoanDetail.data[0].Nach.Status__c;
        if(nachStatus=='SUCCESS' || nachStatus=='Success' || nachStatus=='success' 
        || nachStatus=='ACCEPTED' || nachStatus=='Accepted' || nachStatus=="Active" || nachStatus=="Activate" ||
        nachStatus=='Verified' || nachStatus=='Confirmed' || nachStatus=="ACTIVATE" || nachStatus== "ACTIVE")
        {
          this.modeofpayment=true;
          this.payNow=true;
          this.register=false;
        }
        else {
          this.modeofpayment=false;
          this.payNow=true;this.register=true;
        }

        if(this.stageName == 'Matured'){
          this.maturedcase = false;
          this.maturedCond=false;
        }else{
          this.maturedCond=true;
        }
        if(this.companyName == 'ZestMoney' || this.companyName == 'Redcarpet' || this.companyName == 'Slicepay'){
          this.register=false;
        }
        if(this.companyName=='Samsung')
        {this.loanAmount = 'EMI Amount';this.specificLoanAmt=this.SpecificLoanDetail.data[0].Net_Payment__c;}

        this.service.setLoanId(this.loanId);
        this.service.setLoanName(this.loanName);
        this.principleAmt = this.specificLoanAmt
        this.dueAmt = this.dueAmount
        this.PaidAmt = this.principleAmt-this.dueAmt
        let principal = this.principleAmt
        let paid = this.PaidAmt
         this.perc = "";
        if (isNaN(principal) || isNaN(paid)) {
          this.perc = " ";
        } else {
          this.perc = ((paid / principal) * 100).toFixed(0);
          this.uiPercentage = this.perc - 2.4
        }
        let progressStatus = document.getElementById('dynamicProgress');
        let statusIcon = document.getElementById('statusIcon');
        progressStatus.style.width = this.perc + '%';
        statusIcon.style.left = this.uiPercentage +'%';
      },
      err => { this.SpecificLoanDetail = [] }
    );

    this.paymentMethod = 'Net Banking'
    this.selectedBankName = 'Andhra Bank'
    this.fourDigitIFSC = 'ANDB';

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

    this.data.getChechNach(localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'), localStorage.getItem('single_loan_name')).subscribe(res => {
      this.nachCheckData = res;
      this.alreadyRegisNach = true;
      this.forNachRegis = false;
      this.date = this.nachCheckData.data.Current_Date;
      this.status = this.nachCheckData.data.Status__c;
      let dateCondition = this.dueDate - 3;

      // if(this.status=='SUCCESS' || this.status=='Success' || this.status=='success' 
      // || this.status=='ACCEPTED' || this.status=='Accepted' || this.status=="Active" || this.status=="Activate" ||
      // this.status=='Verified' || this.status=='Confirmed' || this.status=="ACTIVATE" || this.status == "ACTIVE")
      // {
      //   this.modeofpayment=true;
      //   this.payNow=true;
      //   this.register=false;
      // }
      // else {
      //   this.modeofpayment=false;
      //   this.payNow=true;this.register=true;
      // }
    },
      err => {
        this.nachErrData = err;
        this.forNachRegis = true;
        this.alreadyRegisNach = false;
      })
    if (this.netBanking == 'Net Banking') {
      this.forNetBankingAmt = '0';
    } else {
      this.forNetBankingAmt = '1';
    }
    this.data.getDetailsLoan(localStorage.getItem('dmi_token'),localStorage.getItem('dmi_instance_url'),localStorage.getItem('single_loan_name')).subscribe(res=>
    {
      this.response = res;
      this.lastPaidAmt = this.response.data[0].last_paid_amount
      this.lastPaymentDate = this.response.data[0].last_piad_date;

      if(this.stageName !== 'Matured'){
        this.totalpaid = this.response.data[0].totalpaidemiamount;
      }
      
      this.totalunpaid = this.response.data[0].totalunpaidemiamount;
      this.totalemi = this.response.data[0].totalemi;
      this.totalpaidemi = this.response.data[0].totalpaidemi;
      this.totalemiamount = this.response.data[0].totalemiamount;
      this.totalpayableamount = this.response.data[0].totalpayableamount;
      this.ifTotalpayMount = this.response.data[0].totalpayableamount = 0 || this.response.data[0].totalpayableamount <= 1;
      this.previous_amount = this.response.data[0].previous_outstanding_amount;
      this.current_amount = this.response.data[0].current_month_amount;
      this.current_month_due_date = this.response.data[0].current_month_due_date;

      if(this.previous_amount=='0.00'&&this.current_amount=='0.00'){
        this.payPrevious=false;this.payTotal=false;
      }
      else if(this.previous_amount!=='0.00'&&this.current_amount=='0.00'){
        this.payPrevious=true;this.payTotal=false;
      }
      else if(this.previous_amount=='0.00'&&this.current_amount!=='0.00'){
        this.payPrevious=false;this.payTotal=true;
      }
      else if(this.previous_amount!=='0.00'&&this.current_amount!=='0.00'){
        this.payPrevious=true;this.payTotal=true;
      }
    });

    this.data.getmaturesumvalue(localStorage.getItem('dmi_token'),localStorage.getItem('dmi_instance_url'),localStorage.getItem('single_loan_name')).subscribe(res=>{
      this.matureSum = res;
      if(this.stageName == 'Matured'){
        this.totalpaid = this.matureSum.data[0].expr0;
      }
    })
  }

  selectedMethod(event) {
    this.netBanking = event;
    this.debitCard = event
    if (event == "Net Banking") {
      this.forNetBankingAmt = '0';
      this.paymentMethod = "Net Banking"
      this.selectedBankName = 'Andhra Bank'
      this.fourDigitIFSC = 'ANDB'
      this.isNetBanking = true;
      this.isDebit = false;
    } if (event == "Debit Card") {
      this.forNetBankingAmt = '1';
      this.paymentMethod = "Debit Card"
      this.selectedBankName = 'Bank of Maharashtra'
      this.fourDigitIFSC = 'MAHB'
      this.isDebit = true;
      this.isNetBanking = false;
    }
  }

  selectedAccountType(event){
    this.accountType = event;
  }

  openModal(){
    this.modalService.dismissAll();
  }

  selectedBank(event) {
    this.selectedBankName = event;
    for(let i=0;i<this.netbankingDropdown.length;i++){
      if(this.selectedBankName == this.netbankingDropdown[i].key){
        this.fourDigitIFSC = this.netbankingDropdown[i].value;
      }
    }
    
  }

  removeErr() {
    this.requiredError = '';
    this.requiredError1 = '';
    this.requiredError2 = '';
  }

  openNACHmodel() {
    this.display = 'block';
    this.accountNo = null;
    this.accountIFSC = null;
    this.acHolderName = null;
  }

  closeModalDialog() {
    this.display = 'none';
    this.payNowModel = 'none';
    this.payNowForm.reset();
  }

  payableAmt() {
    this.payableInput = true;
    this.otherInput = false;
  }

  otherAmt() {
    this.payableInput = false;
    this.otherInput = true;
  }
  
  get payFormData() { return this.payNowForm.controls; }

  payAmountNow() {
    this.paynowdisable = true
    // Start event tracking
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

    //this.paidPayableAmount = this.payFormData.payableAmount.value;
    let totalAmt  = this.totalpayableamount.replace(/\,/g,"");
    let amount = Math.trunc(totalAmt);

    this.data.getPayNow(this.phone, this.userName, this.loanName, amount).subscribe(res => {
      this.payNowData = res
      this.paynowdisable = false
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
        this.payNowForm.reset();
      }
    })
  }

  payPreviousAmountNow(){
    let eventName = 'Pay Loan EMI Amount'
    this.phone = localStorage.getItem('dmi_phone')
    let campign_number = this.loanName;
    let source = 'DMI-Customer-Portal';
    let method = 'Payment';
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    if(this.channelName!=''){
      this.data.getEventName(this.phone, eventName, campign_number, source,sessionStorage.getItem('company_Name')).subscribe(res => {
      })
    }
    // end

    //this.paidPayableAmount = this.payFormData.payableAmount.value;
    let a  = this.previous_amount.replace(/\,/g,"");
    let amount = Math.trunc(a);
    this.data.getPayNow(this.phone, this.userName, this.loanName, amount).subscribe(res => {
      this.payNowData = res
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
          // alert(response.razorpay_payment_id);
          this.data.getpaymentRecords(this.phone,this.loanName,amount,source,method,this.payNowcustomerId, this.payNoworderId,this.userName,this.email).subscribe(res=>{
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
        this.payNowForm.reset();
      }
    })
  }

  nachRegistration(cancelEvent,successModal) {
     //Start event tracking
     this.displayModal='none';
     let eventName = 'NACH Registration';
     let phone = localStorage.getItem('dmi_phone');
     let campign_number = this.loanName;
     let source = 'DMI-Customer-Portal';
     this.presendat ='2020-01-05';

     if(this.getPPName == 'null')
     {this.sendPPName = this.loanName}
     else if(this.getPPName != 'null')
     {this.sendPPName = this.getPPName;}

     if(this.getPPAmount == 'null'){
      this.specificLoanAmt2 = this.specificLoanAmt1;
    }
    else if(this.getPPAmount != 'null'){
      this.specificLoanAmt2 = this.getPPAmount;
    }

    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
     if(this.channelName!=''){
      this.data.getEventName(phone, eventName, campign_number, source,sessionStorage.getItem('company_Name')).subscribe(res => {
      })
     }
     // end
      if (this.accountNo === null || this.accountNo == "") {
        this.requiredError = 'Account Number Required.'
        return;
      } else if (this.accountIFSC === null || this.accountIFSC == "") {
        this.requiredError1 = 'IFSC Code Required.'
        return;
      } else if (this.userName1 === null || this.userName1 == "") {
        this.requiredError2 = 'Account Holder Name Required.'
        return;
      }
      else {
        if (this.paymentMethod == 'Net Banking') {
          this.paymentMethod = "Net"
        }
        if (this.paymentMethod == 'Debit Card') {
          this.paymentMethod = "Debit"
        }
      if(this.companyName=='Samsung')
      {
        this.loanAmount = 'EMI Amount'
        if (this.netPaymentC >= '100000') {
          this.maxAmount = "9999900";
          this.amtToString = this.maxAmount.toString();
        }
        else {
          this.maxAmount = this.netPaymentC * 100;
          this.amtToString = this.maxAmount.toString();
        } 
      }
    else {
      if (this.specificLoanAmt2 >= '100000') {
        this.maxAmount = "9999900";
        this.amtToString = this.maxAmount.toString();
      }
      else {
        
        this.maxAmount = this.specificLoanAmt2 * 100;
        this.amtToString = this.maxAmount.toString();
      }
    }
      
      // this.fourDigitIFSC = this.accountIFSC.substring(0, 4)

      let account_type:any;
      for(let i=0;i<this.UserAccountType.length;i++){
        if(this.accountType == this.UserAccountType[i].name){
          account_type = this.UserAccountType[i].value;
        }
      }

      if(this.accountIFSC.length<11){
        alert('The ifsc code must be 11 characters.')
        return;
      }

      this.data.getCreateCo(localStorage.getItem('dmi_phone'), this.email, this.userName1, this.forNetBankingAmt, this.paymentMethod, this.sendPPName,
        this.accountNo , account_type , this.accountIFSC).subscribe(res => {
        this.createCO = res;
        this.customerId = this.createCO.data.customerid.id;
        localStorage.setItem('customerId', this.customerId)
        this.orderId = this.createCO.data.orderid.id;

        if (this.paymentMethod == "Net") {
          var options = {
            // test rzp_test_OPN0bKrCFhMKNM
            // live rzp_live_TwQM7OcRLsWstp
            "key": "rzp_live_TwQM7OcRLsWstp",
            "amount": "0",
            "name": this.userName,
            "order_id": this.orderId,
            "customer_id": this.customerId,
            "currency": "INR",
            "receipt": this.sendPPName,
            "description": "",
            "auth_type": "netbanking",
            "recurring": "1",
            "recurring_token.max_amount": this.amtToString,
            "recurring_token.expire_by": "31-12-2035",
            "prefill": {
              "name": this.userName1,
              "email": this.email,
              "contact": this.phoneNo,
              "bank": this.fourDigitIFSC,
              "method": "emandate",
              "bank_account[name]": this.userName1,
              "bank_account[account_number]": this.accountNo,
              "bank_account[ifsc]": this.accountIFSC,
            },
            "notes": {  "address":  "cp",
              "PartnerName": this.companyName,
              "BankName": this.selectedBankName,
              "OppName" : this.sendPPName
            },
            "handler": (response) => {
              this.data.getTokenData(
                response.razorpay_payment_id,
              ).subscribe(res => {
               this.gettokendata = res
               this.tokennew = this.gettokendata.data;
              this.data.getNachRegistration(localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'), localStorage.getItem('dmi_phone'),
                this.sendPPName, this.email, this.accountNo, this.accountIFSC, this.fourDigitIFSC, this.paymentMethod, this.specificLoanAmt2,
                this.userName, this.customerId, response.razorpay_order_id, response.razorpay_signature, response.razorpay_payment_id,this.Accountid,this.companyName,this.presendat,this.tokennew,account_type).subscribe(res => {
                  this.nachResponse = res;
                  this.closeModal();
                  let sourcename = 'DMI-Customer-Portal'
                  this.data.saveNACHrecords(phone,this.loanName,response.razorpay_payment_id,this.paymentMethod,sourcename,this.sendPPName).subscribe(res=>{
                  })
                  let eventName="NACH Registration-Success"
                  this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
                  if(this.channelName!=''){
                    this.data.getEventName(phone, eventName, campign_number, source,this.channelPartnerName).subscribe(res => {
                    })
                  }
                  // this.display1 = 'block';
                  this.modalService.dismissAll();
                  this.modalService.open(successModal);
                  //alert('NACH Registration Successfully.');
                })
              })
            },
            "modal": {
              "ondismiss":  ()=> {
                this.modalService.dismissAll();
                this.modalService.open(cancelEvent);
                let eventName="NACH Registration-Fail"
                this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
                  if(this.channelName!=''){
                    this.data.getEventName(phone, eventName, campign_number, source,this.channelPartnerName).subscribe(res => {
                    })
                  }
                // window.location.replace("https://dmi.vistaconnect.com/eMandate/?key=" + localStorage.getItem('loginKey'));
              }
            },
           
            "theme": { "color": "#F37254" }
          };
          

        } else {
          options = {
            "key": "rzp_live_TwQM7OcRLsWstp",
            "amount": "1",
            "name": this.userName1,
            "order_id": this.orderId,
            "customer_id": this.customerId,
            "currency": "INR",
            "receipt": this.sendPPName,
            "description": "",
            "auth_type": "",
            "recurring": "1",
            "recurring_token.max_amount": " ",
            "recurring_token.expire_by": "31-12-2035",
            "prefill": {
              "name": this.userName,
              "email": this.email,
              "contact": this.phoneNo,
              "bank": " ",
              "method": "",
              "bank_account[name]": this.userName1,
              "bank_account[account_number]": this.accountNo,
              "bank_account[ifsc]": this.accountIFSC,
            },
              "notes": {  "address":  "cp",
              "PartnerName": this.companyName,
              "BankName": this.selectedBankName,
              "OppName" : this.sendPPName
             
            },
            "handler": (response) => {
              this.data.getTokenData(
                response.razorpay_payment_id,
              ).subscribe(res => {
               this.gettokendata = res;
               this.tokennew = this.gettokendata.data;
               let accnumdebit  = "null";
               let ifscdebit ="null";
              this.data.getNachRegistration(localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'), localStorage.getItem('dmi_phone'),
                this.sendPPName, this.email, accnumdebit, ifscdebit, this.fourDigitIFSC, this.paymentMethod, this.specificLoanAmt2,
                this.userName, this.customerId, response.razorpay_order_id, response.razorpay_signature, response.razorpay_payment_id,this.Accountid,this.companyName,this.presendat,this.tokennew,account_type).subscribe(res => {
                  this.nachResponse = res
                  this.closeModal();
                   let sourcename = 'DMI-Customer-Portal'
                  this.data.saveNACHrecords(phone,this.loanName,response.razorpay_payment_id,this.paymentMethod,sourcename,this.sendPPName).subscribe(res=>{
                  })

                  let eventName="NACH Registration-Success"
                  this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
                  if(this.channelName!=''){
                    this.data.getEventName(phone, eventName, campign_number, source,this.channelPartnerName).subscribe(res => {
                    })
                  }
                  // this.display1 = 'block';
                  this.modalService.dismissAll();
                  this.modalService.open(successModal);
                 // alert('NACH Registration Successfully.');
                })
              })
            },
            "modal": {
              "ondismiss":  () =>{
                this.modalService.dismissAll();
                this.modalService.open(cancelEvent);
                let eventName="NACH Registration-Fail";
                this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
                  if(this.channelName!=''){
                    this.data.getEventName(phone, eventName, campign_number, source,this.channelPartnerName).subscribe(res => {
                    })
                  }
                // window.location.replace("https://dmi.vistaconnect.com/eMandate/?key=" + localStorage.getItem('loginKey'));
              }
            },
          
            "theme": { "color": "#F37254" }
          }
        }
       
        var rzp1 = new Razorpay(options);
        rzp1.open();
        if (rzp1.open()) {
          this.display = 'none';
        }
      })
    }
    this.modalService.dismissAll();
  }

  closePayModal(){
    this.display2 = 'none';
  }

  closeNachModal(){
    alert(close)
    this.display1 = 'none';
  }

  open(content) {
    this.modalService.open(content);
  }

  loandetailnach(firstModal) {
    this.loandetailnachdisable =  true
    // event Tracking
    this.modalService.open(firstModal);
    // this.displayModal='block';
    let loanname = localStorage.getItem('single_loan_name');
    let eventName = 'Loan Details Button - Register for Auto-Debit'
    let phone = localStorage.getItem('dmi_phone')
    let campign_number = loanname
    let source = 'DMI-Customer-Portal'
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    if(this.channelName!=''){
      this.data.getEventName(phone, eventName, campign_number, source,sessionStorage.getItem('company_Name')).subscribe(res => {
        this.loandetailnachdisable = false
       });
    }
    
  }

  closeModal(){
    this.displayModal='none';
  }

  welcomeLetter() {
    this.router.navigate(['/welcomeletter']);
  }

  ngOnDestroy(){ 
    clearTimeout(this.userActivity);
  }

}
