import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/services/activity/activity.service';

@Component({
  selector: 'app-activities-popup-remove-confirmation',
  templateUrl: './activities-popup-remove-confirmation.component.html',
  styleUrls: ['./activities-popup-remove-confirmation.component.scss']
})
export class ActivitiesPopupRemoveConfirmationComponent implements OnInit {
  activityName: string = "";
  activityId: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.activityId = this.route.snapshot.paramMap.get("id") ?? "";

    const observer = {
      next: (name: string | null) => {
        if (name == null)
          this.router.navigateByUrl("/activities");
        else
          this.activityName = name;
      }
    }

    this.activityService.getNameById(this.activityId).subscribe(observer);
  }

  remove() {
    const observer = {
      next: () => this.router.navigateByUrl("/activities"),
      error: () => this.router.navigateByUrl("/activities"),
    }

    this.activityService.stopTrackingById(this.activityId).subscribe(observer);
  }

  cancel() { this.router.navigateByUrl("/activities") }
}
