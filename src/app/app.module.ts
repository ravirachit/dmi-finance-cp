import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgOtpInputModule } from 'ng-otp-input';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule,HttpClientXsrfModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerLoginComponent,FormatTimePipe } from './customer-login/customer-login.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
// import { fakeBackendProvider } from './_helpers';
// import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { LoanOfferComponent } from './loan-offer/loan-offer.component';
import { FooterComponent } from './footer/footer.component';
import { FaqComponent } from './faq/faq.component';
import { WelcomeletterComponent } from './welcomeletter/welcomeletter.component';
import { LoanStatementComponent } from './loan-statement/loan-statement.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { PaymentScheduleComponent } from './payment-schedule/payment-schedule.component';
import { MyDuesComponent } from './my-dues/my-dues.component';
import { NocComponent } from './noc/noc.component';
import { NewLoanAppComponent } from './new-loan-app/new-loan-app.component';
import { RaiseDisputeComponent } from './raise-dispute/raise-dispute.component';
import { inrFormat } from './currencyFormat';
import { PaymentSummaryComponent } from './payment-summary/payment-summary.component';
import { ProfileeditComponent } from './profileedit/profileedit.component';
import { BlogComponent } from './blog/blog.component';
import { BlogdetailsComponent } from './blog/blogdetails/blogdetails.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from './main-layout/header/header.component';
import { SidenavComponent } from './main-layout/sidenav/sidenav.component';
import { ExperianTermsComponent } from './main-layout/experian-terms/experian-terms.component';
import { OwlModule } from 'ng2-owl-carousel';
import { BlogsliderComponent } from './blog/blogslider/blogslider.component';
import { KnowladgebaseComponent } from './knowladgebase/knowladgebase.component';
import { SearchComponent } from './knowladgebase/search/search.component';
import { CategoriesComponent } from './knowladgebase/categories/categories.component';
import { HelpCenterComponent } from './help-center/help-center.component';
import { LoanFilterPipe } from './loan-filter.pipe';
import { TicketDetailsComponent } from './help-center/ticket-details/ticket-details.component';
import { NotificationDetailsComponent } from './help-center/notification-details/notification-details.component';
import { CategoryDetailsComponent } from './help-center/category-details/category-details.component';
import { CategoryListDetailsComponent } from './help-center/category-details/category-list-details/category-list-details.component';
import { CreateTicketsComponent } from './help-center/create-tickets/create-tickets.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { FeedbackComponent } from './main-layout/feedback/feedback.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule,MatBottomSheetModule,MatCheckboxModule} from '@angular/material';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { UserIdleModule } from 'angular-user-idle';
import { SessionExpiredComponent } from './session-expired/session-expired.component';
import { ServiceWorkerModule} from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { SafePipe } from './safe.pipe';
import { CreditScoreComponent } from './credit-score/credit-score.component';
import { GenerateCreditScoreComponent } from './generate-credit-score/generate-credit-score.component';
import { ForclouserComponent } from './forclouser/forclouser.component';
import { ExperianModalComponent } from './modal/experian-modal/experian-modal.component';
import { OtpVerificationComponent } from './modal/otp-verification/otp-verification.component';
import { ExperianHistoryComponent } from './modal/experian-history/experian-history.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerLoginComponent,
    FormatTimePipe,
    CustomerDashboardComponent,
    MainLayoutComponent,
    LoanDetailComponent,
    LoanOfferComponent,
    FooterComponent,
    FaqComponent,
    WelcomeletterComponent,
    LoanStatementComponent,
    CustomerSupportComponent,
    PaymentScheduleComponent,
    MyDuesComponent,
    NocComponent,
    NewLoanAppComponent,
    RaiseDisputeComponent,
    inrFormat,
    LoanFilterPipe,
    PaymentSummaryComponent,
    ProfileeditComponent,
    BlogComponent,
    BlogdetailsComponent,
    HeaderComponent,
    SidenavComponent,
    ExperianTermsComponent,
    BlogsliderComponent,
    KnowladgebaseComponent,
    SearchComponent,
    CategoriesComponent,
    HelpCenterComponent,
    TicketDetailsComponent,
    NotificationDetailsComponent,
    CategoryDetailsComponent,
    CategoryListDetailsComponent,
    CreateTicketsComponent,
    FeedbackComponent,
    SessionExpiredComponent,
    BottomSheetComponent,
    SafePipe,
    CreditScoreComponent,
    GenerateCreditScoreComponent,
    ForclouserComponent,
    ExperianModalComponent,
    OtpVerificationComponent,
    ExperianHistoryComponent
  ],
  imports: [
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    UserIdleModule.forRoot({idle: 600, timeout: 30}),
    DeviceDetectorModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    OwlModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatRadioModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    NgOtpInputModule,
    MatCheckboxModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [BottomSheetComponent,
    ExperianModalComponent,OtpVerificationComponent,
    ExperianHistoryComponent],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
