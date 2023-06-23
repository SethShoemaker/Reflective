import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeekDayMap } from 'src/app/models/activityPlan.model';
import { ActivityPlansService } from 'src/app/services/activity-plans/activity-plans.service';

@Component({
  selector: 'app-activity-plans-popup-create',
  templateUrl: './activity-plans-popup-create.component.html',
  styleUrls: ['./activity-plans-popup-create.component.scss']
})
export class ActivityPlansPopupCreateComponent implements OnInit {
  shouldDisplayFeedback: boolean = false;

  activityId: string = "";
  activityIdIsValid: boolean = false;

  daysOfWeek: WeekDayMap = new WeekDayMap();
  daysOfWeekAreValid: boolean = false;

  startTime: Time = { hours: 0, minutes: 0 };
  endTime: Time = { hours: 0, minutes: 0 };
  timesAreValid: boolean = false;

  constructor(
    private activityPlanService: ActivityPlansService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submit() {
    this.shouldDisplayFeedback = true;

    if (!this.timesAreValid || !this.daysOfWeekAreValid || !this.activityIdIsValid) return;

    const observer = {
      next: () => this.router.navigateByUrl("/plans"),
      error: () => this.router.navigateByUrl("/plans")
    }

    this.activityPlanService.create(this.activityId, this.daysOfWeek, this.startTime, this.endTime).subscribe(observer);
  }

  cancel() {
    this.router.navigateByUrl("/plans");
  }

  /* 
    Updating objects by specifying the property in the template doesn't work, this somehow works though.
    Probably has something to do with passing by reference.
  */
  onActivityIdChange(activityId: string) {
    this.activityId = activityId;
  }

  onActivityIdIsValidChange(activityIdIsValid: boolean) {
    this.activityIdIsValid = activityIdIsValid;
  }
  
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
