import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  public clickedId : any;
  public categoryId : any;
  public clicked : boolean = false;
  public name : any;
  public id : any;
  public loanName : any;
  public clickedfromFirst : boolean = false;
  public user_id : any;
  public categoryName : any;
  public blogItemId : any;
  public appId:any='';

  constructor() { }

  public setId(clickedId:any)
  {this.clickedId=clickedId;}

  public getId()
  {return this.clickedId;}

  public setCategoryId(categoryId:any)
  {this.categoryId=categoryId;}

  public getCategoryId()
  {return this.categoryId;}

  public setLoanId(id:any)
  {this.id=id;}

  public getLoanId()
  {return this.id;}

  public setLoanName(name:any)
  {this.name=name;}

  public getLoanName()
  {return this.name;}
    
  public setName(loanName:any)
  {this.loanName=loanName;}

  public getName()
  {return this.loanName;}

  public setClickedFromFirst(clickedfromFirst:any)
  {this.clickedfromFirst=clickedfromFirst;}

  public getClickedFromFirst()
  {return this.clickedfromFirst;}

  public setUserId(user_id:any)
  {this.user_id=user_id;}

  public getUserId()
  {return this.user_id;}

  public setCategoryName(categoryName:any)
  {this.categoryName=categoryName;}

  public getCategoryName()
  {return this.categoryName;}

  public getAppIdforFeedback(channelPatnername){
    if(channelPatnername=='DMI Finance'){this.appId='juz6_dmi_finance'}
    else if(channelPatnername=='Zopper'){this.appId='juz6_zopper'}
    else if(channelPatnername=='ZestMoney'){this.appId='juz6_zestmoney'}
    else if(channelPatnername=='Walnut'){this.appId='juz6_walnut'}
    else if(channelPatnername=='Veriown'){this.appId='juz6_veriown'}
    else if(channelPatnername=='UltraCash'){this.appId='juz6_ultracash'}
    else if(channelPatnername=='Tala'){this.appId='juz6_tala'}
    else if(channelPatnername=='Stashfin'){this.appId='juz6_stashfin'}
    else if(channelPatnername=='SMECorner'){this.appId='juz6_smecorner'}
    else if(channelPatnername=='Slicepay'){this.appId='juz6_slicepay'}
    else if(channelPatnername=='Samsung'){this.appId='juz6_samsung'}
    else if(channelPatnername=='Shubhloans'){this.appId='juz6_shubhloans'}
    else if(channelPatnername=='Sankash'){this.appId='juz6_sankash'}
    else if(channelPatnername=='Rentickle'){this.appId='juz6_rentickle'}
    else if(channelPatnername=='Redcarpet'){this.appId='juz6_redcarpet'}
    else if(channelPatnername=='PaisaBazar'){this.appId='juz6_paisabazar'}
    else if(channelPatnername=='OptaCredit'){this.appId='juz6_optacredit'}
    else if(channelPatnername=='MoneyView'){this.appId='juz6_moneyview'}
    else if(channelPatnername=='MoneyTap'){this.appId='juz6_moneytap'}
    else if(channelPatnername=='MobiKwik'){this.appId='juz6_mobikwik'}
    else if(channelPatnername=='Mintifi'){this.appId='juz6_mintifi'}
    else if(channelPatnername=='LetsMd'){this.appId='juz6_letsmd'}
    else if(channelPatnername=='KnabFinance'){this.appId='juz6_knabfinance'}
    else if(channelPatnername=='Kissht'){this.appId='juz6_kissht'}
    else if(channelPatnername=='iServe'){this.appId='juz6_iserve'}
    else if(channelPatnername=='InstaPaisa'){this.appId='juz6_instapaisa'}
    else if(channelPatnername=='IndiaLends'){this.appId='juz6_indialends'}
    else if(channelPatnername=='HappyEMI'){this.appId='juz6_happyemi'}
    else if(channelPatnername=='Healthcarefront'){this.appId='juz6_healthcarefront'}
    else if(channelPatnername=='Finnable'){this.appId='juz6_finnable'}
    else if(channelPatnername=='FinaHub'){this.appId='juz6_finahub'}
    else if(channelPatnername=='Ezcred'){this.appId='juz6_ezcred'}
    else if(channelPatnername=='Epaylater'){this.appId='juz6_epaylater'}
    else if(channelPatnername=='Eduvanz'){this.appId='juz6_eduvanz'}
    else if(channelPatnername=='Digilend'){this.appId='juz6_digilend'}
    else if(channelPatnername=='Credright'){this.appId='juz6_credright'}
    else if(channelPatnername=='Credifiable'){this.appId='juz6_credifiable'}
    else if(channelPatnername=='Cashcare'){this.appId='juz6_cashcare'}
    else if(channelPatnername=='Arogya'){this.appId='juz6_arogya'}
    else if(channelPatnername=='X-sell'){this.appId='juz6_x-sell'}
    else if(channelPatnername=='Test'){this.appId='juz6_test'}
    return this.appId;
  }
}
