import { Time } from "@angular/common";

export class TimeParser {
    static ParseFrom24HourString(s: string): Time {

        let split: string[] = s.split(":");

        let time: Time = { hours: 0, minutes: 0 };

        time.hours = parseInt(split[0]);
        time.minutes = parseInt(split[1]);

        return time;
    }
}
