export class AccountType {
    private id: string | null;
    private name: string | null;
    private canManageQuestionnaires: boolean | null;
    private canFillQuestionnaires: boolean | null;
    private canAuthoriseAccounts: boolean | null;
    private canViewAnonymousData: boolean | null;
    private canViewPersonalisedData: boolean | null;

    constructor(id?: string, name?: string, canManageQuestionnaires?: boolean, canFillQuestionnaires?: boolean, canAuthoriseAccounts?: boolean, canViewAnonymousData?: boolean, canViewPersonalisedData?: boolean) {
        this.id = id ?? null;
        this.name = name ?? null;
        this.canManageQuestionnaires = canManageQuestionnaires ?? null;
        this.canFillQuestionnaires = canFillQuestionnaires ?? null;
        this.canAuthoriseAccounts = canAuthoriseAccounts ?? null;
        this.canViewAnonymousData = canViewAnonymousData ?? null;
        this.canViewPersonalisedData = canViewPersonalisedData ?? null;
    }
}