import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { ActivityService } from 'src/app/services/activity/activity.service';

@Component({
  selector: 'app-activity-select',
  templateUrl: './activity-select.component.html',
  styleUrls: ['./activity-select.component.scss']
})
export class ActivitySelectComponent implements OnInit {
  @Output() activityId: EventEmitter<string> = new EventEmitter<string>();
  @Output() activityIdIsValid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() shouldDisplayFeedback: boolean = false;

  internalActivityId: string = "";
  internalActivityIdIsInvalid: boolean = true;

  activities: Activity[] = [];

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {

    const observer = {
      next: (activities: Activity[]) => this.activities = activities
    }

    this.activityService.getList().subscribe(observer);
  }

  onSelect() {
    this.internalActivityIdIsInvalid = this.internalActivityId.length == 0;

    this.activityId.emit(this.internalActivityId);
    this.activityIdIsValid.emit(this.internalActivityIdIsInvalid);
  }

  feedbackIsVisible(): boolean {
    return this.shouldDisplayFeedback && this.internalActivityIdIsInvalid;
  }

}
