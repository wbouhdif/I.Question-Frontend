import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    QuestionnairesComponent,
    AnsweredQuestionnairesComponent,
    EditQuestionnaireComponent,
    TableComponent,
    CreateQuestionComponent,
    AnswerQuestionnaireComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
