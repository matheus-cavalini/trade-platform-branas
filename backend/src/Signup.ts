import Account from "./Account";
import AccountRepository from "./AccountRepository";

export default class Signup {
    constructor(
        readonly accountRepository: AccountRepository
    ) { }

    async execute(input: any) {
        const account = Account.create(input.name, input.email, input.document, input.password)
        await this.accountRepository.saveAccount(account)
        return {
            accountId: account.accountId
        }
    }
}