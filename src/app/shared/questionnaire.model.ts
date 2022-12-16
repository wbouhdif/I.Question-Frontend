import {Account} from "./account.model";

export class Questionnaire {
  private _id: string | undefined;
  private _name: string | undefined;
  private _account: Account | undefined;
  private _length: number | undefined;

  constructor(id?: string | undefined, name?: string, account?: Account) {
    this._id = id ?? undefined;
    this._name = name ?? undefined;
    this._account = account ?? undefined;
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  get name(): string | undefined {
    return this._name;
  }

  set name(value: string | undefined) {
    this._name = value;
  }

  get account(): Account | undefined {
    return this._account;
  }

  set account(value: Account | undefined) {
    this._account = value;
  }

  set length(value: number | undefined) {
    this._length = value;
  }

  get length(): number | undefined {
    return this._length;
  }
}
