import axios from "axios"
axios.defaults.validateStatus = () => true;

test("Deve retirar fundos de uma conta", async () => {
    const inputWithdraw = {
        accountId: "8d9c95d3-ea2e-40b1-9826-70d2f23ba6d4",
        assetId: "BTC",
        quantity: 100
    }
    const responseWithdraw = await axios.post("http://localhost:3000/withdraw", inputWithdraw);
    const outputWithdraw = responseWithdraw.data;
    expect(outputWithdraw.withdrawId).toBeDefined()
})

test("Não deve retirar fundos de uma conta caso a conta não exista", async () => {
    const inputWithdraw = {
        accountId: "8d9c95d3-ea2e-40b1-9826-70d2f23ba6d2",
        assetId: "BTC",
        quantity: 100
    }
    const responseWithdraw = await axios.post("http://localhost:3000/withdraw", inputWithdraw);
    const outputWithdraw = responseWithdraw.data;
    expect(responseWithdraw.status).toBe(422)
    expect(outputWithdraw.error).toBe("Account not found")
})

test("Não deve retirar fundos de uma conta com um ativo diferente de BTC ou USD", async () => {
    const inputWithdraw = {
        accountId: "8d9c95d3-ea2e-40b1-9826-70d2f23ba6d4",
        assetId: "BRL",
        quantity: 100
    }
    const responseWithdraw = await axios.post("http://localhost:3000/withdraw", inputWithdraw);
    const outputWithdraw = responseWithdraw.data;
    expect(responseWithdraw.status).toBe(422)
    expect(outputWithdraw.error).toBe("Invalid assetId")
})

test("Não deve retirar fundos de uma conta com uma quantidade menor que o saldo", async () => {
    const inputWithdraw = {
        accountId: "8d9c95d3-ea2e-40b1-9826-70d2f23ba6d4",
        assetId: "BTC",
        quantity: 40
    }
    const responseWithdraw = await axios.post("http://localhost:3000/withdraw", inputWithdraw);
    const outputWithdraw = responseWithdraw.data;
    expect(responseWithdraw.status).toBe(422)
    expect(outputWithdraw.error).toBe("Invalid quantity")
})