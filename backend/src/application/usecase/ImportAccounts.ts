import Account from "../../domain/Account";
import AccountRepository from "../../infra/repository/AccountRepository";

export default class ImportAccounts {
    constructor(
        readonly accountRepository: AccountRepository
    ) { }

    async execute(input: any) {
        for (const inputAccount of input.accounts) {
            const account = Account.create(inputAccount.name, inputAccount.email, inputAccount.document, inputAccount.password)
            await this.accountRepository.saveAccount(account)
        }
    }
}