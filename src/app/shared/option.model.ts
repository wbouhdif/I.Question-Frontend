import {Question} from "./question.model";

export class Option {
  id: string | undefined;
  text: string | undefined;
  question: Question | undefined;

  constructor(id?: string | undefined, text?: string, question?: Question) {
    this.id = id;
    this.text = text;
    this.question = question;
  }
}
