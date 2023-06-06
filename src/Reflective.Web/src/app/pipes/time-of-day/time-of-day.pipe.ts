import { Time } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeOfDay'
})
export class TimeOfDayPipe implements PipeTransform {

  transform(time: Time): string {

    let numHours: number = time.hours;

    const isAfternoon: boolean = numHours >= 12;

    if (numHours > 12)
      numHours -= 12;
    
    let hoursString: string = numHours.toString();

    if (numHours == 0)
      hoursString = "12";
    
    let minutesString = time.minutes.toString();

    if (time.minutes < 10)
      minutesString = "0" + minutesString;

    return `${hoursString}:${minutesString} ${isAfternoon ? "PM" : "AM"}`;
  }
  
}
