import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/models/activity.model';
import { ActivityService } from 'src/app/services/activity/activity.service';

@Component({
  selector: 'app-activities-popup-list',
  templateUrl: './activities-popup-list.component.html',
  styleUrls: ['./activities-popup-list.component.scss']
})
export class ActivitiesPopupListComponent implements OnInit {
  activities: Activity[] = [];

  constructor(
    private activityService: ActivityService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const observer = {
      next: (activities: Activity[]) => this.activities = activities
    }

    this.activityService.getList().subscribe(observer);
  }

  newButtonClicked() {
    this.router.navigateByUrl("/activities/create");
  }

  editButtonClicked(id: string) {
    this.router.navigateByUrl(`/activities/edit/${id}`);
  }

  removeButtonClicked(id: string) {
    this.router.navigateByUrl(`/activities/remove/${id}`);
  }
}
