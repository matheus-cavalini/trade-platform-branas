import Email from "../../src/domain/Email";


test.each([
    "john.doe@gmail.com"
])("Deve criar um email válido: %s", (email) => {
    expect(new Email(email)).toBeDefined();
})

test.each([
    "john.doe",
    "john.doe@"
])("Não deve criar um email inválido: %s", (email: any) => {
    expect(() => new Email(email)).toThrow(new Error("Invalid email"));
})