import axios from "axios";
import Signup from "../../src/Signup";
import GetAccount from "../../src/GetAccount";
import sinon from "sinon"
import Account from "../../src/Account";
import { AccountRepositoryDatabase, AccountRepositoryMemory } from "../../src/AccountRepository";

axios.defaults.validateStatus = () => true;

let signup: Signup
let getAccount: GetAccount

beforeEach(() => {
    const accountRepository = new AccountRepositoryDatabase()
    signup = new Signup(accountRepository)
    getAccount = new GetAccount(accountRepository)
})

test("Deve criar uma conta válida", async () => {
    const inputSignup = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "97456321558",
        password: "asdQWE123"
    }
    const outputSignup = await signup.execute(inputSignup)
    expect(outputSignup.accountId).toBeDefined();
    const outputGetAccount = await getAccount.execute(outputSignup.accountId)
    expect(outputGetAccount.name).toBe(inputSignup.name);
    expect(outputGetAccount.email).toBe(inputSignup.email);
    expect(outputGetAccount.document).toBe(inputSignup.document);
});

test("Não deve criar uma conta com nome inválido", async () => {
    const inputSignup = {
        name: "John",
        email: "john.doe@gmail.com",
        document: "97456321558",
        password: "asdQWE123"
    }
    await expect(() => signup.execute(inputSignup)).rejects.toThrow("Invalid name")
});

test("Não deve criar uma conta com email inválido", async () => {
    const inputSignup = {
        name: "John Doe",
        email: "john.doe",
        document: "97456321558",
        password: "asdQWE123"
    }
    await expect(() => signup.execute(inputSignup)).rejects.toThrow("Invalid email")
});

test.each([
    "111",
    "abc",
    "7897897897"
])("Não deve criar uma conta com cpf inválido", async (document: string) => {
    const inputSignup = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document,
        password: "asdQWE123"
    }
    await expect(() => signup.execute(inputSignup)).rejects.toThrow("Invalid document")
});

test("Não deve criar uma conta com senha inválida", async () => {
    const inputSignup = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "97456321558",
        password: "asdQWE"
    }
    await expect(() => signup.execute(inputSignup)).rejects.toThrow("Invalid password")
});

test("Deve criar uma conta válida com stub", async () => {
    const saveAccountStub = sinon.stub(AccountRepositoryDatabase.prototype, "saveAccount").resolves();
    const inputSignup = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "97456321558",
        password: "asdQWE123"
    }
    const getAccountByIdStub = sinon.stub(AccountRepositoryDatabase.prototype, "getAccountById").resolves(Account.create(inputSignup.name, inputSignup.email, inputSignup.document, inputSignup.password));
    const getAccountAssetsStub = sinon.stub(AccountRepositoryDatabase.prototype, "getAccountAssets").resolves([]);
    const outputSignup = await signup.execute(inputSignup)
    expect(outputSignup.accountId).toBeDefined();
    const outputGetAccount = await getAccount.execute(outputSignup.accountId)
    expect(outputGetAccount.name).toBe(inputSignup.name);
    expect(outputGetAccount.email).toBe(inputSignup.email);
    expect(outputGetAccount.document).toBe(inputSignup.document);
    saveAccountStub.restore()
    getAccountByIdStub.restore()
    getAccountAssetsStub.restore()
});

test("Deve criar uma conta válida com spy", async () => {
    const saveAccountSpy = sinon.spy(AccountRepositoryDatabase.prototype, "saveAccount")
    const inputSignup = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "97456321558",
        password: "asdQWE123"
    }
    const outputSignup = await signup.execute(inputSignup)
    expect(outputSignup.accountId).toBeDefined();
    const outputGetAccount = await getAccount.execute(outputSignup.accountId)
    expect(outputGetAccount.name).toBe(inputSignup.name);
    expect(outputGetAccount.email).toBe(inputSignup.email);
    expect(outputGetAccount.document).toBe(inputSignup.document);
    expect(saveAccountSpy.calledOnce).toBe(true);
    const account = new Account(outputSignup.accountId, inputSignup.name, inputSignup.email, inputSignup.document, inputSignup.password)
    expect(saveAccountSpy.calledWith(account)).toBe(true);
    saveAccountSpy.restore();
});

test("Deve criar uma conta válida com mock", async () => {
    const accountRepositoryMock = sinon.mock(AccountRepositoryDatabase.prototype);
    const inputSignup = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "97456321558",
        password: "asdQWE123"
    }
    accountRepositoryMock.expects("getAccountById").once().resolves(inputSignup);
    accountRepositoryMock.expects("getAccountAssets").once().resolves([])
    const outputSignup = await signup.execute(inputSignup)
    expect(outputSignup.accountId).toBeDefined();
    const outputGetAccount = await getAccount.execute(outputSignup.accountId)
    expect(outputGetAccount.name).toBe(inputSignup.name);
    expect(outputGetAccount.email).toBe(inputSignup.email);
    expect(outputGetAccount.document).toBe(inputSignup.document);
    accountRepositoryMock.verify();
    accountRepositoryMock.restore();
});

test("Deve criar uma conta válida com fake", async () => {
    const accountRepository = new AccountRepositoryMemory()
    signup = new Signup(accountRepository)
    getAccount = new GetAccount(accountRepository)
    const inputSignup = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "97456321558",
        password: "asdQWE123"
    }
    const outputSignup = await signup.execute(inputSignup)
    expect(outputSignup.accountId).toBeDefined();
    const outputGetAccount = await getAccount.execute(outputSignup.accountId)
    expect(outputGetAccount.name).toBe(inputSignup.name);
    expect(outputGetAccount.email).toBe(inputSignup.email);
    expect(outputGetAccount.document).toBe(inputSignup.document);
});