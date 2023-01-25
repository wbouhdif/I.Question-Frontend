import {jsonIgnore} from "json-ignore";

export class Question {
  id: string | undefined;
  type: string | undefined;
  text: string | undefined;
  dateCreated: Date | undefined;

  @jsonIgnore()
  options: any;

  constructor(id?: string | undefined, type?: string, text?: string, dateCreated?: Date) {
    this.id = id;
    this.type = type;
    this.text = text;
  }
}
