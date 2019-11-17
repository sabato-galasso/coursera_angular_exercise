import { Injectable } from '@angular/core';
import {Leader} from "../menu/shared/Leader";
import {LEADERS} from "../menu/shared/leaders";
import { Observable, of } from 'rxjs';
import {catchError, delay, map} from "rxjs/operators";
import {Promotion} from "../menu/shared/Promotion";
import {baseURL} from "../menu/shared/baseurl";
import {HttpClient} from "@angular/common/http";
import {ProcessHTTPMsgService} from "./process-httpmsg.service";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,private processHTTPMsgService: ProcessHTTPMsgService) { }


  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }


  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
