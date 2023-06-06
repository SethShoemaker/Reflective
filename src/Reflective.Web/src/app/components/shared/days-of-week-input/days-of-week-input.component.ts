import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WeekDayMap } from 'src/app/models/activityPlan.model';

@Component({
  selector: 'app-days-of-week-input',
  templateUrl: './days-of-week-input.component.html',
  styleUrls: ['./days-of-week-input.component.scss']
})
export class DaysOfWeekInputComponent implements OnInit {
  @Output() weekDays: EventEmitter<WeekDayMap> = new EventEmitter<WeekDayMap>();

  internalWeekDays: WeekDayMap = new WeekDayMap();

  constructor() { }

  ngOnInit(): void {}

  toggleWeekDay(weekDayCode: number) {
    let currentWeekDayStatus: boolean | undefined = this.internalWeekDays.get(weekDayCode);
    this.internalWeekDays.set(weekDayCode, !currentWeekDayStatus);

    this.weekDays.emit(this.internalWeekDays);
  }
}