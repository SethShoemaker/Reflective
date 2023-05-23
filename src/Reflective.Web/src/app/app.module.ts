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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PopupComponent,
    ActivitiesPopupComponent,
    ActivitiesPopupListComponent,
    ActivitiesPopupEditComponent,
    ActivitiesPopupRemoveConfirmationComponent,
    ActivitiesPopupCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
