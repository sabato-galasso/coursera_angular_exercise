import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Dish} from "../menu/shared/Dish";
import {Comment} from "../menu/shared/Comment";
import {Params, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {DishService} from "../services/dish.service";
import {switchMap} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  @ViewChild('fform', {static: false}) commentFormDirective;

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  comment: Comment;
  errMess: string;
  dishcopy: Dish;


  constructor(private dishService: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              @Inject('BaseURL') private baseURL
  ) {
  }

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Author Name is required.',
      'minlength': 'Author Name must be at least 2 characters long.',
      'maxlength': 'Author cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comment description is required.',
      'minlength': 'Comment description must be at least 2 characters long.',
    }
  };

  ngOnInit() {
    this.createForm();
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds,errmess => this.errMess = <any>errmess);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe(dish => {
        this.dish = dish;
        this.dishcopy = dish;
        this.setPrevNext(dish.id);
      },errmess => this.errMess = <any>errmess );
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  createForm(): void {
    this.commentForm = this.fb.group(
      {
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        rating: [5],
        comment: ['', [Validators.required, Validators.minLength(2)]],
      }
    );

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  formatLabel(value: number) {
    if (value) {
      return value;
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    let now = new Date();
    this.comment.date = now.toISOString();
    debugger
    this.dish.comments.push(this.comment);
    this.dishcopy.comments.push(this.comment);
    console.log(this.dishcopy)

    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => {
          this.dish = dish; this.dishcopy = dish;
        },
        errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    this.commentFormDirective.resetForm();
    this.commentForm.controls['rating'].setValue(5);

  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
