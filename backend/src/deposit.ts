import express, { Request, Response } from "express"
import crypto from "crypto"
import pgp from "pg-promise";

const app = express();
app.use(express.json())

const connection = pgp()("postgres://postgres:123456@localhost:5432/app");

app.post("/deposit", async (req: Request, res: Response) => {
    const input = req.body
    if (input.assetId !== "BTC" && input.assetId !== "USD") {
        return res.status(422).json({ error: "Invalid asset" })
    }
    if (input.quantity <= 0) {
        return res.status(422).json({ error: "Invalid quantity" })
    }
    const [accountData] = await connection.query("select * from ccca.account where account_id = $1", [input.accountId]);
    if (!accountData) return res.status(422).json({ error: "Account not found" })
    
    const depositId = crypto.randomUUID()
    res.json({ depositId })
})

app.listen(3000)