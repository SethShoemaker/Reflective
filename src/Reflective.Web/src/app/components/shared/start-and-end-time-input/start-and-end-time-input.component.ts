import { Time } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TimeParser } from 'src/app/parsers/time-parser/time-parser';

@Component({
  selector: 'app-start-and-end-time-input',
  templateUrl: './start-and-end-time-input.component.html',
  styleUrls: ['./start-and-end-time-input.component.scss']
})
export class StartAndEndTimeInputComponent implements OnInit {
  @Output() startTime: EventEmitter<Time> = new EventEmitter<Time>();
  @Output() endTime: EventEmitter<Time> = new EventEmitter<Time>();
  @Output() timesAreValid: EventEmitter<boolean> = new EventEmitter<boolean>();

  internalStartTime: Time = { hours: NaN, minutes: NaN };
  internalEndTime: Time = { hours: NaN, minutes: NaN };
  internalTimesAreValid: boolean = true;

  duration: Time = { hours: 0, minutes: 0 };

  startTimeString: string = "";
  endTimeString: string = "";

  constructor() {}

  ngOnInit(): void {}

  parseStartTimeString() {
    this.internalStartTime = TimeParser.ParseFrom24HourString(this.startTimeString);
    this.startTime.emit(this.internalStartTime);
    this.determineIfTimesAreValid();
    this.determineDuration();
  }

  parseEndTimeString() {
    this.internalEndTime = TimeParser.ParseFrom24HourString(this.endTimeString);
    this.startTime.emit(this.internalEndTime);
    this.determineIfTimesAreValid();
    this.determineDuration();
  }

  determineDuration() {
    if (
        isNaN(this.internalStartTime.hours) ||
        isNaN(this.internalStartTime.minutes) ||
        isNaN(this.internalEndTime.hours) ||
        isNaN(this.internalEndTime.minutes)
    ) return;

    let newDuration: Time = { hours: 0, minutes: 0 };

    newDuration.hours = this.internalEndTime.hours - this.internalStartTime.hours;

    const durationSpansAcrossMultipleDays: boolean = 
      this.internalStartTime.hours > this.internalEndTime.hours ||
      (this.internalStartTime.hours == this.internalEndTime.hours && this.internalStartTime.minutes > this.internalEndTime.minutes);

    if (durationSpansAcrossMultipleDays)
      newDuration.hours += 24;
  
    newDuration.minutes = this.internalEndTime.minutes - this.internalStartTime.minutes;

    if (this.internalStartTime.minutes > this.internalEndTime.minutes) {
      newDuration.hours -= 1;
      newDuration.minutes += 60;
    }

    this.duration = newDuration;
  }

  determineIfTimesAreValid() {
    this.internalTimesAreValid =
      this.internalStartTime.hours != this.internalEndTime.hours ||
      this.internalStartTime.minutes != this.internalEndTime.minutes;
  }
}
