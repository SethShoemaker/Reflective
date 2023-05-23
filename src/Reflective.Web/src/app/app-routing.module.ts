import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesPopupComponent } from './components/activities-popup/activities-popup.component';
import { ActivitiesPopupListComponent } from './components/activities-popup/activities-popup-list/activities-popup-list.component';
import { ActivitiesPopupCreateComponent } from './components/activities-popup/activities-popup-create/activities-popup-create.component';
import { ActivitiesPopupEditComponent } from './components/activities-popup/activities-popup-edit/activities-popup-edit.component';
import { ActivitiesPopupRemoveConfirmationComponent } from './components/activities-popup/activities-popup-remove-confirmation/activities-popup-remove-confirmation.component';

const routes: Routes = [
  {
    path: "activities",
    component: ActivitiesPopupComponent,
    children: [
      {
        path: "",
        title: "Activities",
        component: ActivitiesPopupListComponent
      },
      {
        path: "create",
        title: "Create Activity",
        component: ActivitiesPopupCreateComponent
      },
      {
        path: "edit/:id",
        title: "Edit Activity",
        component: ActivitiesPopupEditComponent
      },
      {
        path: "remove/:id",
        title: "Remove Activity",
        component: ActivitiesPopupRemoveConfirmationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
