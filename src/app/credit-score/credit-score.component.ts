import { Component, OnInit} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataService } from '../data.service';

@Component({
  selector: 'app-credit-score',
  templateUrl: './credit-score.component.html',
  styleUrls: ['./credit-score.component.scss']
})
export class CreditScoreComponent implements OnInit {
  creditValue:any='';
  creditScore:any='';
  channelName:any='';
  refferenceNo:any='';
  dataSource: Object;
  gaugemap:any = {};
  creditText:any='';
  pdfResponse:any='';
  rotateVal=0;
  loading:boolean=false;
  experianPdf: SafeResourceUrl;

  constructor(private service: DataService ,public sanitizer: DomSanitizer)
  {}

  ngOnInit() {
    this.eventTracking('Credit-Score-Page');    
    this.refferenceNo = sessionStorage.getItem('refno');
    this.creditValue = JSON.parse(sessionStorage.getItem('CRValue'));
    if(this.creditValue.score>=0&&this.creditValue.score<=549){this.creditText='Below Average'}
    else if(this.creditValue.score>=550&&this.creditValue.score<=624){this.creditText='Fair'}
    else if(this.creditValue.score>=626&&this.creditValue.score<=699){this.creditText='Good'}
    else if(this.creditValue.score>=700&&this.creditValue.score<=799){this.creditText='Very Good'}
    else if(this.creditValue.score>=800&&this.creditValue.score<=1000){this.creditText='Excellent'}
    this.creditScore = (this.creditValue.score/900)*100;
    this.getPDF(this.refferenceNo)
    this.dynamicValue();
  }

  getPDF(ref){
    this.service.experianPDF(ref).subscribe(res=>{
      this.eventTracking('Download-PDF-Credit-Score');    
      this.experianPdf = this.sanitizer.bypassSecurityTrustResourceUrl(res);
      this.service.downloadPDF(this.refferenceNo).subscribe(res=>{
        this.pdfResponse = res;
        this.eventTracking('Experian-PDF-Base-64');    
      },error=>{
        this.eventTracking('Experian-PDF-Base-64-Failed');    
      });
    },error=>{
      this.eventTracking('Download-PDF-Credit-Score-Failed'); 
    });
  }

  onDown() {
    this.eventTracking('Experian-Download-PDF');    
    this.loading=true;
    setTimeout(()=>{
      this.loading = false;
    },3000);
  }

  dynamicValue(){
    if(this.creditValue.score>=300 && this.creditValue.score<=350){this.rotateVal=-88}
    else if(this.creditValue.score>350 && this.creditValue.score<=400){this.rotateVal=-76}
    else if(this.creditValue.score>400 && this.creditValue.score<=450){this.rotateVal=-64}
    else if(this.creditValue.score>450 && this.creditValue.score<=500){this.rotateVal=-49}
    else if(this.creditValue.score>500 && this.creditValue.score<=550){this.rotateVal=-33}
    else if(this.creditValue.score>550 && this.creditValue.score<=600){this.rotateVal=-16}
    else if(this.creditValue.score==600){this.rotateVal=0}
    else if(this.creditValue.score>600 && this.creditValue.score<=650){this.rotateVal=16}
    else if(this.creditValue.score>650 && this.creditValue.score<=700){this.rotateVal=33}
    else if(this.creditValue.score>700 && this.creditValue.score<=750){this.rotateVal=49}
    else if(this.creditValue.score>750 && this.creditValue.score<=800){this.rotateVal=64}
    else if(this.creditValue.score>800 && this.creditValue.score<=850){this.rotateVal=76}
    else if(this.creditValue.score>850 && this.creditValue.score<=900){this.rotateVal=88}
  }

  eventTracking(eventName){
    let phone = localStorage.getItem('dmi_phone');
    let campign_number = localStorage.getItem('single_loan_name');
    this.service.getEventName(phone, eventName, campign_number , 'DMI-Customer-Portal',sessionStorage.getItem('company_Name')).subscribe();
  }
}