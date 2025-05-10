import AccountAsset from "./AccountAsset";
import AccountRepository from "./AccountRepository";

export default class Deposit {
    constructor(
        readonly accountRepository: AccountRepository
    ) { }
    async execute(input: Input): Promise<void> {
        const accountAsset = new AccountAsset(input.accountId, input.assetId, input.quantity)
        await this.accountRepository.saveAccountAsset(accountAsset)
    }
}

type Input = {
    accountId: string,
    assetId: string,
    quantity: number
}