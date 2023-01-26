import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from "./register/register.component";
import { NavbarComponent } from './navbar/navbar.component';
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { AnsweredQuestionnairesComponent } from './answered-questionnaires/answered-questionnaires.component';
import { EditQuestionnaireComponent } from './edit-questionnaire/edit-questionnaire.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';
import { CreateQuestionComponent } from './edit-questionnaire/create-question/create-question.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AnswerQuestionnaireComponent } from './answer-questionnaire/answer-questionnaire.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {QuestionnaireAnswersComponent} from "./questionnaire-answers/questionnaire-answers.component";

import { AuthoriseAccountsComponent } from './authorise-accounts/authorise-accounts.component';
import { PasswordRequirementsComponent } from './register/password-requirements/password-requirements.component';
import { InspectAnonDataComponent } from './questionnaires/inspect-anon-data/inspect-anon-data.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    QuestionnairesComponent,
    AnsweredQuestionnairesComponent,
    EditQuestionnaireComponent,
    TableComponent,
    CreateQuestionComponent,
    AnswerQuestionnaireComponent,
    PageNotFoundComponent,
    CreateQuestionComponent,
    AuthoriseAccountsComponent,
    PasswordRequirementsComponent,
    InspectAnonDataComponent,
    QuestionnaireAnswersComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
