import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
// import { User } from '../app/_models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // UAT Url
  //baseurl = "https://dev.vistaconnect.com/dmi-clubbed-backend/api/"

  // production Url
  baseurl = "https://los.dmifinance.in/los/api/"
  baseurl1 = "https://dmi.vistaconnect.com/dmi-clubbed-backend/api/"

  // for get authentication
  getAuth() {
    return this.http.get(this.baseurl + 'getauthcp');
  }

  // for login and reset password
  // getUserLogin(phone, password) {
  //   return this.http.post(this.baseurl + 'logincp', { phone, password })
  // }

  //reset or change password
  changePassword(phone,current_password,new_password){
    return this.http.post(this.baseurl + 'update_cp_password', {phone,current_password,new_password});
  }

  deviceTracking(Mobile,User_Info){
    return this.http.post(this.baseurl + 'CP_Device_Traking' , {Mobile,User_Info});
  }

  troubleLogin(name,mobile,email,comment){
    return this.http.post(this.baseurl + 'cp_trouble_login' , {name,mobile,email,comment});
  }

  getMobileNo(mobile)
  {
    return this.http.post(this.baseurl + 'usermobilecheck' , {mobile});
  }

  setUserPassword(phone, password) {
    return this.http.post(this.baseurl + 'password', { phone, password })
  }

  getUser(phone) {
    return this.http.get(this.baseurl + 'otpcp/' + phone)
  }

  getNachPaymentStatus(phone,nach_button_status,payment_button_status,loan_id,msg){
    return this.http.post(this.baseurl + 'cp_loan_nach_payment_status' , {phone,nach_button_status,payment_button_status,loan_id,msg});
  }

  // verifyOtp(otp) {
  //   return this.http.get(this.baseurl + 'verifyotpcp/' + otp)
  // }


  // for loan and user details
  getUserInfo(phone, accesstoken, url) {
    return this.http.post(this.baseurl + 'basicinfo', { phone, accesstoken, url })
  }

  // for loan and user details
  getUserName(phone, accesstoken, url) {
    return this.http.post(this.baseurl + 'basicinfobyname', { phone, accesstoken, url })
  }

  //////////////////////////////////////////////// Feedback Litmus////////////////////////////////////////////
  FeedbackLTMS(customer_id, name, user_email, user_phone, app_id,tag_channel_partner) {
    return this.http.post(this.baseurl + 'litmusgetdata', { customer_id, name, user_email, user_phone, app_id,tag_channel_partner})
  }
  getRatingDetails(email, phone){
    return this.http.post(this.baseurl + 'getfeedbackbyltms' , {email, phone});
  }
  //////////////////////////////////////////////// Feedback Litmus////////////////////////////////////////////


  ////////////////////////////////////////////////////Experian////////////////////////////////////////////////
  getAuthForExperian(){
    return this.http.get(this.baseurl1 + 'getauthexp');
  }
  submitExperianForm(accesstoken,url,AccountNumber,firstName,surName,dateOfBirth,gender,email,flatno,city,state,pincode,pan,mobileNo,ContactId,multibureauId,param1,param2,param3,param4,param5){
    return this.http.post(this.baseurl1 + 'reqdataexp', {accesstoken,url,AccountNumber,firstName,surName,dateOfBirth,gender,email,flatno,city,state,pincode,pan,mobileNo,ContactId,multibureauId,param1,param2,param3,param4,param5});
  }
  databaseEntryExperian(referncenumber){
    return this.http.post(this.baseurl1 + 'dbdataexp', {referncenumber});
  }
  sendOTP(mobileNumber){
    return this.http.get(this.baseurl1 + 'otpex/' + mobileNumber);
  }
  verifyOTP(otp){
    return this.http.get(this.baseurl1 + 'verifyotpex/' + otp);
  }
  getUserDetails(accesstoken, url, phone){
    return this.http.post(this.baseurl1 + 'reqformdataexp' , {accesstoken, url, phone});
  }
  experianPDF(Refrence_number){
    return this.http.post<any>(this.baseurl1 + 'ExperianPDFGenerate' , {Refrence_number}).pipe(map(res=>res.data));
  }
  downloadPDF(Refrence_number){
    return this.http.post<any>(this.baseurl1 + 'Experianpdfbase64' ,{Refrence_number}).pipe(map(res=>res.data));
  }
  ////////////////////////////////////////////////////Experian////////////////////////////////////////////////

  getBankDetail(phone, accesstoken, url) {
    return this.http.post(this.baseurl + 'bankdetail', { phone, accesstoken, url })
  }

  getLoanDetail(phone, accesstoken, url) {
    return this.http.post(this.baseurl + 'totalloancp', { phone, accesstoken, url })
  }

  getLoanCount(phone, accesstoken, url):Observable<any>{
    return this.http.post<any>(this.baseurl + 'totalloancountcp' , {phone, accesstoken, url}).pipe(map(response=>response.data[0]));
  }

  getLoanCountDetails(phone, accesstoken, url,limit,offset):Observable<any>{
    return this.http.post<any>(this.baseurl + 'totalloancountdatacp' , {phone, accesstoken, url,limit,offset})
  }

  getLoanOffer(phone, accesstoken, url) {
    return this.http.post(this.baseurl + 'offer', { phone, accesstoken, url })
  }
  getSpecificLoan(accesstoken, url, loanid) {
    return this.http.post(this.baseurl + 'loandetail', { accesstoken, url, loanid })
  }

  getPaymentSchedule(accesstoken, url, loanname) {
    return this.http.post(this.baseurl + 'paymentschedule', { accesstoken, url, loanname })
  }
  getStatement(accesstoken, url, loanname) {
    return this.http.post(this.baseurl + 'statement', { accesstoken, url, loanname })
  }

  getChannelPartner(phone){
    return this.http.post(this.baseurl + 'getchannelname' , {phone});
  }

  getbankdetailByLoan(accesstoken, url, loanname) {
    return this.http.post(this.baseurl + 'bankdetailbyloan', { accesstoken, url, loanname })
  }
  getmaturesumvalue(accesstoken, url, loanname) {
    return this.http.post(this.baseurl + 'maturesum', { accesstoken, url, loanname })
  }

  
  ExperianHistoryComponent

  // for nach and welcome letter
  getWelcomeLetter(accesstoken, url, loanid) {
    return this.http.post(this.baseurl + 'welcomeletter', { accesstoken, url, loanid })
  }
  createWelComeLetter(loanname,email,token,url,loanid) {
    return this.http.post(this.baseurl + 'createwelcomeletter', {loanname,email,token,url,loanid})
  }

  createNocLetter(opp_Acc_Name, OppAddress, Opp_Name, amount) {
    return this.http.post(this.baseurl + 'createnocletter', { opp_Acc_Name, OppAddress, Opp_Name, amount })
  }

  // for NACH Registration and payment
  getChechNach(accesstoken, url, loan_number) {
    return this.http.post(this.baseurl + 'checknach', { accesstoken, url, loan_number })
  }

  getCreateCo(phone, email, name, loanamount, methodcheck, loanname , account , account_type ,ifsc) {
    return this.http.post(this.baseurl + 'createcoportal', { phone, email, name, loanamount, methodcheck, loanname , account , account_type ,ifsc})
  }

  getNachRegistration(token,url,mobile,loanname,email,account,ifsc, bankformifsc,selectoption ,loanamount,name,customer_id,order_id,signature,payment_id,account_id,parntername,presentationdate,rztoken,account_type) {
    return this.http.post(this.baseurl + 'nachcp', {token,url,mobile,loanname,email,account,ifsc, bankformifsc,selectoption ,loanamount,
      name,customer_id,order_id,signature,payment_id,account_id,parntername,presentationdate,rztoken,account_type})
  }
  getTokenData(payment_id) {
    return this.http.post(this.baseurl + 'gettokenfromrzp', {payment_id})
  }
  
  getPayNow(phone, name, loanname, amount) {
    return this.http.post(this.baseurl + 'payorderid', { phone, name, loanname, amount })
  }

  // save nach records
  saveNACHrecords(phone,loan_number,payment_id,method,source,ppname){
    return this.http.post(this.baseurl + 'createnachlog',{phone,loan_number,payment_id,method,source,ppname});
  }

  //downloadStatement

  downloadStatement(OppID,opName){
    return this.http.post(this.baseurl + 'soadownload' , {OppID,opName});
  }

  // for blog and faq
  getPagination() {
    return this.http.get(this.baseurl + 'blogpaginglist')
  }
  getBlogList(pageno) {
    return this.http.post(this.baseurl + 'bloglist', { pageno })
  }
  getBlogDetails(blog_id) {
    return this.http.post(this.baseurl + 'blogsingleview', { blog_id })
  }
  getFAQ() {
    return this.http.get(this.baseurl + 'faqlist')
  }

  // for knowladge base
  getKBdata() {
    return this.http.get(this.baseurl + 'knowledgebase/knowledgebaselist')
  }
  getKBsearch(title) {
    return this.http.post(this.baseurl + 'knowledgebase/articlesearch/', { title })
  }


  // for ticket service request
  createTicketReq(Status, Origin, Type, Sub_Type__c, Priority, Associated_Loan__c, Contact_Info__c, subject, Description, Division__c, accesstoken, url, caller_phone__c,attachment) {
    return this.http.post(this.baseurl + 'createticket', { Status, Origin, Type, Sub_Type__c, Priority, Associated_Loan__c, Contact_Info__c, subject, Description, Division__c, accesstoken, url, caller_phone__c, attachment})
  }

  // for event tracking
  getEventName(phone,eventname,campign_number,source,partner){
    return this.http.post(this.baseurl + 'eventtrackcp', {phone,eventname,campign_number,source,partner})
  }

  getArticleSearch(search){
    return this.http.post(this.baseurl + 'knowledgebase/articlesearchheader' , {search});
  }

  getArticleDetails(article_id){
    return this.http.post(this.baseurl + 'knowledgebase/articledetails' , {article_id});
  }

  //notification

  getNotificationList(mobile,pageno,no_of_records_per_page,notification_type){
    return this.http.post(this.baseurl + 'notification/notificationlist' , {mobile,pageno,no_of_records_per_page,notification_type});
  }

  getTrendingDataList(pageno){
    return this.http.post(this.baseurl + 'bloglist' , {pageno});
  }
  

  //category

  getCategoryList(){
    return this.http.get(this.baseurl + 'knowledgebase/categoryactivelist');
  }

  getCategoryDetails(category_id,pageno,no_of_records_per_page){
    return this.http.post(this.baseurl + 'knowledgebase/articlecategorysearch', {category_id,pageno,no_of_records_per_page});
  }
  //FAQ

  getFAQList(){
    return this.http.get(this.baseurl + 'knowledgebase/articletopview');
  }

  //recentArticle

  getRecentActivity(category_id){
    return this.http.post(this.baseurl + 'knowledgebase/recentarticle', {category_id});
  }

  likeArticle(user_id,phone,article_id,likeunlike){
    return this.http.post(this.baseurl + 'knowledgebase/articlelikeunlike' , {user_id,phone,article_id,likeunlike});
  }

  //feedback

  getFeedback(phone,rating,description,accesstoken,url){
    return this.http.post(this.baseurl + 'sessionrating',{phone,rating,description,accesstoken,url});
  }

  getDetailsLoan(accesstoken,url,loanname){
    return this.http.post(this.baseurl + 'totalemicount',{accesstoken,url,loanname});
  }

  // tickets
  getlastthreeTkt(accesstoken,url,phone){
    return this.http.post(this.baseurl + 'viewlastthreeticket',{accesstoken,url,phone});
  }
  getalltickets(accesstoken,url,phone,no_of_records_per_page){
    return this.http.post(this.baseurl + 'viewmobileticket',{accesstoken,url,phone,no_of_records_per_page});
  }
  getticketdetails(accesstoken,url,phone,ticket_id){
    return this.http.post(this.baseurl + 'viewticket',{accesstoken,url,phone,ticket_id});
  } 


// create payment record
  getpaymentRecords(phone,loan_number,amount,source,method,customer_id,order_id,name,email){
    return this.http.post(this.baseurl + 'createpaymentlog',{phone,loan_number,amount,source,method,customer_id,order_id,name,email});
  }

  // forclouser 
  getUerEvent(partner_user_id,campign_number,eventname,recent_activity){
    return this.http.post(this.baseurl + 'eventreportpartner', { partner_user_id,campign_number,eventname,recent_activity })
  }
  getForclosure(accesstoken,url,loanname)
  {
    return this.http.post(this.baseurl + 'forcluser',{accesstoken,url,loanname});
  }
  foreclosurePayInfo(phone, loan_number, amount, method)
  {
    return this.http.post(this.baseurl + 'createpreclosurepaymentlog', {phone, loan_number, amount, method})
  }


  // ....................Credit Score....................
  getCreditScoreRecord(phone){
    return this.http.post(this.baseurl1+'reqfromfrontend', {phone});
  }
  getExperianDataByMBID(multibureauId){
    return this.http.post(this.baseurl1+'reqdatawithmbid',{multibureauId})
  }
  

}

