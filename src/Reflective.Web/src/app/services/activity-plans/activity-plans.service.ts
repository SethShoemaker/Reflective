import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActivityPlan, ActivityPlanAdjustData, WeekDayMap } from 'src/app/models/activityPlan.model';
import { TimeParser } from 'src/app/parsers/time-parser/time-parser';
import { WeekDayMapParser } from 'src/app/parsers/weekday-map-parser/weekday-map-parser';

@Injectable({
  providedIn: 'root'
})
export class ActivityPlansService {

  constructor(private http: HttpClient) { }

  getList(): Observable<ActivityPlan[]> {
    
    interface ActivityPlanDto{
      id: string;
      activityName: string;
      daysOfWeek: number[];
      start: string;
      end: string;
      duration: string;
    }

    return this.http.get<ActivityPlanDto[]>("/activities/plans/list").pipe(
      map((dtos: ActivityPlanDto[]) => {

        let transformedActivityPlans: ActivityPlan[] = [];

        for (let i = 0; i < dtos.length; i++) {
          
          const dto = dtos[i];

          let transformedActivityPlan: ActivityPlan = {
            id: dto.id,
            activityName:  dto.activityName,
            daysOfWeek: WeekDayMapParser.ParseFromNumberArray(dto.daysOfWeek),
            start: TimeParser.ParseFrom24HourString(dto.start),
            end: TimeParser.ParseFrom24HourString(dto.end),
            duration: TimeParser.ParseFrom24HourString(dto.duration)
          };

          transformedActivityPlans[i] = transformedActivityPlan;
        }

        return transformedActivityPlans;
      })
    );
  }

  getAdjustData(activityPlanId: string): Observable<ActivityPlanAdjustData>{
    interface GetAdjustDataDto {
      daysOfWeek: number[];
      start: string;
      end: string;
    };

    return this.http.get<GetAdjustDataDto>(`/activities/plans/adjust/${activityPlanId}`).pipe(
      map((dto: GetAdjustDataDto) => {
        return {
          daysOfWeek: WeekDayMapParser.ParseFromNumberArray(dto.daysOfWeek),
          start: TimeParser.ParseFrom24HourString(dto.start),
          end: TimeParser.ParseFrom24HourString(dto.end)
        };
      })
    );
  }

  saveAdjustData(activityPlanId: string, daysOfWeek: WeekDayMap, startTime: Time, endTime: Time): Observable<any>{
    return this.http.post(`/activities/plans/adjust/${activityPlanId}`, {
      activityPlanId: activityPlanId,
      startTime: TimeParser.ParseTo24HourString(startTime),
      endTime: TimeParser.ParseTo24HourString(endTime),
      daysOfWeek: WeekDayMapParser.ParseToNumberArray(daysOfWeek)
    })
  }

  create(activityId: string, daysOfWeek: WeekDayMap, startTime: Time, endTime: Time): Observable<any> {
    return this.http.post("/activities/plans/create", {
      activityId: activityId,
      startTime: TimeParser.ParseTo24HourString(startTime),
      endTime: TimeParser.ParseTo24HourString(endTime),
      daysOfWeek: WeekDayMapParser.ParseToNumberArray(daysOfWeek)
    })
  }
}