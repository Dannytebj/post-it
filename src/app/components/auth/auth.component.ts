import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicFormComponent } from './../dynamic-form/dynamic-form.component';
import { FieldConfig } from './../../field.interface';
import { formConfig } from './../commons/formConfigs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  signInConfig: FieldConfig[] = [ formConfig.email, formConfig.password, { type: 'button', label: 'Sign In' }];
  signupConfig: FieldConfig[] = [ formConfig.name, formConfig.email, formConfig.password, { type: 'button', label: 'Sign Up' }];
  isSignIn = true;
  title = 'SIGN IN';
  constructor() { }

  ngOnInit() {

  }

  signIn() {
    if (this.isSignIn) {

    }
  }
  toggleForm() {
    this.title = (this.isSignIn) ? 'SIGN UP' : 'SIGN IN';
    return this.isSignIn = !this.isSignIn;
  }
  submit(value: any) {
    console.log(value);
  }

}
