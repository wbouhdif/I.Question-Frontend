export class Question {
  private id: string | undefined;
  private type: string | undefined;
  private text: string | undefined;
  private mandatory: string | undefined;

  constructor(id?: string | undefined, type?: string, text?: string, mandatory?: string) {
    this.id = id;
    this.type = type;
    this.text = text;
    this.mandatory = mandatory;
  }
}
