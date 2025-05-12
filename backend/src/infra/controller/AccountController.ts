import Deposit from "../../application/usecase/Deposit";
import GetAccount from "../../application/usecase/GetAccount";
import HttpServer from "../http/HttpServer";
import Signup from "../../application/usecase/Signup";
import Withdraw from "../../application/usecase/Withdraw";

export default class AccountController {
    static config(
        httpServer: HttpServer,
        signup: Signup,
        getAccount: GetAccount,
        deposit: Deposit,
        withdraw: Withdraw
    ) {

        httpServer.route("post", "/signup", async (params: any, body: any) => {
            const input = body;
            const output = await signup.execute(input)
            return output;
        });

        httpServer.route("get", "/accounts/:accountId", async (params: any, body: any) => {
            const accountId = params.accountId;
            const output = await getAccount.execute(accountId)
            return output;
        });

        httpServer.route("post", "/deposit", async (params: any, body: any) => {
            const input = body;
            await deposit.execute(input)
        })

        httpServer.route("post", "/withdraw", async (params: any, body: any) => {
            const input = body;
            await withdraw.execute(input)
        })
    }
}