import { Injectable } from '@angular/core';
import {Leader} from "../menu/shared/Leader";
import {LEADERS} from "../menu/shared/leaders";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Leader[]{
    return LEADERS;
}

  getFeaturedLeader(): Leader{
    return LEADERS.filter((leader)=> (leader.featured))[0]
  }

}
