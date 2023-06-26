import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Activity } from 'src/app/models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  
  constructor(private http: HttpClient) {}

  getList(): Observable<Activity[]> {
    return this.http.get<Activity[]>("/activities/list");
  }

  create(name: string, description: string | null): Observable<HttpResponse<any>>{
    return this.http.post<HttpResponse<any>>("/activities/create", {
      name: name,
      description: description
    });
  }

  getNameAndDescriptionById(id: string) : Observable<Activity> {
    return this.http.get<Activity>(`/activities/edit/${id}`);
  }

  saveNameAndDescriptionById(id: string, name: string, description: string | null) {
    return this.http.post<HttpResponse<any>>(`/activities/edit/${id}`, {
      name: name,
      description: description
    });
  }

  getNameById(id: string): Observable<string | null>{
    return this.http.get<{ name: string | null; }>(`/activities/get-name/${id}`)
      .pipe(map(res => res.name));
  }

  stopTrackingById(id: string): Observable<any>{
    return this.http.get(`/activities/stop-tracking/${id}`);
  }

  startSessionById(id: string): Observable<void>{
    return this.http.get<void>(`/activities/start-session/${id}`);
  }

  endSessionById(id: string): Observable<void>{
    return this.http.get<void>(`/activities/end-session/${id}`);
  }
}