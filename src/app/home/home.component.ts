import {Component, Inject, OnInit} from '@angular/core';
import {DishService} from "../services/dish.service";
import {PromotionService} from "../services/promotion.service";
import {LeaderService} from "../services/leader.service";
import {Dish} from "../menu/shared/Dish";
import {Promotion} from "../menu/shared/Promotion";
import {Leader} from "../menu/shared/Leader";
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;

  constructor(private dishservice: DishService,
              private promotionservice: PromotionService,
              private leaderservice: LeaderService,
              @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,disherrmess => this.dishErrMess= <any>disherrmess);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion, promoerrmess => this.promoErrMess = <any>promoerrmess);
    this.leaderservice.getFeaturedLeader().subscribe(leader =>  this.leader = leader, leadererrmess => this.leaderErrMess = <any>leadererrmess);
  }

}
