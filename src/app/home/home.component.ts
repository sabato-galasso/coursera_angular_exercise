import { Component, OnInit } from '@angular/core';
import {DishService} from "../services/dish.service";
import {PromotionService} from "../services/promotion.service";
import {LeaderService} from "../services/leader.service";
import {Dish} from "../menu/shared/Dish";
import {Promotion} from "../menu/shared/Promotion";
import {Leader} from "../menu/shared/Leader";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  constructor(private dishservice: DishService,
              private promotionservice: PromotionService,
              private leaderservice: LeaderService) { }

  ngOnInit() {
    this.dish = this.dishservice.getFeaturedDish();
    this.promotion = this.promotionservice.getFeaturedPromotion();
    this.leader =  this.leaderservice.getFeaturedLeader()
  }

}
