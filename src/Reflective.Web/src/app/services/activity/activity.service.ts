import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getList(): Observable<Activity[]> {
    return this.http.get<Activity[]>("/activities/list");
  }
}