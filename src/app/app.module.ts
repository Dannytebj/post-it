import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthComponent } from './components/auth/auth.component';
// Services
import { AuthService } from './shared/services/auth.service';
import { MessageService } from './shared/services/message.service';
import { GroupService } from './shared/services/group.service';
import { InputComponent } from './components/commons/input/input.component';
import { ButtonComponent } from './components/commons/button/button.component';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { GroupComponent } from './components/group/group.component';
import { CreateGroupModalComponent } from './components/create-group-modal/create-group-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthComponent,
    InputComponent,
    ButtonComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    GroupComponent,
    CreateGroupModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    CreateGroupModalComponent
  ],
  providers: [
    AuthService,
    GroupService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
