import { AccountType } from "./account-type.model";

export class Account {
    private _id: string | undefined;
    private _email: string | undefined;
    private _password: string | undefined;
    private _firstName: string | undefined;
    private _lastName: string | undefined;
    private _authorised: boolean | undefined;
    private _type: AccountType | undefined;

    constructor(id? : string | undefined, email?: string, password?: string, firstName?: string, lastName?: string, authorised?: boolean, type?: AccountType) {
        this._id = id;
        this._email = email;
        this._password = password;
        this._firstName = firstName;
        this._lastName = lastName;
        this._authorised = authorised;
        this._type = type;
    }


  get id(): string | undefined {
    return this._id;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  get email(): string | undefined {
    return this._email;
  }

  set email(value: string | undefined) {
    this._email = value;
  }

  get password(): string | undefined {
    return this._password;
  }

  set password(value: string | undefined) {
    this._password = value;
  }

  get firstName(): string | undefined {
    return this._firstName;
  }

  set firstName(value: string | undefined) {
    this._firstName = value;
  }

  get lastName(): string | undefined {
    return this._lastName;
  }

  set lastName(value: string | undefined) {
    this._lastName = value;
  }

  get authorised(): boolean | undefined {
    return this._authorised;
  }

  set authorised(value: boolean | undefined) {
    this._authorised = value;
  }

  get type(): AccountType | undefined {
    return this._type;
  }

  set type(value: AccountType | undefined) {
    this._type = value;
  }
}
