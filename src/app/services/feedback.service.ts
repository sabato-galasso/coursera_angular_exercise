import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {baseURL} from "../menu/shared/baseurl";
import {catchError, delay} from "rxjs/operators";
import {ProcessHTTPMsgService} from "./process-httpmsg.service";
import {Feedback} from "../menu/shared/feedback";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,private processHTTPMsgService: ProcessHTTPMsgService){}


  submitFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback', feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
