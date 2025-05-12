import Account from "../../src/domain/Account"

test("Deve criar uma conta", () => {
    const account = Account.create("John Doe", "john.doe@gmail.com", "97456321558", "asdQWE123")
    expect(account).toBeDefined()
})

test("Não deve criar uma conta com nome inválido", () => {
    expect(() => Account.create("John", "john.doe@gmail.com", "97456321558", "asdQWE123")).toThrow(new Error("Invalid name"))
})

test("Não deve criar uma conta com email inválido", () => {
    expect(() => Account.create("John Doe", "john.doe", "97456321558", "asdQWE123")).toThrow(new Error("Invalid email"))
})

test("Não deve criar uma conta com documento inválido", () => {
    expect(() => Account.create("John Doe", "john.doe@gmail.com", "97456321", "asdQWE123")).toThrow(new Error("Invalid document"))
})

test("Não deve criar uma conta com senha inválida", () => {
    expect(() => Account.create("John Doe", "john.doe@gmail.com", "97456321558", "asdQW")).toThrow(new Error("Invalid password"))
})