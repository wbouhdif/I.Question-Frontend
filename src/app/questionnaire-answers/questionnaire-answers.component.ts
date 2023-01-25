import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {HttpService} from "../services/http.service";
import {UserService} from "../services/user.service";
import {Questionnaire} from "../shared/questionnaire.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-questionnaire-answers',
  templateUrl: './questionnnaire-answers.component.html',
  styleUrls: ['./questionnaire-answers.component.scss']
})
export class QuestionnaireAnswersComponent implements OnInit{

  questionnaire: Questionnaire | any;
  routeId: any;
  questionnaireAnswers: any;

  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router, private userService: UserService) {
  }



  ngOnInit() {
    this.route.params.subscribe(params => {
      this.routeId = params['id'];
    })
  }


}
