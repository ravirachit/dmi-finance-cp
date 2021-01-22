
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareDataService } from '../share-data.service';
import { AuthService } from '../auth/auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthenticationService } from '../_services';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import { Pipe, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss']
})
export class CustomerLoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean;
  isOTP: boolean;
  isPassword: boolean;
  isHavingPassword: boolean;
  notOTP: boolean;
  isMobileField: boolean;
  loginSection: boolean;
  resetPasswordSec: boolean;
  isVerifyOTP: boolean;
  getauthdata: any;
  mobnumPattern = "[789][0-9]{9}";
  formName:any='';
  formEmail:any='';
  formMobile:any='';
  formMessage:any='';
  mobileRequired:any='';
  messageRequired:any='';
  user: any;
  mobileNumber: any;
  returnUrl: string;
  phoneNotCurrect: any='';
  userBasicInfo: any;
  bankAccountDetails: any;
  loanDetail: any;
  loanOffer: any;
  lastLogin: any;
  loginBtn:any='LOGIN';
  showLogin:boolean=true;
  isLogging: boolean = false;
  isSendOTP: boolean = false;
  isVerifyOTPBtn: boolean = false;
  passwordNotMatch:boolean=false;
  passNotCurrect:any;
  otpNotCurrect: any="";
  registeredNo : any;
  response:any;
  tokenvalue : any;
  regNoErr:any;
  errorMsg:any;
  passwordError:any;
  countDown;
  counter=900;
  tick = 1000;
  resendCouter=0;
  otpExpiredErr:any;

  resendCountDown=900;
  countDownSend;
  sendOTPCount=120;

  showAlert:boolean=false;
  showPassword:boolean=true;
  sendOTPCounter:boolean=false;

  constructor(
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private data: DataService,
    private router: ActivatedRoute,
    private route: Router,
    private modalService: NgbModal,
    private service : ShareDataService,
    private authService: AuthService,
    private deviceService: DeviceDetectorService,
    private authenticationService: AuthenticationService,) {
  }

  ngOnInit() {
    localStorage.clear();
    localStorage.removeItem('passwordErr');
    this.loginSection = true;
    this.notOTP = true;
    this.isMobileField = true;
    this.isVerifyOTP = false;

    this.loginForm = this.formBuilder.group({
      phone: ['', Validators.pattern(this.mobnumPattern)],
      password: [''],
      new_password: [''],
      repeat_password: [''],
      otp: ['']
    });

    // this.authenticationService.logout();
    // this.returnUrl = this.router.snapshot.queryParams['returnUrl'] || '/';


    this
      .data
      .getAuth().subscribe(
        data => {
          this.getauthdata = data
          localStorage.setItem('dmi_token', this.getauthdata.data.access_token)
          localStorage.setItem('dmi_instance_url', this.getauthdata.data.instance_url)
          localStorage.setItem('sesssionRating','authenticated')
        },
        err => { this.getauthdata = [] }
      );
  }

  get formData() { return this.loginForm.controls; }

  sendOTP() {
    this.isLogging = true;
    this.isVerifyOTPBtn = false;
    this.sendOTPCount=120;

    this.countDown = Observable.timer(0, this.tick)
      .take(this.counter)
      .map(() => --this.counter);

    if(this.formData.phone.value.length<10)
    { this.phoneNotCurrect = "Please enter a valid 10 digit mobile number.";}
    else{
      this.isSendOTP = true;
      this.data.getMobileNo(this.formData.phone.value).subscribe(res=>
      {
        this.response = res;
        this.isLogging = true;

        if(this.response.message.error=='Please try with registered mobile number.')
        {
          this.isSendOTP = false;
          this.regNoErr = "Please try with registered mobile number."
          let eventName = 'Authentication failed from unregistered "mobile number" ' + this.formData.phone.value;
          let phone = this.formData.phone.value;
          let campign_number = 'Not Available'
          let source = 'DMI-Customer-Portal';
          this.data.getEventName(phone, eventName, campign_number,source,'null').subscribe(res => {
          })
        }
        else
        {
          let eventName = 'Send OTP'
          let phone = this.formData.phone.value;
          let campign_number = 'Not Available'
          let source = 'DMI-Customer-Portal'
          this.data.getEventName(phone, eventName, campign_number,source,'null').subscribe(res => {
          })
          if (this.formData.phone.value.length<10 || this.formData.phone.value == '' || this.formData.phone.value == 'undefined' || this.formData.phone.value == 'null') {
            this.isSendOTP = false;
            this.phoneNotCurrect = "Please enter a valid 10 digit mobile number.";
            return;
          }
          this.isSendOTP = true;
          this.isLogging = true;
          this.sendOTPCounter=false;
          this.showPassword = false;
          this.isVerifyOTPBtn = false;
          this.counter=120;
          this.phoneNotCurrect ='';

          this.data.getUser(this.formData.phone.value)
            .subscribe(
              data => {
                this.user = data
                localStorage.setItem('dmi_phone', this.user.data)
                this.isMobileField = false;
                this.isOTP = true;
                this.notOTP = false;
                this.isVerifyOTP = true;
                this.isVerifyOTPBtn = true;
                this.isHavingPassword = false;
              },
              err => {
                if (err.status === 404) {
                  if(err.error.message.error == 'You cant send more than 3 OTP within an hour.'){
                  this.regNoErr='';
                  this.phoneNotCurrect = err.error.message.error;
                }
              }
            this.user = [];
          });
          this.isSendOTP = false;
        }
      });
    }
  }

  verifyOTP() {
    // event Tracking
    let eventName = 'verify OTP'
    let phone = localStorage.getItem('dmi_phone');
    let campign_number = 'Not Available'
    let source = 'DMI-Customer-Portal'
    this.data.getEventName(phone, eventName, campign_number,source,'null').subscribe(res => {
    })
    
    if (this.formData.otp.value == '' || this.formData.otp.value == 'undefined' || this.formData.otp.value == 'null') {
      this.otpNotCurrect = "Please enter valid OTP";
      return;
    }
    this.isVerifyOTPBtn = true;

    localStorage.setItem('OTP_Pass', this.formData.otp.value);
    this.authenticationService.verifyOtp(this.formData.otp.value).pipe(first()).subscribe(
      data => {
        this.user = data
        this.mobileNumber = localStorage.getItem('dmi_phone');
        this.loginSection = false;
        this.resetPasswordSec = true;
        this.isVerifyOTPBtn = false;
      },
      err => { this.user = []; 
        this.otpExpiredErr = err;
        let otpexpire = this.otpExpiredErr.error.message.error
        this.otpNotCurrect = "Please enter valid OTP";
      }
    );
  }

  goToDashboard() {
    let eventName = 'Customer Login'
    let phone = localStorage.getItem('dmi_phone');
    let campign_number = 'Not Available';
    let source = 'DMI-Customer-Portal';
    this.data.getEventName(phone, eventName, campign_number,source,'null').subscribe(res => {
      this.route.navigate(['dashboard']);
    }) 
  }

  proceedLogin() {
    if(this.loginForm.value.new_password == this.loginForm.value.repeat_password){
      let eventName = 'Customer Login'
      let phone = localStorage.getItem('dmi_phone');
      let campign_number = 'Not Available'
      let source = 'DMI-Customer-Portal'
      this.data.getEventName(phone, eventName, campign_number,source,'null').subscribe(res => {
      })
      this.data.setUserPassword(localStorage.getItem('dmi_phone'), this.formData.new_password.value)
        .subscribe(
          data => {
            this.user = data;
            let eventName = 'Customer Set Password';
            let phone = localStorage.getItem('dmi_phone');
            let campign_number = 'Not Available';
            let source = 'DMI-Customer-Portal';
            this.data.getEventName(phone, eventName, campign_number,source,'null').subscribe(res => {
            });
            this.route.navigate(['dashboard']);
          },
          err => {
            if (err.status === 404) {
              this.passwordNotMatch=true;
              this.passwordError = err.error.message.error;
            }
            this.user = [];
          }
        );
    }
    else{this.passwordNotMatch=true;this.passwordError='Old and New Password should Match.'}
    
  }

  otpLogin() {
    this.isOTP = false;
    this.notOTP = true;
    this.isMobileField = true;
    this.isPassword = false;
    this.isHavingPassword = false;
  }

  passwordLogin() {
    if(this.showPassword==true){
      this.notOTP = false;
      this.isOTP = false;
      this.isMobileField = true;
      this.isHavingPassword = true;
      this.isPassword = true;
      this.phoneNotCurrect = "";
      this.sendOTPCounter=false;
      this.isLogging = true;
    }
  }

  resendOTP(){
    this.resendCouter=this.resendCouter+1;
    if(this.resendCouter>2){
      this.showPassword=true;
      this.sendOTPCounter=true; 
      this.isOTP=false;
      this.isSendOTP=false;
      this.isMobileField=true;
      this.isVerifyOTP=false;
      this.notOTP = true;
      this.counter=120;
      this.resendCountDown=900;
      this.countDownSend = Observable.timer(0, this.tick)
      .take(this.resendCountDown)
      .map(() => --this.resendCountDown)
    }
    else{
      this.isLogging = true;
      this.isSendOTP = false;
      this.counter=120;
      this.countDown = Observable.timer(0, this.tick)
        .take(this.counter)
        .map(() => --this.counter)

    if(this.formData.phone.value.length<10)
    {this.phoneNotCurrect = "Please enter a valid 10 digit mobile number.";}
    else {
      this.data.getMobileNo(this.formData.phone.value).subscribe(res => {
        this.response = res;
        this.isLogging = true;

        if(this.response.message.error=='Please try with registered mobile number.')
        {
          this.regNoErr = "Please try with registered mobile number."
          let eventName = 'Authentication failed from unregistered "mobile number - Resend OTP" ' + this.formData.phone.value;
          let phone = this.formData.phone.value;
          let campign_number = 'Not Available'
          let source = 'DMI-Customer-Portal';
          this.data.getEventName(phone, eventName, campign_number,source,'null').subscribe(res => {
          })
        }
        else {
          let eventName = 'Send OTP'
          let phone = this.formData.phone.value;
          let campign_number = 'Not Available'
          let source = 'DMI-Customer-Portal'
          this.data.getEventName(phone, eventName, campign_number,source,'null').subscribe(res => {
          })
          if (this.formData.phone.value.length<10 || this.formData.phone.value == '' || this.formData.phone.value == 'undefined' || this.formData.phone.value == 'null') {
            this.isSendOTP = false;
            this.phoneNotCurrect = "Please enter a valid 10 digit mobile number.";
            return;
          }
          this.isSendOTP = true;

          this.data.getUser(this.formData.phone.value)
            .subscribe(
              data => {
                this.user = data;
                localStorage.setItem('dmi_phone', this.user.data);
                this.isMobileField = false;
                this.isOTP = true;
                this.notOTP = false;
                this.isVerifyOTP = true;
                this.isHavingPassword = false;
                this.isSendOTP = false;
                this.isVerifyOTPBtn = true;
              },
              err => {
                if (err.status === 404) {
                  if(err.error.message.error == 'You cant send more than 3 OTP within an hour.'){
                  this.regNoErr='';
                  this.phoneNotCurrect = err.error.message.error;
                }
              }
            this.user = [];
          });
          this.isSendOTP = false;
        }
      });
    }
    }
  }

  getLogin() {
    this.isLogging = true;
    this.showLogin=false;
    this.loginBtn='Please Wait...'
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    let eventName = 'Login Attempt'
    let phone = this.formData.phone.value
    let campign_number = 'Not Available'
    let source = 'DMI-Customer-Portal'
    this.data.getEventName(phone, eventName, campign_number, source,'null').subscribe(res=>{});

    if (this.formData.phone.value == '' || this.formData.phone.value == 'undefined' || this.formData.phone.value == 'null') {
      this.phoneNotCurrect = "Please enter a valid 10 digit mobile number.";
      return;
    } else if (this.formData.password.value == '' || this.formData.password.value == 'undefined' || this.formData.password.value == 'null') {
      this.passNotCurrect = "Please enter valid password";
      return;
    }
    localStorage.setItem('dmi_phone', this.formData.phone.value)
    this.authenticationService.loginWithPassword(this.formData.phone.value, this.formData.password.value,localStorage.getItem('dmi_token'),localStorage.getItem('dmi_instance_url')).pipe(first()).subscribe(res => {
      this.lastLogin = res
      this.isLogging = false;
      localStorage.setItem('userId',this.lastLogin.data.id);
      // this.service.setUserId(this.lastLogin.data.id);
      localStorage.setItem('token',this.lastLogin.data.token);

      if(res){
        let eventName = 'Customer Login Successfully'
        let phone = this.formData.phone.value
        let campign_number = 'Not Available'
        let source = 'DMI-Customer-Portal'
        this.data.getEventName(phone, eventName, campign_number,source,'null').subscribe(res => {});
      }
      this.route.navigate(['dashboard']);
    },
    error => {
      let eventName = '"Wrong login credential" with ' + this.formData.phone.value;
      let phone = this.formData.phone.value
      let campign_number = 'Not Available'
      let source = 'DMI-Customer-Portal'
      this.data.getEventName(phone, eventName, campign_number,source,'null').subscribe(res => {})
      alert(error.error.message.error)
      this.isLogging = true;
      this.showLogin=true;
      this.loginBtn='LOGIN';
    });
  }

  removeError(event){
    this.phoneNotCurrect = "";
    this.otpNotCurrect = "";
    this.regNoErr='';
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  removeErrorPassword(event){
    this.passwordError='';
    this.passNotCurrect = "";
  }

  onSave() {
    if(this.formMobile==''&&this.formMessage==''){this.showAlert=true;this.mobileRequired='Please enter mobile number.';this.messageRequired='Please enter your message.'}
    else if(this.formMobile!=''&&this.formMessage!=''){
      this.data.troubleLogin(this.formName,this.formMobile,this.formEmail,this.formMessage).subscribe(res=>{
        this.modalService.dismissAll();
        if(res){
          Swal.fire({
            title: 'Submitted',
            text: 'Your request has been received successfully.',
            type: "success",
            confirmButtonText: 'OK'
          });
        }
      },error=>{if(error){
        Swal.fire({
          title: 'Alert',
          text: 'Problem in trouble login',
          type: "warning",
          confirmButtonText: 'OK'
        })
      }});
    }
  }
}

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
  }
}

