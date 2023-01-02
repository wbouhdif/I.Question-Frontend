import {Account} from "./account.model";
import {Questionnaire} from "./questionnaire.model";

export class AnsweredQuestionnaire {

  id: string | undefined;
  caregiver: Account | undefined;
  questionnaire: Questionnaire | undefined;
  clientName: string | undefined;

  constructor(id?: string | undefined, caregiver?: Account, questionnaire?: Questionnaire, clientName?: string) {
    this.id = id;
    this.caregiver = caregiver;
    this.questionnaire = questionnaire;
    this.clientName = clientName;
  }

}
