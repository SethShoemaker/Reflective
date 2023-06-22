import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityPlan } from 'src/app/models/activityPlan.model';
import { ActivityPlansService } from 'src/app/services/activity-plans/activity-plans.service';

@Component({
  selector: 'app-plans-popup-end',
  templateUrl: './plans-popup-end.component.html',
  styleUrls: ['./plans-popup-end.component.scss']
})
export class PlansPopupEndComponent implements OnInit {
  planActivityName: string = "";

  activityPlanId: string = "";

  constructor(
    private activityPlanService: ActivityPlansService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    let activityPlanId: string | null = this.route.snapshot.paramMap.get("id");

    if (activityPlanId == null)
      this.router.navigateByUrl("/plans");
    else
      this.activityPlanId = activityPlanId;
    
    const observer = {
      next: (activityPlan: ActivityPlan) => this.planActivityName = activityPlan.activityName,
      error: () => this.router.navigateByUrl("/plans")
    }

    this.activityPlanService.getActive(this.activityPlanId).subscribe(observer);
  }

  cancel() { this.router.navigateByUrl("/plans"); }

  remove() {
    
    const observer = {
      next: () => this.router.navigateByUrl("/plans"),
      error: () => this.router.navigateByUrl("/plans")
    }

    this.activityPlanService.end(this.activityPlanId).subscribe(observer);
  }

}
