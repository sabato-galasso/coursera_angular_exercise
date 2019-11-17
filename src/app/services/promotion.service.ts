import { Injectable } from '@angular/core';
import {Promotion} from "../menu/shared/Promotion";
import {PROMOTIONS} from "../menu/shared/promotions";
import { Observable, of } from 'rxjs';
import {catchError, delay, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {ProcessHTTPMsgService} from "./process-httpmsg.service";
import {Dish} from "../menu/shared/Dish";
import {baseURL} from "../menu/shared/baseurl";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }


  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
