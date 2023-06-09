import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api/api.interceptor';
import { PopupComponent } from './components/shared/popup/popup.component';
import { ActivitiesPopupComponent } from './components/activities-popup/activities-popup.component';
import { ActivitiesPopupListComponent } from './components/activities-popup/activities-popup-list/activities-popup-list.component';
import { ActivitiesPopupEditComponent } from './components/activities-popup/activities-popup-edit/activities-popup-edit.component';
import { ActivitiesPopupRemoveConfirmationComponent } from './components/activities-popup/activities-popup-remove-confirmation/activities-popup-remove-confirmation.component';
import { ActivitiesPopupCreateComponent } from './components/activities-popup/activities-popup-create/activities-popup-create.component';
import { FormsModule } from '@angular/forms';
import { CancelButtonComponent } from './components/shared/cancel-button/cancel-button.component';
import { NetworkErrorPopupComponent } from './components/network-error-popup/network-error-popup.component';
import { NetworkErrorInterceptor } from './interceptors/network-error/network-error.interceptor';
import { ActivityPlansPopupComponent } from './components/activity-plans-popup/activity-plans-popup.component';
import { ActivityPlansPopupListComponent } from './components/activity-plans-popup/activity-plans-popup-list/activity-plans-popup-list.component';
import { ActivityPlansPopupCreateComponent } from './components/activity-plans-popup/activity-plans-popup-create/activity-plans-popup-create.component';
import { DurationPipe } from './pipes/duration/duration.pipe';
import { TimeOfDayPipe } from './pipes/time-of-day/time-of-day.pipe';
import { DaysOfWeekInputComponent } from './components/shared/days-of-week-input/days-of-week-input.component';
import { StartAndEndTimeInputComponent } from './components/shared/start-and-end-time-input/start-and-end-time-input.component';
import { ActivitySelectComponent } from './components/shared/activity-select-component/activity-select.component';
import { ActivityPlansPopupAdjustComponent } from './components/activity-plans-popup/activity-plans-popup-adjust/activity-plans-popup-adjust.component';
import { ActivityPlansPopupEndComponent } from './components/activity-plans-popup/activity-plans-popup-end/activity-plans-popup-end.component';
import { ActivitySummaryComponent } from './components/activity-summary/activity-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PopupComponent,
    ActivitiesPopupComponent,
    ActivitiesPopupListComponent,
    ActivitiesPopupEditComponent,
    ActivitiesPopupRemoveConfirmationComponent,
    ActivitiesPopupCreateComponent,
    CancelButtonComponent,
    NetworkErrorPopupComponent,
    ActivityPlansPopupComponent,
    ActivityPlansPopupListComponent,
    ActivityPlansPopupCreateComponent,
    DurationPipe,
    TimeOfDayPipe,
    DaysOfWeekInputComponent,
    StartAndEndTimeInputComponent,
    ActivitySelectComponent,
    ActivityPlansPopupAdjustComponent,
    ActivityPlansPopupEndComponent,
    ActivitySummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NetworkErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
