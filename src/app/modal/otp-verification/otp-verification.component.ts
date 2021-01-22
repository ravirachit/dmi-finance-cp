import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {

  @Input() fromExp:any='';
  @Output() sendExp:EventEmitter<any> = new EventEmitter();
  enteredOTP:any='';
  otpResponse:any='';
  otpSentResponse:any='';
  channelName:any='';
  showLoader:boolean=false;
  responseResult:any=[];

  config = {
    allowNumbersOnly: true,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '35px',
      'height': '35px',
      'border-radius': 0,
      'border': '1px solid #1A90F7',
      'font-size': '18px',
      'outline': 'none',
      'margin-right': '10px',
      'margin-left': '10px'
    }
  };

  constructor(private data:DataService,
    private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.sendOTP();
  }

  sendOTP(){
    //this.fromExp.slice(-10)
    this.eventTracking('Send-OTP-Experian');
    this.enteredOTP='';
    this.data.sendOTP(9811489987).subscribe(res=> {
      this.otpSentResponse = res;
    });
  }

  onOtpChange(otp) {this.enteredOTP = otp;}

  getOTP(){
    debugger;
    this.showLoader=true;
    this.eventTracking('Verify-OTP-Button-Experian');
    this.data.verifyOTP(this.enteredOTP).subscribe(res=>{
      this.otpResponse = res;
      this.responseResult = this.otpResponse.messsage;
      if(this.otpSentResponse.message == 'OTP has been sent, please check your phone' && this.otpResponse.message == 'OTP has been verified'){
        this.sendExp.emit('OTP has been verified');
        this.eventTracking('OTP-Verified');
        this.currentModal.dismiss();
      }
    },error=>{if(error.error.message.error == 'Not Found'){
      this.showLoader=false;
      this.eventTracking('OTP-Not-Found');
      Swal.fire({
        title: 'Incorrect OTP',
        text: 'Please enter the valid OTP.',  
        type: 'warning',
        confirmButtonText: 'OK'
      });
    }});
  }

  get currentModal(){
    return this.activeModal;
  }

  eventTracking(eventName){
    let phone = localStorage.getItem('dmi_phone');
    let campign_number = localStorage.getItem('single_loan_name');
    this.data.getEventName(phone, eventName, campign_number , 'DMI-Customer-Portal',sessionStorage.getItem('company_Name')).subscribe();
  }
}
