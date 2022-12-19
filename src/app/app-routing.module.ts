import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {QuestionnairesComponent} from "./questionnaires/questionnaires.component";
import {AnsweredQuestionnairesComponent} from "./answered-questionnaires/answered-questionnaires.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'questionnaires', component: QuestionnairesComponent },
  { path: 'answered-questionnaires', component: AnsweredQuestionnairesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
