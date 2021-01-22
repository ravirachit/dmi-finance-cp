declare var Razorpay: any;
import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ShareDataService } from '../share-data.service';
import { UserIdleService } from 'angular-user-idle';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {
  userActivity;
  userInactive: Subject<any> = new Subject();
  public isCollapsed = false;
  showPagination:boolean=false;
  just:any;
  userBasicInfo: any;
  userInfo: any;
  getPPName:any;
  bankAccountDetails: any;
  loanDetail: any;
  loanOffer: any;
  lastLogin: any;
  mobileNumber: any;
  selectedId: string;
  SpecificLoanDetail: any;
  isLoading: boolean;
  loanAmount:any="Loan Amount";
  convertedLoanAmt: any;
  offerAmount: any;
  convertedOfferAmt: any;
  welcomedata: any;
  loanImage: any;
  loanName: any;
  welcomeLetterUrl: any;
  createWelcomeLetterData: any;
  userName: any;
  phone: any;
  address: any;
  principleAmt: any;
  dueMonth: any;
  dueAmt: any;
  loanAccountNo: any;
  payNowForm: FormGroup;
  display:any;
  payNowModel:any;
  paidPayableAmount:any;
  phoneNo: any;
  payNowData: any;
  payNowcustomerId:any;
  payNoworderId:any;
  billingAddress:any;
  email: any;
  loanId: any;
  payableInput: boolean = true;
  showLoader:boolean=false;
  // otherInput: boolean = false;
  display2 = 'none';
  displayModal:any='none';
  searchTerm:any;
  itemsCopy:any;
  sortByAsc:any;
  loanData:any;
  amtArea: boolean = false;
  dateArea: boolean = false;
  startDate:any;
  endDate:any;
  minAmt:any;
  maxAmt:any;
  emiAmount:any;
  name :any;
  loanNameValue : any;
  amount : any;
  totalpayableamount : any;
  paymentAmont:any;
  userBasicInfo1: any;
  userName1:any;
  presendat:any;
  sendPPName:any;
  getPPAmount:any='';
  specificLoanAmt1:any;
  specificLoanAmt2:any;
  accountNo: any;
  channelName:any='';
  requiredError: any;
  requiredError1: any;
  requiredError2: any;
  accountIFSC: any;
  paymentMethod: any;
  companyName:any='';
  netPaymentC:any;
  maxAmount: any;
  amtToString: any;
  forNetBankingAmt: any;
  netBanking: any = 'Net Banking';
  createCO: any;
  customerId: any;
  orderId: any;
  fourDigitIFSC: any;
  selectedBankName: any;
  gettokendata:any;
  tokennew: any;
  nachResponse: any;
  channelPartnerName:any='';
  Accountid:any;
  specificLoanAmt: any;
  acHolderName: any;
  newPage:any=1;
  config={ itemsPerPage: 5 , currentPage: this.newPage, totalItems: 0};

// disable buttton 
paynowdisable:boolean =  false; loandetailnachdisable:boolean = false
  //nach
  nachCheckData: any;
  alreadyRegisNach: boolean;
  forNachRegis: boolean;
  date:any;
  status : any;
  dueDate:any='';
  accountType:any;
  modeofpayment:any;
  payNow:boolean=false;
  register:boolean=false;
  nachErrData: any;
  debitCard: any;
  isNetBanking: boolean = true;
  isDebit: boolean = false;
  userNameForm:any;
  deviceInfo:any='';
  deviceType:any='';
  PaymentMethodOption = [{ name: "Net Banking" }, { name: "Debit Card" }];

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

  UserAccountType = [{name: "Savings",value:'savings'},{name: "Current",value:'current'}];

  constructor(
    private data: DataService,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder, private service : ShareDataService,
    private userIdle: UserIdleService,private modalService:NgbModal,
    private device: DeviceDetectorService) {
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
    this.deviceInfo = this.device.getDeviceInfo();
    if(this.device.isMobile()==true){this.deviceType='Mobile'}
    else if(this.device.isTablet()==true){this.deviceType='Tablet'}
    else if(this.device.isDesktop()==true){this.deviceType='Desktop'};

    let deviceDetails = {
      'userAgent':this.deviceInfo.userAgent,
      'os':this.deviceInfo.os,
      'browser':this.deviceInfo.browser,
      'deviceType':this.deviceType,
      'os_version':this.deviceInfo.os_version,
      'browser_version':this.deviceInfo.browser_version,
    }

    this.data.deviceTracking(localStorage.getItem('dmi_phone'),deviceDetails).subscribe();

    this.paymentMethod = 'Net Banking'
    this.selectedBankName = 'Andhra Bank'
    this.fourDigitIFSC = 'ANDB';
    this.accountType = this.UserAccountType[0].name;

    if(!localStorage.getItem('dmi_phone') || localStorage.getItem('dmi_phone') == 'null' || localStorage.getItem('dmi_phone') == 'undefined' || localStorage.getItem('dmi_phone') == ''){
      localStorage.clear();
      this.router.navigate(['/']);
    }
   
    this.payNowForm = this.formBuilder.group({
      payableAmount: ['']
    });

    this.data.getChannelPartner(localStorage.getItem('dmi_phone')).subscribe(res=>{
      this.channelName=res;
      this.channelPartnerName=this.channelName.data;
    });

    this.data.getChechNach(localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'), localStorage.getItem('single_loan_name')).subscribe(res => {
      this.nachCheckData = res;
      this.alreadyRegisNach = true;
      this.forNachRegis = false;
      this.date = this.nachCheckData.data.Current_Date;
      this.status = this.nachCheckData.data.Status__c;
      let dateCondition = this.dueDate - 3;
      if(this.status=='SUCCESS' || this.status=='Success' || this.status=='success' || this.status=='ACCEPTED' || this.status=='Accepted')
      {
        this.modeofpayment=true;
        this.payNow=true;
        this.register=false;
      }
      else {
        this.modeofpayment=false;
        this.payNow=true;this.register=true;
      }
    },
      err => {
        this.nachErrData = err;
        this.forNachRegis = true;
        this.alreadyRegisNach = false;
      });
    if (this.netBanking == 'Net Banking') {this.forNetBankingAmt = '0';}
    else{this.forNetBankingAmt = '1';}

    if (localStorage.getItem('user_basic_info') === null) {
      this.data.getUserInfo(localStorage.getItem('dmi_phone'), localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url')).subscribe(
        data => {
          this.userBasicInfo = data
          let userPhoneNum : any;
          let userMobileNum : any;
          this.userName = this.userBasicInfo.data[0].Name;
          userPhoneNum = this.userBasicInfo.data[0].Phone;
          userMobileNum = this.userBasicInfo.data[0].MobilePhone;
          this.acHolderName = this.userBasicInfo.data[0].Name;
          if(userPhoneNum == null){
            this.phoneNo = userMobileNum;
          }
          if(userMobileNum == null){
            this.phoneNo = userPhoneNum;
          }
          if(userPhoneNum !== null && userMobileNum !== null){
            this.phoneNo = userPhoneNum;
          }
          localStorage.setItem('user_basic_info', JSON.stringify(this.userBasicInfo))
        },
        err => { this.userBasicInfo = [] }
      );
      this.data.getUserName(localStorage.getItem('dmi_phone'), localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url')).subscribe(
        data => {
          this.userBasicInfo1 = data;
          this.userName1 = this.userBasicInfo1.data[0].Name;      
          localStorage.setItem('user_basic_name', this.userName1)
          this.userNameForm = localStorage.getItem('user_basic_name');
        },
        err => { this.userBasicInfo1 = [] }
      );
    }
    else {
      let userPhoneNum : any;
      let userMobileNum : any;
      this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info'))
      userPhoneNum = this.userBasicInfo.data[0].Phone;
      userMobileNum = this.userBasicInfo.data[0].MobilePhone;
      this.billingAddress = this.userBasicInfo.data[0].MailingCity + ', ' + this.userBasicInfo.data[0].MailingCountry + ', ' +
      this.userBasicInfo.data[0].MailingPostalCode + ', ' + this.userBasicInfo.data[0].MailingState + ', ' + this.userBasicInfo.data[0].MailingStreet
      this.email = this.userBasicInfo.data[0].Email;
      this.userName = this.userBasicInfo.data[0].Name;
      if(userPhoneNum == null){
        this.phoneNo = userMobileNum;
      }
      if(userMobileNum == null){
        this.phoneNo = userPhoneNum;
      }
      if(userPhoneNum !== null && userMobileNum !== null){
        this.phoneNo = userPhoneNum;
      }
      this.userName1 = localStorage.getItem('user_basic_name');
    }

    this.data.getLoanCount(localStorage.getItem('dmi_phone'), localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url')).subscribe(res=>{
      this.config.totalItems = res.expr0;
    });

    this.data.getLoanCountDetails(localStorage.getItem('dmi_phone'), localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'),this.config.itemsPerPage,0).subscribe(
      res => {
        this.loanData = res;
        this.loanDetail = this.loanData.data;
        this.amount = this.loanDetail[0].Net_Payment__c;
        this.name = this.loanDetail[0].name;
        this.totalpayableamount = this.loanDetail[0].totalpayableamount;
        localStorage.setItem('single_loan_name',this.loanDetail[0].name)
        sessionStorage.setItem('company_Name',this.loanDetail[0].Pulled_Lead_Source_Name__c)
        //Dashboard Events
        let eventName = 'Dashboard'
        let phone = localStorage.getItem('dmi_phone')
        let campign_number = "Not Available";
        let source = 'DMI-Customer-Portal'
        this.data.getEventName(phone, eventName, campign_number, source,this.loanDetail[0].Pulled_Lead_Source_Name__c).subscribe(res => {
        });

        localStorage.setItem('name',this.loanDetail[0].name);

        localStorage.setItem('loanData', JSON.stringify(this.loanData));

        localStorage.setItem('loanDetail', JSON.stringify(this.loanData.data));
        if(res){
          if(this.loanDetail.length>4){this.showPagination=true;}
          for(let i=0;i<this.loanDetail.length;i++){
          let msgArray=[];
          msgArray.push(this.loanDetail[i])
          this.data.getNachPaymentStatus(localStorage.getItem('dmi_phone'),this.loanDetail[i].Nach_Button,
          this.loanDetail[i].Payment_Button,this.loanDetail[i].name,msgArray).subscribe(res=>{});
        }}
      },
      err => { this.loanDetail = [] }
    );
    
    this.data.getLoanOffer(localStorage.getItem('dmi_phone'), localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url')).subscribe(
        data => {
          this.loanOffer = data
          localStorage.setItem('loan_offer', JSON.stringify(this.loanOffer.data));
        },
        err => { this.loanOffer = [] }
      );
    this.lastLogin = localStorage.getItem('last_login');
  }

  stop() {
    this.userIdle.stopTimer();
  }

  selectedBank(event) {
    this.selectedBankName = event;
    for(let i=0;i<this.netbankingDropdown.length;i++){
      if(this.selectedBankName == this.netbankingDropdown[i].key){
        this.fourDigitIFSC = this.netbankingDropdown[i].value;
      }
    }
  }

  closeModal(){
    this.displayModal='none';
  }
 
  stopWatching() {
    this.userIdle.stopWatching();
  }
 
  startWatching() {
    this.userIdle.startWatching();
  }

  selectedAccountType(event){
    this.accountType = event;
  }
 
  closePayModal(){
    this.display2 = 'none';
  }

  payLoan(loan){
    
    this.paynowdisable = true
    // Start event tracking
    let eventName = 'Pay Loan EMI Amount from Dashboard'
    this.phone = localStorage.getItem('dmi_phone');
    let campign_number = "Not Available";
    let source = 'DMI-Customer-Portal';
    let method = 'Payment';
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    this.data.getEventName(this.phone, eventName, campign_number, source,sessionStorage.getItem('company_Name')).subscribe(res => {
      
     
    })
    // end
    let totalAmt  = loan.totalpayableamount.replace(/\,/g,"");
    let amount = Math.trunc(totalAmt);

    this.data.getPayNow(this.phone, this.userName, loan.name, amount).subscribe(res => {
      this.paynowdisable = false
      this.payNowData = res
      this.payNowcustomerId = this.payNowData.data.customerid.id;
      this.payNoworderId = this.payNowData.data.orderid.id;
      this.email = this.userBasicInfo.data[0].Email;
      var payNowOptions = {
        "key": "rzp_live_yYLo9BAVCiDsOX",
        "currency": "INR",
        "name": loan.name,
        "description": "Pay your emi",
        "image": "https://los.dmifinance.in/assets/images/logo.svg",
        "order_id": this.payNoworderId,
        "handler":(res)=> {
          this.display2 = 'block';
          this.data.getpaymentRecords(loan.phone,loan.name,amount,source,method,this.payNowcustomerId,this.payNoworderId,this.userName,this.email).subscribe(res=>{
          })
        },
        "prefill": {
          "email": this.email,
          "contact": this.phone
        },
        "notes": {
          "opportunityName": loan.name,
          "senderId": "DMI",
          "opportunityID ": loan.Id,
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

  openNACHmodel() {
    this.display = 'block';
    this.accountNo = null;
    this.accountIFSC = null;
    this.acHolderName = null;
  }

  loandetail(loan) {
    let loanname = loan.name;
    localStorage.setItem('single_loan_name',loan.name)
    sessionStorage.setItem('company_Name',loan.Pulled_Lead_Source_Name__c)
    this.loanNameValue = loanname;
    this.service.setName(this.loanNameValue);
    // event Tracking
    let eventName = 'View Loan Details'
    let phone = localStorage.getItem('dmi_phone')
    let campign_number = loanname
    let source = 'DMI-Customer-Portal';
    this.data.getEventName(phone, eventName, campign_number, source,loan.Pulled_Lead_Source_Name__c).subscribe(res => {
    });
    this.selectedId = loan.Id;
    localStorage.setItem('specefic_loan_id', loan.Id);
    localStorage.removeItem('specific_loan_detail')
    this.router.navigate(['/loanDetail']);
  }

  removeErr() {
    this.requiredError = '';
    this.requiredError1 = '';
    this.requiredError2 = '';
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

  loandetailnach(loan,firstModal) {
    this.loandetailnachdisable = true
    this.modalService.open(firstModal);
    let loanname = loan.name;
    this.getPPName = loan.parent_opp;
    localStorage.setItem('single_loan_name',loan.name)
    this.loanNameValue = loanname;
    this.getPPAmount = loan.pp_amount;
    this.specificLoanAmt1 = loan.Original_Face__c;
    this.companyName = loan.Pulled_Lead_Source_Name__c;
    this.netPaymentC = loan.Net_Payment__c;
    this.Accountid = loan.Accountid;
    this.specificLoanAmt = loan.Original_Face__c;
    this.loanName = loan.name;
    this.userNameForm = loan.Group_Label__c;
    this.convertedLoanAmt = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.specificLoanAmt);
    this.service.setName(this.loanNameValue);
    this.dueDate = localStorage.getItem('dueMonth');
    if(this.companyName == 'ZestMoney' || this.companyName == 'Redcarpet' || this.companyName == 'Slicepay'){
      this.register=false;
    }
    if(this.companyName=='Samsung')
    {this.loanAmount = 'EMI Amount';this.specificLoanAmt=this.SpecificLoanDetail.data[0].Net_Payment__c;}

    this.service.setLoanId(this.loanId);
    this.service.setLoanName(this.loanName);

    this.principleAmt = this.specificLoanAmt;

    // event Tracking
    let eventName = 'Dashboard Button - Register for Auto-Debit'
    let phone = localStorage.getItem('dmi_phone')
    let campign_number = loanname
    let source = 'DMI-Customer-Portal';
    this.loanDetail = JSON.parse(localStorage.getItem('loanDetail'));
    this.data.getEventName(phone, eventName, campign_number, source,loan.Pulled_Lead_Source_Name__c).subscribe(res => {
      this.loandetailnachdisable = false
    })
    this.selectedId = loan.Id;
    localStorage.setItem('specefic_loan_id', loan.Id);
    localStorage.removeItem('specific_loan_detail')
  }

  nachRegistration(cancelEvent,successModal) {
    // Start event tracking
    this.displayModal='none';
    let eventName = 'Dashboard - NACH Registration';
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

     this.data.getCreateCo(localStorage.getItem('dmi_phone'), this.email, this.userName1, this.forNetBankingAmt, this.paymentMethod, this.loanName,
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

  closeModalDialog() {
    this.display = 'none';
    this.payNowModel = 'none';
    this.payNowForm.reset();
  }

  openModal(){
    this.modalService.dismissAll();
  }

  payableAmt() {
    this.payableInput = true;
    // this.otherInput = false;
  }

  pageChange(newP:number){
    let lastindex:number;
    this.newPage=newP;
    this.config.currentPage=this.newPage;
    if(newP==1){lastindex= 0;}
    else{lastindex = 5*newP-5;}
    this.loanDetail=[];
    this.showLoader=true;
    localStorage.removeItem('loanData');
    localStorage.removeItem('loanDetail');
    this.data.getLoanCountDetails(localStorage.getItem('dmi_phone'), localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'),this.config.itemsPerPage,lastindex).subscribe(res=>{
      this.loanData = res;
      this.showLoader=false;
      this.loanDetail = this.loanData.data;
      this.amount = this.loanDetail[0].Net_Payment__c;
      this.name = this.loanDetail[0].name;
      this.totalpayableamount = this.loanDetail[0].totalpayableamount;
      localStorage.setItem('loanData', JSON.stringify(this.loanData));
      localStorage.setItem('loanDetail', JSON.stringify(this.loanData.data));
      if(res){
        if(this.loanDetail.length>4){this.showPagination=true;}
        for(let i=0;i<this.loanDetail.length;i++){
          let msgArray=[];
          msgArray.push(this.loanDetail[i])
          this.data.getNachPaymentStatus(localStorage.getItem('dmi_phone'),this.loanDetail[i].Nach_Button,
          this.loanDetail[i].Payment_Button,this.loanDetail[i].name,msgArray).subscribe(res=>{});
        }
      }
    });
  }

  get payFormData() { return this.payNowForm.controls; }
  
  isActive: boolean
  routerLinkActiveOptions: {
    exact: boolean;
  }

  ngOnDestroy(){ 
    clearTimeout(this.userActivity);
  }

}


