import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityPlan } from 'src/app/models/activityPlan.model';
import { ActivityPlansService } from 'src/app/services/activity-plans/activity-plans.service';

@Component({
  selector: 'app-plans-popup-list',
  templateUrl: './plans-popup-list.component.html',
  styleUrls: ['./plans-popup-list.component.scss']
})
export class PlansPopupListComponent implements OnInit {
  activityPlans: ActivityPlan[] = [];

  constructor(
    private activityPlanService: ActivityPlansService,
    private router: Router
  ) { }

  ngOnInit(): void {

    const observer = {
      next: (activityPlans: ActivityPlan[]) => this.activityPlans = activityPlans,
    };

    this.activityPlanService.getList().subscribe(observer);
  }

  newButtonClicked() {
    this.router.navigateByUrl("/plans/create");
  }

  adjustButtonClicked(id: string) {
    this.router.navigateByUrl(`/plans/adjust/${id}`);
  }

  endButtonClicked(id: string) {
    this.router.navigateByUrl(`/plans/end/${id}`);
  }
}