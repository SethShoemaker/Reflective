import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesPopupComponent } from './components/activities-popup/activities-popup.component';
import { ActivitiesPopupListComponent } from './components/activities-popup/activities-popup-list/activities-popup-list.component';
import { ActivitiesPopupCreateComponent } from './components/activities-popup/activities-popup-create/activities-popup-create.component';
import { ActivitiesPopupEditComponent } from './components/activities-popup/activities-popup-edit/activities-popup-edit.component';
import { ActivitiesPopupRemoveConfirmationComponent } from './components/activities-popup/activities-popup-remove-confirmation/activities-popup-remove-confirmation.component';
import { NetworkErrorPopupComponent } from './components/network-error-popup/network-error-popup.component';
import { PlansPopupComponent } from './components/plans-popup/plans-popup.component';
import { PlansPopupListComponent } from './components/plans-popup/plans-popup-list/plans-popup-list.component';
import { PlansPopupCreateComponent } from './components/plans-popup/plans-popup-create/plans-popup-create.component';
import { PlansPopupAdjustComponent } from './components/plans-popup/plans-popup-adjust/plans-popup-adjust.component';
import { PlansPopupEndComponent } from './components/plans-popup/plans-popup-end/plans-popup-end.component';

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
    component: PlansPopupComponent,
    children: [
      {
        path: "",
        title: "Plans",
        component: PlansPopupListComponent
      },
      {
        path: "create",
        title: "New Plan",
        component: PlansPopupCreateComponent
      },
      {
        path: "adjust/:id",
        title: "Adjust Plan",
        component: PlansPopupAdjustComponent
      },
      {
        path: "end/:id",
        title: "End Activity",
        component: PlansPopupEndComponent
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
