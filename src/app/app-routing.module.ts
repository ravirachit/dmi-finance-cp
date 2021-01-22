import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { LoanOfferComponent } from './loan-offer/loan-offer.component';
import { FaqComponent } from './faq/faq.component';
import { WelcomeletterComponent } from './welcomeletter/welcomeletter.component';
import { LoanStatementComponent } from './loan-statement/loan-statement.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { PaymentScheduleComponent } from './payment-schedule/payment-schedule.component';
import { MyDuesComponent } from './my-dues/my-dues.component';
import { NocComponent } from './noc/noc.component';
import { ExperianTermsComponent } from './main-layout/experian-terms/experian-terms.component';
import { NewLoanAppComponent } from './new-loan-app/new-loan-app.component';
import { RaiseDisputeComponent } from './raise-dispute/raise-dispute.component';
import { PaymentSummaryComponent } from './payment-summary/payment-summary.component';
import { ProfileeditComponent } from './profileedit/profileedit.component';
import { BlogComponent } from './blog/blog.component';
import { BlogdetailsComponent } from './blog/blogdetails/blogdetails.component';
import { KnowladgebaseComponent } from './knowladgebase/knowladgebase.component';
import { SearchComponent } from './knowladgebase/search/search.component';
import { CategoriesComponent } from './knowladgebase/categories/categories.component';
import { HelpCenterComponent } from './help-center/help-center.component';
import { TicketDetailsComponent } from './help-center/ticket-details/ticket-details.component';
import { NotificationDetailsComponent } from './help-center/notification-details/notification-details.component';
import { CategoryDetailsComponent } from './help-center/category-details/category-details.component';
import { CategoryListDetailsComponent } from './help-center/category-details/category-list-details/category-list-details.component';
import { CreateTicketsComponent } from './help-center/create-tickets/create-tickets.component';
import { AuthGuard } from './_guards';
import { SessionExpiredComponent } from './session-expired/session-expired.component';
import { FeedbackComponent } from './main-layout/feedback/feedback.component';
import { CreditScoreComponent } from './credit-score/credit-score.component';
import { GenerateCreditScoreComponent } from './generate-credit-score/generate-credit-score.component';
import { ForclouserComponent } from './forclouser/forclouser.component';
import { ExperianHistoryComponent } from './modal/experian-history/experian-history.component';


const routes: Routes = [
  { path: '', component: CustomerLoginComponent,pathMatch: 'prefix'},
  { path: 'dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard],pathMatch: 'prefix'},
  { path: 'loanDetail', component: LoanDetailComponent, canActivate: [AuthGuard]},
  { path: 'loanOffer', component: LoanOfferComponent, canActivate: [AuthGuard]},
  { path: 'faq', component: FaqComponent, canActivate: [AuthGuard]},
  { path: 'welcomeletter', component: WelcomeletterComponent, canActivate: [AuthGuard]},
  { path: 'loanstatement', component: LoanStatementComponent, canActivate: [AuthGuard]},
  { path: 'customerSupport', component: CustomerSupportComponent, canActivate: [AuthGuard]},
  { path: 'paymentSchedule', component: PaymentScheduleComponent, canActivate: [AuthGuard]},
  { path: 'myDues', component: MyDuesComponent, canActivate: [AuthGuard]},
  { path: 'noc', component: NocComponent, canActivate: [AuthGuard]},
  { path: 'newloanapplication', component: NewLoanAppComponent, canActivate: [AuthGuard]},
  { path: 'raiseAdispute', component: RaiseDisputeComponent, canActivate: [AuthGuard]},
  { path: 'paymentSummary', component: PaymentSummaryComponent, canActivate: [AuthGuard]},
  { path: 'profileedit', component: ProfileeditComponent, canActivate: [AuthGuard]},
  { path: 'experian-terms', component: ExperianTermsComponent, canActivate: [AuthGuard]},
  { path: 'blog', component: BlogComponent, canActivate: [AuthGuard]},
  { path: 'blogdetails', component: BlogdetailsComponent, canActivate: [AuthGuard]},
  { path: 'knowladgebase', component: KnowladgebaseComponent, canActivate: [AuthGuard]},
  { path: 'knowladgebase/search', component: SearchComponent, canActivate: [AuthGuard]},
  { path: 'knowladgebase/categories', component: CategoriesComponent, canActivate: [AuthGuard]},
  { path: 'helpcenter', component: HelpCenterComponent, canActivate: [AuthGuard]},
  { path: 'helpcenter/serviceticketdetails', component: TicketDetailsComponent, canActivate: [AuthGuard]},
  { path: 'helpcenter/notification&alertdetails', component: NotificationDetailsComponent, canActivate: [AuthGuard]},
  { path: 'helpcenter/categorydetails', component: CategoryDetailsComponent, canActivate: [AuthGuard]},
  { path: 'categorylistdetails', component: CategoryListDetailsComponent, canActivate: [AuthGuard]},
  { path: 'helpcenter/createtickets', component: CreateTicketsComponent, canActivate: [AuthGuard]},
  { path: 'customerportal&currentuser&sessiontimeout', component: SessionExpiredComponent},
  { path: 'createtickets', component: CreateTicketsComponent, canActivate: [AuthGuard]},
  { path: 'feedback',component:FeedbackComponent,canActivate:[AuthGuard]},
  { path: 'creditScore', component: CreditScoreComponent,canActivate:[AuthGuard]},
  { path: 'generate-credit-score', component: GenerateCreditScoreComponent,canActivate:[AuthGuard]},
  {path: 'foreclosure', component: ForclouserComponent,canActivate:[AuthGuard]},
  {path: 'creditScoreDetail', component: ExperianHistoryComponent,canActivate:[AuthGuard]}
];
// customer?%portal&?currentuser?session?%
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routing = RouterModule.forRoot(routes);
// , canActivate: [AuthGuard]
