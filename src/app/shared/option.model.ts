import {Question} from "./question.model";

export class Option {
  private id: string | undefined;
  private text: string | undefined;
  private question: Question | undefined;

  constructor(id?: string | undefined, text?: string, question?: Question) {
    this.id = id ?? undefined;
    this.text = text ?? undefined;
    this.question = question ?? undefined;
  }
}
