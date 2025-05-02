import axios from "axios"
axios.defaults.validateStatus = () => true;

test("Deve adicionar fundos em uma conta", async () => {
    const inputDeposit = { 
        accountId: "8d9c95d3-ea2e-40b1-9826-70d2f23ba6d4",
        assetId: "BTC",
        quantity: 100
    }
    const responseDeposit = await axios.post("http://localhost:3000/deposit", inputDeposit);
    const outputDeposit = responseDeposit.data;
    expect(outputDeposit.depositId).toBeDefined()
})

test("Não deve adicionar fundos em uma conta inexitente", async () => {
    const inputDeposit = { 
        accountId: "b4f0b9e7-32ea-4c79-8e9a-9d6f6c2d2c4e",
        assetId: "BTC",
        quantity: 100
    }
    const responseDeposit = await axios.post("http://localhost:3000/deposit", inputDeposit);
    const outputDeposit = responseDeposit.data;
    expect(responseDeposit.status).toBe(422)
    expect(outputDeposit.error).toBe("Account not found")
})

test("Não deve adicionar fundos em uma conta com um ativo diferente de BTC ou USD", async () => {
    const inputDeposit = { 
        accountId: "8d9c95d3-ea2e-40b1-9826-70d2f23ba6d4",
        assetId: "BRL",
        quantity: 100
    }
    const responseDeposit = await axios.post("http://localhost:3000/deposit", inputDeposit);
    const outputDeposit = responseDeposit.data;
    expect(responseDeposit.status).toBe(422)
    expect(outputDeposit.error).toBe("Invalid asset")
})

test("Não deve adicionar fundos em uma conta com a quantidade menor ou igual a 0", async () => {
    const inputDeposit = { 
        accountId: "8d9c95d3-ea2e-40b1-9826-70d2f23ba6d4",
        assetId: "BTC",
        quantity: 0
    }
    const responseDeposit = await axios.post("http://localhost:3000/deposit", inputDeposit);
    const outputDeposit = responseDeposit.data;
    expect(responseDeposit.status).toBe(422)
    expect(outputDeposit.error).toBe("Invalid quantity")
})