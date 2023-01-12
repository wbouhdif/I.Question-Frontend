import { AccountType } from "./account-type.model";

export class Account {

    id: string | undefined;
    email: string | undefined;
    password: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    authorised: boolean | undefined;
    type: AccountType | undefined;

    constructor(id? : string | undefined, email?: string, password?: string, firstName?: string, lastName?: string, authorised?: boolean, type?: AccountType) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.authorised = authorised;
        this.type = type;
    }
}
