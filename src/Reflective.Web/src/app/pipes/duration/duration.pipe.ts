import { Time } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(time: Time): string {

    let durationString: string = "";

    if (time.hours > 0)
      durationString += `${time.hours} hours`;
    
    if (time.minutes > 0) {

      if (time.hours > 0)
        durationString += " ";

      durationString += `${time.minutes} minutes`;
    }
    
    return durationString;
  }

}
