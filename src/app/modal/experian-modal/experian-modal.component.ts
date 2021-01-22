import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OtpVerificationComponent } from '../otp-verification/otp-verification.component';

@Component({
  selector: 'app-experian-modal',
  templateUrl: './experian-modal.component.html',
  styleUrls: ['./experian-modal.component.scss']
})
export class ExperianModalComponent implements OnInit {

  formGroup: FormGroup;
  accessToken:any='';
  accessUrl:any='';
  getResp:any='';
  timerApi:any='';
  responseExp:any='';
  sendrequest:any='';
  channelName:any='';
  selectedGender:number;
  experian_error:any='';
  getCreditScore:any='';
  responseExperian:any=[];
  getUserdetailsResp:any=[];
  convertno:any;
  ValidPincode: any;
  responseFromAuth:any;
  showLoader:boolean=false;

  stateSelection:any=[
    {name:'JAMMU and KASHMIR',value:'01'},
    {name:'HIMACHAL PRADESH',value:'02'},
    {name:'PUNJAB',value:'03'},
    {name:'CHANDIGARH',value:'04'},
    {name:'UTTRANCHAL',value:'05'},
    {name:'HARAYANA',value:'06'},
    {name:'DELHI',value:'07'},
    {name:'RAJASTHAN',value:'08'},
    {name:'UTTAR PRADESH',value:'09'},
    {name:'BIHAR',value:'10'},
    {name:'SIKKIM',value:'11'},
    {name:'ARUNACHAL PRADESH',value:'12'},
    {name:'NAGALAND',value:'13'},
    {name:'MANIPUR',value:'14'},
    {name:'MIZORAM',value:'15'},
    {name:'TRIPURA',value:'16'},
    {name:'MEGHALAYA',value:'17'},
    {name:'ASSAM',value:'18'},
    {name:'WEST BENGAL',value:'19'},
    {name:'JHARKHAND',value:'20'},
    {name:'ORRISA',value:'21'},
    {name:'CHHATTISGARH',value:'22'},
    {name:'MADHYA PRADESH',value:'23'},
    {name:'GUJRAT',value:'24'},
    {name:'DAMAN and DIU',value:'25'},
    {name:'DADARA and NAGAR HAVELI',value:'26'},
    {name:'MAHARASHTRA',value:'27'},
    {name:'ANDHRA PRADESH',value:'28'},
    {name:'KARNATAKA',value:'29'},
    {name:'GOA',value:'30'},
    {name:'LAKSHADWEEP',value:'31'},
    {name:'KERALA',value:'32'},
    {name:'TAMIL NADU',value:'33'},
    {name:'PONDICHERRY',value:'34'},
    {name:'ANDAMAN and NICOBAR ISLANDS',value:'35'},
    {name:'TELANGANA',value:'36'}
  ]

  constructor(private formBuilder: FormBuilder,
    private data:DataService,private router:Router,
    private modalService: NgbModal,private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    let phone : RegExp = /^[6-9]\d{9}$/
    let first : RegExp = /^[a-zA-Z\s]*$/
    let add : RegExp = /^[a-zA-Z 0-9\[\]\,\.\/\\]*$/ 
    let pincode : RegExp = /^[1-9]\d{5}$/          // /^[1-9][0-9][0-9][1-9]{3}$/           //      
    this.formGroup = this.formBuilder.group({
      options: ['1',Validators.required],
      firstname: ['', [Validators.required,Validators.pattern(first)]],
      lastname: ['', [Validators.required,Validators.pattern(first)]],
      dateofbirth:['', Validators.required],
      accountNumber: ['',Validators.required],
      pan:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['',[Validators.required,Validators.pattern(phone),Validators.maxLength(10)]],
      flatNumber:['',[Validators.required,Validators.pattern(add)]],
      city:['',[Validators.required,Validators.pattern(add)]],
      state:['',Validators.required],
      pincode:['', [Validators.required, Validators.pattern(pincode)]],
      checkboxValue:['',Validators.required]
    });
    this.authForExperian();
  }

  get experianForm() { return this.formGroup.controls; }

  authForExperian(){
    this.eventTracking('Experian-Modal-Open');
    this.showLoader=true;
    this.data.getAuthForExperian().subscribe(res=>{
      this.responseFromAuth = res;
      this.accessToken = this.responseFromAuth.data.access_token;
      this.accessUrl = this.responseFromAuth.data.instance_url;
      this.eventTracking('Get-Auth-For-Experian');
    },error=>{this.eventTracking('Get-Auth-For-Experian-Failed');});
    this.data.getUserDetails(localStorage.getItem('dmi_token'), localStorage.getItem('dmi_instance_url'),localStorage.getItem('dmi_phone')).subscribe(res=>{
      this.eventTracking('Get-Uer-Details-Experian');
      this.showLoader=false;
      this.getResp = res;
      this.getUserdetailsResp = this.getResp.data;
      let validPhoneNo = this.getUserdetailsResp.Phone;
      this.convertno = validPhoneNo.replace(/[^0-9]/gi, '')
      let flat = this.getUserdetailsResp.flat;
      let city = this.getUserdetailsResp.city;
      let pincode = this.getUserdetailsResp.pincode.replace(/[^0-9]/gi, '');
      for(let i=0;i<this.stateSelection.length;i++){
        if(this.stateSelection[i].name == this.getUserdetailsResp.state || this.stateSelection[i].value == this.getUserdetailsResp.state_code){
          this.formGroup.controls['state'].setValue(this.stateSelection[i].value);
        }
      }
      let gender = this.getUserdetailsResp.GENDER_CODE;
      this.selectedGender = +gender; 
      this.formGroup.controls['firstname'].setValue(this.getUserdetailsResp.FirstName.replace(/[^a-zA-Z\s]/gi, ''));
      this.formGroup.controls['lastname'].setValue(this.getUserdetailsResp.LastName.replace(/[^a-zA-Z\s]/gi, ''));
      this.formGroup.controls['dateofbirth'].setValue(this.getUserdetailsResp.DOB);
      this.formGroup.controls['accountNumber'].setValue(this.getUserdetailsResp.AcNumber);
      this.formGroup.controls['pan'].setValue(this.getUserdetailsResp.Pan);
      if(this.getUserdetailsResp.Pan){
        this.formGroup.controls['pan'].disable();
      }else{
        this.formGroup.controls['pan'].enable();
      }
      this.formGroup.controls['email'].setValue(this.getUserdetailsResp.Email);
      this.formGroup.controls['mobile'].setValue(this.getUserdetailsResp.Phone);
      this.formGroup.controls['mobile'].setValue(this.convertno.slice(-10));
      this.formGroup.controls['flatNumber'].setValue( flat.replace(/[`~!@#$%^&*()_|+\-=?;:'"<>\{\}]/gi, ''));
      this.formGroup.controls['city'].setValue(city.replace(/[`~!@#$%^&*()_|+\-=?;:'"<>\{\}]/gi, ' '));
      this.formGroup.controls['pincode'].setValue(pincode);
    },error=>{
      this.eventTracking('Get-Uer-Details-Experian-Failed');
    })
  }

  submittedForm(){
    this.eventTracking('Submit-Form-Experian');
    if (this.formGroup.invalid){return;}
    let modalObj : NgbModalOptions = {
      backdrop: 'static',
      centered: true,
      windowClass: 'otpCustomModal',
      keyboard: false,
    }
    this.ValidPincode =  this.formGroup.value.pincode;
    if(this.ValidPincode.slice(-3) === '000'){
      alert('pincode is not valid')
      return;
    }
    const modal = this.modalService.open(OtpVerificationComponent , modalObj);
    modal.componentInstance.fromExp = this.formGroup.value.mobile;
    modal.componentInstance.sendExp.subscribe((response)=>{
     if(response == "OTP has been verified"){this.submitFormRedirect();}
    })
  }

  changeEntity(e){
    this.formGroup.value.state = e.target.value;
  }

  submitFormRedirect(){
    this.showLoader=true;
    let flatno = this.formGroup.value.flatNumber.substring(0,40);
    this.eventTracking('Request-Experian-Ref-Number');
    this.data.submitExperianForm(this.accessToken,this.accessUrl,this.formGroup.value.accountNumber,this.formGroup.value.firstname.slice(0,26),
      this.formGroup.value.lastname.slice(0,26),this.formGroup.value.dateofbirth,this.formGroup.value.options,this.formGroup.value.email,
      flatno,this.formGroup.value.city,this.formGroup.value.state,this.formGroup.value.pincode,
      this.formGroup.value.pan,this.formGroup.value.mobile,this.getUserdetailsResp.ContactID,'','','','','','').subscribe(res=>{
       if(res){
          this.responseExp = res;
          this.responseExperian = this.responseExp.data;
          this.eventTracking('Request-Experian-Ref-Number-Success');
          this.showAlert(); 
        }
    },error=>{
      this.eventTracking('Request-Experian-Ref-Number-Failed');
    });
  }

  showAlert(){
    this.sendrequest=setTimeout(()=>{Swal.fire({
      title: 'Alert',
      text: this.experian_error,
      type: 'warning',
      confirmButtonText: 'OK'
    });this.showLoader=false;clearInterval(this.timerApi);},60000);
    this.getResponse();
  }

  getResponse(){
    //this.responseExperian.referncenumber
    // this.responseExperian.reffrenceNumber    0030p00000AyVlS20200210174454
    this.data.databaseEntryExperian(this.responseExperian.referncenumber).subscribe(res=>{if(res){
      this.getCreditScore = res;
      this.eventTracking('Get-Experian-Data-Success');    
      let jsonResponse = {score: this.getCreditScore.data.SCORE.BureauScore,account: this.getCreditScore.data.ACCOUNT.CAIS_Summary.Credit_Account}
      sessionStorage.setItem('CRValue',JSON.stringify(jsonResponse));
      this.currentModal.dismiss();
      sessionStorage.setItem('refno',this.responseExperian.referncenumber);
      this.router.navigate(["/creditScore"]);
      if(res){clearInterval(this.timerApi);clearTimeout(this.sendrequest);this.showLoader=false;}
    }},error=>{
      this.experian_error = error.error.message.error;
      this.eventTracking('Get-Experian-Data-Error');    
      if(error.error.message.error == 'Please Wait')
      {this.timerApi=setInterval(()=> { this.getResponse()}, 10000);}
      else if(error.error.message.error == 'Something went wrong')
      {this.showLoader=false;
        Swal.fire({
          title: 'Alert',
          text: this.experian_error,
          type: 'warning',
          confirmButtonText: 'OK'
        }
      )}
    }); 
    clearInterval(this.timerApi);
  }

  get currentModal(){
    return this.activeModal;
  }

  closeModal(){
    this.eventTracking('Close-Experian-Modal');    
    this.currentModal.dismiss();
  }

  eventTracking(eventName){
    let phone = localStorage.getItem('dmi_phone');
    let campign_number = localStorage.getItem('single_loan_name');
    this.data.getEventName(phone, eventName,campign_number, 'DMI-Customer-Portal',sessionStorage.getItem('company_Name')).subscribe();
  }

}
