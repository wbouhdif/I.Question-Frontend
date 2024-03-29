import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { QuestionnairesComponent } from "./questionnaires/questionnaires.component";
import { AnsweredQuestionnairesComponent } from "./answered-questionnaires/answered-questionnaires.component";
import { EditQuestionnaireComponent } from "./edit-questionnaire/edit-questionnaire.component";
import { AnswerQuestionnaireComponent } from "./questionnaires/answer-questionnaire/answer-questionnaire.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthoriseAccountsComponent } from "./authorise-accounts/authorise-accounts.component";
import { InspectAnonDataComponent } from "./questionnaires/inspect-anon-data/inspect-anon-data.component";
import { QuestionnaireAnswersComponent } from "./answered-questionnaires/questionnaire-answers/questionnaire-answers.component";
import { ResetPasswordComponent } from "./login/reset-password/reset-password.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inspect-anondata/:id', component: InspectAnonDataComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'questionnaires', component: QuestionnairesComponent },
  { path: 'answered-questionnaires', component: AnsweredQuestionnairesComponent },
  { path: 'create-questionnaire', component: EditQuestionnaireComponent },
  { path: 'edit-questionnaire/:id', component: EditQuestionnaireComponent },
  { path: 'answer-questionnaire/:id', component: AnswerQuestionnaireComponent },
  { path: 'account-management', component: AuthoriseAccountsComponent },
  { path: 'questionnaire-answers/:id', component: QuestionnaireAnswersComponent},
  { path: 'password-reset', component: ResetPasswordComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
