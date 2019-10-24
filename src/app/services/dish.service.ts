import { Injectable } from '@angular/core';
import {Dish} from "../menu/shared/Dish";
import {DISHES} from "../menu/shared/dishes";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Dish[]{
    return DISHES;
  }
}
