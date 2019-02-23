import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DynamicFormComponent } from './../dynamic-form/dynamic-form.component';
import { FieldConfig } from '../../shared/interfaces/field.interface';
import { formConfig } from './../commons/formConfigs';
import { AuthService } from './../../shared/services/auth.service';
import { FirebaseResponse } from './../../shared/interfaces/firebaseResponse.interface';

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
  constructor(
    public authService: AuthService,
    public toastr: ToastrService
  ) { }

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
    if (this.isSignIn) {
      const { email, password } = value;
      this.authService.signIn(email, password);
    } else {
      const { email, password, name } = value;
      this.authService.signUp(email, password, name);
    }
  }

}
