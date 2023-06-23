import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityPlan, WeekDayMap } from 'src/app/models/activityPlan.model';
import { ActivityPlansService } from 'src/app/services/activity-plans/activity-plans.service';

@Component({
  selector: 'app-activity-plans-popup-adjust',
  templateUrl: './activity-plans-popup-adjust.component.html',
  styleUrls: ['./activity-plans-popup-adjust.component.scss']
})
export class ActivityPlansPopupAdjustComponent implements OnInit {
  shouldDisplayFeedback: boolean = false;

  activityPlanId: string = "";

  initialDaysOfWeek: WeekDayMap | null = null;
  daysOfWeek: WeekDayMap = new WeekDayMap();
  daysOfWeekAreValid: boolean = false;

  initialStartTime: Time | null = null;
  initialEndTime: Time | null = null;
  startTime: Time = { hours: 0, minutes: 0 };
  endTime: Time = { hours: 0, minutes: 0 };
  timesAreValid: boolean = false;

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
      next: (adjustData: ActivityPlan) => {
        this.initialDaysOfWeek = adjustData.daysOfWeek;
        this.initialStartTime = adjustData.start;
        this.initialEndTime = adjustData.end;
      },
      error: () => this.router.navigateByUrl("/plans")
    }

    this.activityPlanService.getActive(this.activityPlanId).subscribe(observer);
  }

  submit() {
    this.shouldDisplayFeedback = true;

    if (!this.timesAreValid || !this.daysOfWeekAreValid) return;

    const observer = {
      next: () => this.router.navigateByUrl("/plans"),
      error: () => this.router.navigateByUrl("/plans")
    }

    this.activityPlanService.adjust(this.activityPlanId, this.daysOfWeek, this.startTime, this.endTime).subscribe(observer);
  }

  cancel() {
    this.router.navigateByUrl("/plans");
  }

  /* 
    Updating objects by specifying the property in the template doesn't work, this somehow works though.
    Probably has something to do with passing by reference.
  */
  onDaysOfWeekChange(daysOfWeek: WeekDayMap) {
    this.daysOfWeek = daysOfWeek;
  }

  onDaysOfWeekAreValidChange(daysOfWeekAreValid: boolean) {
    this.daysOfWeekAreValid = daysOfWeekAreValid;
  }

  onStartTimeChange(startTime: Time) {
    this.startTime = startTime;
  }

  onEndTimeChange(endTime: Time) {
    this.endTime = endTime;
  }

  onTimesAreValidChange(timesAreValid: boolean) {
    this.timesAreValid = timesAreValid;
  }
}
