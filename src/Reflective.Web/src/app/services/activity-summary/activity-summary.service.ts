import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActivitySummaryItem, ActivitySummaryItemPlan, ActivitySummaryItemSession } from 'src/app/models/activity-summary';
import { TimeParser } from 'src/app/parsers/time-parser/time-parser';

@Injectable({
  providedIn: 'root'
})
export class ActivitySummaryService {

  constructor(private http: HttpClient) { }
  
  getSummaryItems(date: Date): Observable<ActivitySummaryItem[]>{

    interface ActivitySummaryItemDto {
      id: string;
      name: string;
      sessions: ActivitySummaryItemSessionDto[];
      plans: ActivitySummaryItemPlanDto[];
    }
  
    interface ActivitySummaryItemSessionDto{
      id: string;
      start: string;
      startedOnPrevDay: boolean;
      end: string | null;
      endedOnNextDay: boolean;
    }
  
    interface ActivitySummaryItemPlanDto{
      id: string;
      start: string;
      startsOnPrevDay: boolean;
      end: string;
      endsOnNextDay: boolean;
    }

    return this.http.get<ActivitySummaryItemDto[]>(`/activities/summary/${date.toDateString()}`).pipe(
      map((dtos: ActivitySummaryItemDto[]) => {
        let transformedActivitySummaryItems: ActivitySummaryItem[] = [];

        for (let i = 0; i < dtos.length; i++) {
          const dto: ActivitySummaryItemDto = dtos[i];
          
          let transformedActivitySummaryItemSessions: ActivitySummaryItemSession[] = [];
          for (let j = 0; j < dto.sessions.length; j++) {
            const sessionDto: ActivitySummaryItemSessionDto = dto.sessions[j];
            
            let transformedActivitySummarySession: ActivitySummaryItemSession = {
              id: sessionDto.id,
              startPercentage: TimeParser.ParseFromStringToPercentageOfDay(sessionDto.start),
              startedOnPrevDay: sessionDto.startedOnPrevDay,
              endPercentage: sessionDto.end == null ? null : TimeParser.ParseFromStringToPercentageOfDay(sessionDto.end),
              endedOnNextDay: sessionDto.endedOnNextDay
            };

            transformedActivitySummaryItemSessions[j] = transformedActivitySummarySession;
          }

          let transformedActivitySummaryItemPlans: ActivitySummaryItemPlan[] = [];
          for (let j = 0; j < dto.plans.length; j++) {
            const planDto = dto.plans[j];
            
            let transformedActivitySummaryItemPlan: ActivitySummaryItemPlan = {
              id: planDto.id,
              startPercentage: TimeParser.ParseFromStringToPercentageOfDay(planDto.start),
              startsOnPrevDay: planDto.startsOnPrevDay,
              endPercentage: TimeParser.ParseFromStringToPercentageOfDay(planDto.end),
              endsOnNextDay: planDto.endsOnNextDay
            }

            transformedActivitySummaryItemPlans[j] = transformedActivitySummaryItemPlan;
          }

          let transformedActivitySummaryItem: ActivitySummaryItem = {
            id: dto.id,
            name: dto.name,
            sessions: transformedActivitySummaryItemSessions,
            plans: transformedActivitySummaryItemPlans
          }

          transformedActivitySummaryItems[i] = transformedActivitySummaryItem;
        }
        
        return transformedActivitySummaryItems;
      })
    );
  }
}
