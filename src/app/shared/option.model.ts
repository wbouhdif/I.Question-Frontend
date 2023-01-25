import {Question} from "./question.model";

export class Option {
  id: string | undefined;
  text: string | undefined;
  position: number | undefined;
  question: Question | undefined;

  constructor(id?: string | undefined, text?: string, position?: number, question?: Question) {
    this.id = id;
    this.text = text;
    this.position = position;
    this.question = question;
  }
}
