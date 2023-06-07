import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeekDayMap } from 'src/app/models/activityPlan.model';
import { ActivityPlansService } from 'src/app/services/activity-plans/activity-plans.service';

@Component({
  selector: 'app-plans-popup-create',
  templateUrl: './plans-popup-create.component.html',
  styleUrls: ['./plans-popup-create.component.scss']
})
export class PlansPopupCreateComponent implements OnInit {
  shouldDisplayFeedback: boolean = false;

  activityId: string = "";
  activityIdIsInvalid: boolean = true;

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

    if (!this.timesAreValid || !this.daysOfWeekAreValid || this.activityIdIsInvalid) return;

    const observer = {
      
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
  
  onDaysOfWeekChange(daysOfWeek: WeekDayMap) {
    this.daysOfWeek = daysOfWeek;
  }

  onStartTimeChange(startTime: Time) {
    this.startTime = startTime;
  }

  onEndTimeChange(endTime: Time) {
    this.endTime = endTime;
  }
}
