import express, { Request, Response } from "express";
import cors from "cors";
import Signup from "./Signup";
import { AccountRepositoryDatabase } from "./AccountRepository";
import GetAccount from "./GetAccount";
import Withdraw from "./Withdraw";
import Deposit from "./Deposit";
import PlaceOrder from "./PlaceOrder";
import { OrderDAODatabase } from "./OrderDAO";
import GetOrder from "./GetOrder";

const app = express();
app.use(express.json());
app.use(cors())

const accountRepository = new AccountRepositoryDatabase();
const orderDAO = new OrderDAODatabase()
const signup = new Signup(accountRepository)
const getAccount = new GetAccount(accountRepository)
const withdraw = new Withdraw(accountRepository)
const deposit = new Deposit(accountRepository)
const placeOrder = new PlaceOrder(orderDAO)
const getOrder = new GetOrder(orderDAO)

app.post("/signup", async (req: Request, res: Response) => {
    try {
        const input = req.body;
        const output = await signup.execute(input)
        res.json(output);
    } catch (e: any) {
        res.status(422).json({
            error: e.message
        });
    }
});

app.get("/accounts/:accountId", async (req: Request, res: Response) => {
    const accountId = req.params.accountId;
    const output = await getAccount.execute(accountId)
    res.json(output);
});

app.post("/deposit", async (req: Request, res: Response) => {
    const input = req.body;
    await deposit.execute(input)
    res.end()
})

app.post("/withdraw", async (req: Request, res: Response) => {
    try {
        const input = req.body;
        await withdraw.execute(input)
        res.end();
    } catch (e: any) {
        res.status(422).json({ error: e.message })
    }
})

//place-order
app.post("/place-order", async (req: Request, res: Response) => {
    const input = req.body;
    const output = await placeOrder.execute(input)
    res.json(output)
})

app.get("/orders/:orderId", async (req: Request, res: Response) => {
    const orderId = req.params.orderId
    const output = await getOrder.execute(orderId)
    res.json(output)
})

app.listen(3000);