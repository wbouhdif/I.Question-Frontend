import {Account} from "./account.model";
import {Questionnaire} from "./questionnaire.model";

export class AnsweredQuestionnaire {

  private _id: string | undefined;
  private _caregiver: Account | undefined;
  private _questionnaire: Questionnaire | undefined;
  private _clientName: string | undefined;

  constructor(id?: string | undefined, caregiver?: Account, questionnaire?: Questionnaire, clientName?: string) {
    this._id = id;
    this._caregiver = caregiver;
    this._questionnaire = questionnaire;
    this._clientName = clientName;
  }


  get id(): string | undefined {
    return this._id;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  get caregiver(): Account | undefined {
    return this._caregiver;
  }

  set caregiver(value: Account | undefined) {
    this._caregiver = value;
  }

  get questionnaire(): Questionnaire | undefined {
    return this._questionnaire;
  }

  set questionnaire(value: Questionnaire | undefined) {
    this._questionnaire = value;
  }

  get clientName(): string | undefined {
    return this._clientName;
  }

  set clientName(value: string | undefined) {
    this._clientName = value;
  }
}
