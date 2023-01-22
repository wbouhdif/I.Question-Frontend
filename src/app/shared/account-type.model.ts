export class AccountType {

    private id: string | undefined;
    name: string | undefined;

    constructor(id?: string | undefined, name?: string) {
        this.id = id;
        this.name = name;
    }

    public getId(): string | undefined {
        return this.id;
    }

    public getName(): string | undefined {
        return this.name;
    }
}
