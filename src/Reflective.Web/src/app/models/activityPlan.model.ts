import { Time, WeekDay } from "@angular/common";

export interface ActivityPlan{
    id: string;
    activityName: string;
    daysOfWeek: WeekDayMap;
    start: Time;
    end: Time;
    duration: Time;
}

export class WeekDayMap extends Map<WeekDay, boolean>{
    constructor() {
        super();
        for (let i = 0; i < 7; i++)
            this.set(i, false);
    }
}

export type ActivityPlanAdjustData = {
    daysOfWeek: WeekDayMap;
    start: Time;
    end: Time;
};