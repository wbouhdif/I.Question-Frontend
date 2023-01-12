export class Question {
  id: string | undefined;
  type: string | undefined;
  text: string | undefined;

  constructor(id?: string | undefined, type?: string, text?: string) {
    this.id = id;
    this.type = type;
    this.text = text;
  }
}
