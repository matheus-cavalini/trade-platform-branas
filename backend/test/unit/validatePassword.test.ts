import { isValidPassword } from "../../src/domain/validatePassword"

test("Deve validar a senha", () => {
    const password = "abcdE@1234"
    const isValid = isValidPassword(password)
    expect(isValid).toBe(true)
})

test.each([
    "bcd",
    "abcabcabc",
    "ASDASDASD",
    "123456789aaa",
    "12345678"
])("Não deve validar a senha", async (password: string) => {
    const isValid = isValidPassword(password)
    expect(isValid).toBe(false)
})