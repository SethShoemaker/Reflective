import { WeekDayMap } from "src/app/models/activityPlan.model";

export class WeekDayMapParser {
    static ParseFromNumberArray(a: number[]): WeekDayMap{

        let weekDayMap: WeekDayMap = new WeekDayMap();

        for (let i = 0; i < a.length; i++) {

            const weekDayCode = a[i];

            // checks if number has any decimal places
            if (weekDayCode - Math.floor(weekDayCode) != 0)
                throw Error(`\"${weekDayCode}\" is not a valid weekday code`);

            if (weekDayCode > 6 || weekDayCode < 0)
                throw Error(`\"${weekDayCode}\" is not a valid weekday code`);

            weekDayMap.set(weekDayCode, true);
        }

        return weekDayMap;
    }
}
