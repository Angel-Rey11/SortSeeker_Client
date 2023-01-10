import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {RequestData} from "../model/RequestData";
import {RequestResult} from "../model/RequestResult";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  lastResult: RequestResult;

  constructor(private readonly http: HttpClient) { }

  public getAllResults(): Observable<RequestResult[]> {
    return this.http.get<RequestResult[]>(`${environment.serverURL}/requestSort/all`);
  }
  public requestSorting(requestData: RequestData): Observable<RequestResult> {
    return this.http.post<RequestResult>(`${environment.serverURL}/requestSort/`, requestData);
  }
  public deleteResult(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.serverURL}/requestSort/` + id);
  }
}
