import Password from "../../src/domain/Password"

test("Deve validar a senha", () => {
    const password = "abcdE@1234"
    expect(new Password(password)).toBeDefined();
})

test.each([
    "bcd",
    "abcabcabc",
    "ASDASDASD",
    "123456789aaa",
    "12345678"
])("Não deve validar a senha", async (password: string) => {
    expect(() => new Password(password)).toThrow("Invalid password")
})