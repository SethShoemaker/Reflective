import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivitySummaryItem } from 'src/app/models/activity-summary';
import { ActivitySummaryService } from 'src/app/services/activity-summary/activity-summary.service';

@Component({
  selector: 'app-activity-summary',
  templateUrl: './activity-summary.component.html',
  styleUrls: ['./activity-summary.component.scss']
})
export class ActivitySummaryComponent implements OnInit {
  selectedDate: Date = new Date();
  activitySummaryItems: ActivitySummaryItem[] = [];

  private activitySummarySubscription: Subscription | null = null;

  constructor(
    private activitySummaryService: ActivitySummaryService
  ) {}

  ngOnInit(): void {

    this.getSummaryItems();
  }

  getSummaryItems(): void {
    const observer = {
      next: (activitySummaryItems: ActivitySummaryItem[]) => this.activitySummaryItems = activitySummaryItems,
    }

    this.activitySummarySubscription = this.activitySummaryService.getSummaryItems(this.selectedDate).subscribe(observer);
  }

  prev() {
    this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    this.selectedDate = structuredClone(this.selectedDate);
    this.getSummaryItems();
  }

  next() {
    this.selectedDate.setDate(this.selectedDate.getDate() + 1);
    this.selectedDate = structuredClone(this.selectedDate);
    this.getSummaryItems();
  }
}