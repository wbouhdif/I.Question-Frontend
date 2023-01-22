import {Account} from "./account.model";
import { jsonIgnore } from "json-ignore";

export class Questionnaire {
  id: string | undefined;
  name: string | undefined;
  account: Account | undefined;
  dateCreated: Date | undefined;

    @jsonIgnore()
    answeredCount: number | undefined;

    @jsonIgnore()
    length: number | undefined;

  constructor(id?: string | undefined, name?: string, account?: Account) {
    this.id = id;
    this.name = name;
    this.account = account;
  }
}
