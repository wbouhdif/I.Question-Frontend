export class AccountType {
    private id: string | undefined;
    private name: string | undefined;
    private canManageQuestionnaires: boolean | undefined;
    private canFillQuestionnaires: boolean | undefined;
    private canAuthoriseAccounts: boolean | undefined;
    private canViewAnonymousData: boolean | undefined;
    private canViewPersonalisedData: boolean | undefined;

    constructor(id?: string | undefined, name?: string, canManageQuestionnaires?: boolean, canFillQuestionnaires?: boolean, canAuthoriseAccounts?: boolean, canViewAnonymousData?: boolean, canViewPersonalisedData?: boolean) {
        this.id = id ?? undefined;
        this.name = name ?? undefined;
        this.canManageQuestionnaires = canManageQuestionnaires ?? undefined;
        this.canFillQuestionnaires = canFillQuestionnaires ?? undefined;
        this.canAuthoriseAccounts = canAuthoriseAccounts ?? undefined;
        this.canViewAnonymousData = canViewAnonymousData ?? undefined;
        this.canViewPersonalisedData = canViewPersonalisedData ?? undefined;
    }
}
