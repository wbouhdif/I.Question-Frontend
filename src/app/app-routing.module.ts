import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { QuestionnairesComponent } from "./questionnaires/questionnaires.component";
import { AnsweredQuestionnairesComponent } from "./answered-questionnaires/answered-questionnaires.component";
import { EditQuestionnaireComponent } from "./edit-questionnaire/edit-questionnaire.component";
import { AnswerQuestionnaireComponent } from "./answer-questionnaire/answer-questionnaire.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'questionnaires', component: QuestionnairesComponent },
  { path: 'answered-questionnaires', component: AnsweredQuestionnairesComponent },
  { path: 'create-questionnaire', component: EditQuestionnaireComponent },
  { path: 'edit-questionnaire/:id', component: EditQuestionnaireComponent },
  { path: 'answer-questionnaire/:id', component: AnswerQuestionnaireComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
