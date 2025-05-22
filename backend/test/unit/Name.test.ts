import Name from "../../src/domain/Name"

test.each([
    "Ana Maria Silva",
    "joão Souza",
    "Mateus Carvalho"
])("Deve criar um nome válido: %s", (name) => {
    expect(new Name(name)).toBeDefined();
})

test.each([
    "Ana",
    "",
    "123",
    "-",
    null
])("Não deve criar um nome inválido: %s", (name: any) => {
    expect(() => new Name(name)).toThrow(new Error("Invalid name"));
})