import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from './navbar/navbar.component';
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { AnsweredQuestionnairesComponent } from './answered-questionnaires/answered-questionnaires.component';
import { AuthoriseAccountsComponent } from './authorise-accounts/authorise-accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    QuestionnairesComponent,
    AnsweredQuestionnairesComponent,
    AuthoriseAccountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
