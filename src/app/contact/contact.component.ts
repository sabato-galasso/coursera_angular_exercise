import { Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Feedback, ContactType} from "../menu/shared/feedback";
import {expand, flyInOut} from "../animations/app.animation";
import {FeedbackService} from "../services/feedback.service";


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'], host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand(),
    flyInOut()
  ]
})
export class ContactComponent implements OnInit {

  @ViewChild('fform',{static: false}) feedbackFormDirective;

  feedbackForm: FormGroup;
  feedback:Feedback;
  contactType =  ContactType;
  feedbackCopy :Feedback;
  errMessFeed: string;
  showSpinner: boolean = false;


  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
    this.createForm();
  }

  ngOnInit() {
  }

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

   createForm():void {
    this.feedbackForm = this.fb.group(
      {
        firstname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)] ],
        lastname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
        telnum: [0, [Validators.required,Validators.pattern] ],
        email: ['', [Validators.required,Validators.email] ],
        agree: false,
        contacttype: 'None',
        message: ''
      }
    );

     this.feedbackForm.valueChanges
       .subscribe(data => this.onValueChanged(data));

     this.onValueChanged(); // (re)set validation messages now
  }



  onSubmit(){
    this.feedback = this.feedbackForm.value;
    this.showSpinner = true;
    this.feedbackService.submitFeedback(this.feedback).subscribe(feedback => {
        this.feedback = feedback; this.feedbackCopy = feedback;
      },
      errmess => { this.feedback = null; this.feedbackCopy = null; this.errMessFeed = <any>errmess; },
      () => {console.log("Observable finished");  this.showSpinner = false;}
      );

    setTimeout(() => {
      this.feedbackCopy = null
    },5000);

    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }


  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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
