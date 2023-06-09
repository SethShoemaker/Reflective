import { Time } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
  @Input() shouldDisplayFeedback: boolean = false;
  @Input() initialStartTime: Time | null = null;
  @Input() initialEndTime: Time | null = null;

  initialStartTimeWasSet: boolean = false;
  initialEndTimeWasSet: boolean = false;

  internalStartTime: Time = { hours: NaN, minutes: NaN };
  internalEndTime: Time = { hours: NaN, minutes: NaN };
  internalTimesAreValid: boolean = false;

  internalDuration: Time = { hours: 0, minutes: 0 };

  startTimeString: string = "";
  endTimeString: string = "";

  constructor() {} 

  ngOnInit(): void {}
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes["initialStartTime"])
      if (changes["initialStartTime"].currentValue != null && this.initialStartTimeWasSet == false) {
        this.internalStartTime = changes["initialStartTime"].currentValue;
        this.startTimeString = TimeParser.ParseTo24HourString(changes["initialStartTime"].currentValue);

        this.initialStartTimeWasSet = true;

        this.startTime.emit(this.internalStartTime);

        this.determineIfTimesAreValid();
        this.determineDuration();
      }
    
    if(changes["initialEndTime"])
      if (changes["initialEndTime"].currentValue != null && this.initialEndTimeWasSet == false) {
        this.internalEndTime = changes["initialEndTime"].currentValue;
        this.endTimeString = TimeParser.ParseTo24HourString(changes["initialEndTime"].currentValue);

        this.initialEndTimeWasSet = true;

        this.endTime.emit(this.internalEndTime);

        this.determineIfTimesAreValid();
        this.determineDuration();
      }
  }

  onStartTimeChange() {
    this.internalStartTime = TimeParser.ParseFrom24HourString(this.startTimeString);
    this.startTime.emit(this.internalStartTime);
    this.determineIfTimesAreValid();
    this.determineDuration();
  }

  onEndTimeChange() {
    this.internalEndTime = TimeParser.ParseFrom24HourString(this.endTimeString);
    this.endTime.emit(this.internalEndTime);
    this.determineIfTimesAreValid();
    this.determineDuration();
  }

  determineDuration() {
    if (this.inputsAreFilled() == false) return;

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

    this.internalDuration = newDuration;
  }

  determineIfTimesAreValid() {
    this.internalTimesAreValid =
      this.inputsAreFilled() &&
      (this.internalStartTime.hours != this.internalEndTime.hours || this.internalStartTime.minutes != this.internalEndTime.minutes);
    
    if (this.inputsAreFilled() && !this.internalTimesAreValid) this.shouldDisplayFeedback = true;
    this.timesAreValid.emit(this.internalTimesAreValid);
  }

  inputsAreFilled(): boolean {
    return (
      isNaN(this.internalStartTime.hours) == false &&
      isNaN(this.internalStartTime.minutes) == false &&
      isNaN(this.internalEndTime.hours) == false &&
      isNaN(this.internalEndTime.minutes) == false
    );
  }

  feedbackIsVisible(): boolean{
    return this.shouldDisplayFeedback && !this.internalTimesAreValid;
  }

  getFeedBackMessage(): string {
    return this.inputsAreFilled()
      ? "End time must be different from start time"
      : "You must select and start and end time";
  }
}
