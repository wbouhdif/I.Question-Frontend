import { AccountType } from "./account-type.model";

export class Account {
    private id: string | null;
    private email: string | null;
    private password: string | null;
    private firstName: string | null;
    private lastName: string | null;
    private authorised: boolean | null;
    private type: AccountType | null;

    constructor(id? : string | null, email?: string, password?: string, firstName?: string, lastName?: string, authorised?: boolean, type?: AccountType) {
        this.id = id ?? null;
        this.email = email ?? null;
        this.password = password ?? null;
        this.firstName = firstName ?? null;
        this.lastName = lastName ?? null;
        this.authorised = authorised ?? null;
        this.type = type ?? null;
    }
}