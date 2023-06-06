import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/models/activity.model';
import { WeekDayMap } from 'src/app/models/activityPlan.model';
import { ActivityPlansService } from 'src/app/services/activity-plans/activity-plans.service';
import { ActivityService } from 'src/app/services/activity/activity.service';

@Component({
  selector: 'app-plans-popup-create',
  templateUrl: './plans-popup-create.component.html',
  styleUrls: ['./plans-popup-create.component.scss']
})
export class PlansPopupCreateComponent implements OnInit {
  selectedActivityId: number = 0;

  weekDays: WeekDayMap = new WeekDayMap();

  startTime: Time = { hours: 0, minutes: 0 };
  endTime: Time = { hours: 0, minutes: 0 };
  timesAreValid: boolean = false;

  activities: Activity[] = [];

  constructor(
    private activityService: ActivityService,
    private activityPlanService: ActivityPlansService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const observer = {
      next: (activities: Activity[]) => this.activities = activities
    }

    this.activityService.getList().subscribe(observer);
  }

  submit() {

    if (!this.timesAreValid) return;
  }

  cancel() {
    this.router.navigateByUrl("/plans");
  }
}
