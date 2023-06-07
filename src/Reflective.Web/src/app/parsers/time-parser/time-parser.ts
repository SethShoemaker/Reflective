import { Time } from "@angular/common";

export class TimeParser {
    static ParseFrom24HourString(s: string): Time {

        let split: string[] = s.split(":");

        let time: Time = { hours: 0, minutes: 0 };

        time.hours = parseInt(split[0]);
        time.minutes = parseInt(split[1]);

        return time;
    }

    static ParseTo24HourString(t: Time): string{

        let hourString: string = t.hours.toString();

        if (t.hours < 10)
            hourString = "0" + hourString;
        
        let minuteString: string = t.minutes.toString();

        if (t.minutes < 10)
            minuteString = "0" + minuteString;

        return `${hourString}:${minuteString}:00`;
    }
}
