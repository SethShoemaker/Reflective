import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { WeekDayMap } from 'src/app/models/activityPlan.model';

@Component({
  selector: 'app-days-of-week-input',
  templateUrl: './days-of-week-input.component.html',
  styleUrls: ['./days-of-week-input.component.scss']
})
export class DaysOfWeekInputComponent implements OnInit {
  @Output() daysOfWeek: EventEmitter<WeekDayMap> = new EventEmitter<WeekDayMap>();
  @Output() daysOfWeekAreValid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() shouldDisplayFeedback: boolean = false;
  @Input() initialWeekDays: WeekDayMap | null = null;

  initialWeekDaysWasSet: boolean = false;

  internalIsValid: boolean = false;
  internalWeekDays: WeekDayMap = new WeekDayMap();

  constructor() { }

  ngOnInit(): void {}
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes["initialWeekDays"])
      if (changes["initialWeekDays"].currentValue != null && !this.initialWeekDaysWasSet) {
        this.internalWeekDays = changes["initialWeekDays"].currentValue;

        this.initialWeekDaysWasSet = true;

        this.daysOfWeek.emit(this.internalWeekDays);
        
        this.determineIfDaysOfWeekAreValid();
      }
  }

  toggleWeekDay(weekDayCode: number) {
    let currentWeekDayStatus: boolean | undefined = this.internalWeekDays.get(weekDayCode);
    this.internalWeekDays.set(weekDayCode, !currentWeekDayStatus);
    this.daysOfWeek.emit(this.internalWeekDays);

    this.determineIfDaysOfWeekAreValid();
  }

  determineIfDaysOfWeekAreValid() {
    this.internalIsValid = false;

    for (let i = 0; i < 6; i++)
      if (this.internalWeekDays.get(i))
        this.internalIsValid = true;
    
    this.daysOfWeekAreValid.emit(this.internalIsValid);
  }

  feedbackIsVisible(): boolean {
    return this.shouldDisplayFeedback && !this.internalIsValid;
  }
}