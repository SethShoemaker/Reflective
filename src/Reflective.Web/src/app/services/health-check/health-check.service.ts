import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {

  constructor(private http: HttpClient) { }

  check() : Observable<any> {
    return this.http.get("/health-check");
  }
}
