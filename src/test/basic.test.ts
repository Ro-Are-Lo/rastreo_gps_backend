// src/test/basic.test.ts
describe('✅ Configuración de tests', () => {
  it('debe sumar correctamente', () => {
    expect(1 + 1).toBe(2);
  });

  it('debe poder usar async/await', async () => {
    const result = await Promise.resolve(42);
    expect(result).toBe(42);
  });

  it('debe tener acceso a variables globales de test', () => {
    expect(global.testUser.username).toBe('test.user');
  });
});