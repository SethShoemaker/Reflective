import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesPopupComponent } from './components/activities-popup/activities-popup.component';
import { ActivitiesPopupListComponent } from './components/activities-popup/activities-popup-list/activities-popup-list.component';
import { ActivitiesPopupCreateComponent } from './components/activities-popup/activities-popup-create/activities-popup-create.component';
import { ActivitiesPopupEditComponent } from './components/activities-popup/activities-popup-edit/activities-popup-edit.component';
import { ActivitiesPopupRemoveConfirmationComponent } from './components/activities-popup/activities-popup-remove-confirmation/activities-popup-remove-confirmation.component';
import { NetworkErrorPopupComponent } from './components/network-error-popup/network-error-popup.component';
import { ActivityPlansPopupComponent } from './components/activity-plans-popup/activity-plans-popup.component';
import { ActivityPlansPopupListComponent } from './components/activity-plans-popup/activity-plans-popup-list/activity-plans-popup-list.component';
import { ActivityPlansPopupCreateComponent } from './components/activity-plans-popup/activity-plans-popup-create/activity-plans-popup-create.component';
import { ActivityPlansPopupAdjustComponent } from './components/activity-plans-popup/activity-plans-popup-adjust/activity-plans-popup-adjust.component';
import { ActivityPlansPopupEndComponent } from './components/activity-plans-popup/activity-plans-popup-end/activity-plans-popup-end.component';

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
        title: "New Activity",
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
  },
  {
    path: "plans",
    component: ActivityPlansPopupComponent,
    children: [
      {
        path: "",
        title: "Plans",
        component: ActivityPlansPopupListComponent
      },
      {
        path: "create",
        title: "New Plan",
        component: ActivityPlansPopupCreateComponent
      },
      {
        path: "adjust/:id",
        title: "Adjust Plan",
        component: ActivityPlansPopupAdjustComponent
      },
      {
        path: "end/:id",
        title: "End Activity",
        component: ActivityPlansPopupEndComponent
      }
    ]
  },
  {
    path: "network-error",
    title: "Network Error",
    component: NetworkErrorPopupComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
