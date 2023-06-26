import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, mergeWith, switchMap, timer } from 'rxjs';
import { ActivitySummaryItem } from 'src/app/models/activity-summary';
import { TimeParser } from 'src/app/parsers/time-parser/time-parser';
import { ActivitySummaryService } from 'src/app/services/activity-summary/activity-summary.service';
import { ActivityService } from 'src/app/services/activity/activity.service';

@Component({
  selector: 'app-activity-summary',
  templateUrl: './activity-summary.component.html',
  styleUrls: ['./activity-summary.component.scss']
})
export class ActivitySummaryComponent implements OnInit {
  selectedDate: Date = new Date();
  selectedDateIsCurrent: boolean = true;
  selectedDateChanged: Subject<void> = new Subject<void>();

  activitySummaryItemsPollingSubscription: Subscription | null = null;
  activitySummaryItems: ActivitySummaryItem[] = [];

  activitySessionChanged: Subject<void> = new Subject<void>();

  currentTimePercentageSubscription: Subscription | null = null;
  currentTimePercentage: number = 0;

  constructor(
    private activitySummaryService: ActivitySummaryService,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {

    const activitySummaryItemsPollingObserver = {
      next: (activitySummaryItems: ActivitySummaryItem[]) => this.activitySummaryItems = activitySummaryItems
    }

    this.activitySummaryItemsPollingSubscription =
      timer(0, 1000).pipe(
        mergeWith(this.selectedDateChanged, this.activitySessionChanged),
        switchMap(() => this.activitySummaryService.getSummaryItems(this.selectedDate))
      ).subscribe(activitySummaryItemsPollingObserver);
    
    
    
    const currentTimePercentageObserver = {
      next: () => {
        let date: Date = new Date();
  
        let time: Time = {
          hours: date.getHours(),
          minutes: date.getMinutes()
        }
  
        this.currentTimePercentage = TimeParser.ParseFromTimeToPercentageOfDay(time);
      }
    };

    this.currentTimePercentageSubscription = timer(0, 60000).subscribe(currentTimePercentageObserver);
  }

  prev(): void {
    this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    this.selectedDate = structuredClone(this.selectedDate); // triggers change detection
    this.selectedDateChanged.next();
    this.setSelectedDateIsCurrentDate();
  }

  next(): void {
    this.selectedDate.setDate(this.selectedDate.getDate() + 1);
    this.selectedDate = structuredClone(this.selectedDate); // triggers change detection
    this.selectedDateChanged.next();
    this.setSelectedDateIsCurrentDate();
  }

  setSelectedDateIsCurrentDate(): void {
    let selectedDateOnly: Date = this.selectedDate;
    selectedDateOnly.setHours(0);
    selectedDateOnly.setSeconds(0);
    selectedDateOnly.setMilliseconds(0);

    let currentDateOnly: Date = new Date();
    currentDateOnly.setHours(0);
    currentDateOnly.setSeconds(0);
    currentDateOnly.setMilliseconds(0);
    
    this.selectedDateIsCurrent = selectedDateOnly.getTime() == currentDateOnly.getTime();
  }

  startSession(id: string): void {
    const observer = {
      complete: () => this.activitySessionChanged.next()
    }

    this.activityService.startSessionById(id).subscribe(observer);
  }

  endSession(id: string): void {
    const observer = {
      complete: () => this.activitySessionChanged.next()
    }

    this.activityService.endSessionById(id).subscribe(observer);
  }
}