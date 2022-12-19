export class AccountType {
    private _id: string | undefined;
    private _name: string | undefined;

    constructor(id?: string | undefined, name?: string) {
        this._id = id;
        this._name = name;
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

}
