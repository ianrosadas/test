// import { isEmpty } from './utilityFunctions';
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds 2 + 2 to equal 3', () => {
    expect(sum(2, 2)).toBe(4);
  });

  test('dois mais dois', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);
  
    // toBe e toEqual são equivalentes para números
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });

  test('nulo', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });
  
  test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });

  test('não existe I em team', () => {
    expect('team').not.toMatch(/I/);
  });
  
  test('mas existe "stop" em Christoph', () => {
    expect('Christoph').toMatch(/stop/);
  });

  const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'beer',
  ];
  
  test('the shopping list has beer on it', () => {
    expect(shoppingList).toContain('beer');
    expect(new Set(shoppingList)).toContain('beer');
  });

  // users.test.js
// import axios from 'axios';
// import Users from './users';

// jest.mock('axios');

// test('should fetch users', () => {
//   const users = [{name: 'Bob'}];
//   const resp = {data: users};
//   axios.get.mockResolvedValue(resp);

//   // or you could use the following depending on your use case:
//   // axios.get.mockImplementation(() => Promise.resolve(resp))

//   return Users.all().then(data => expect(data).toEqual(users));
// });

// test("todos os espaços são removidos da string", () => {

//     const input = "testes são bons"; // como vai entrar na função
//     const expected = "testessãobons"; // como deve sair da função
  
//     const output = removeSpaces(input); // resultado da função
  
//     expect(output).toBe(expected);
//   });

  test("jest is working", () => {
    expect(true).toBe(true);
  });

  let result;
test('First test', () => {
    result = 3 * 3;
    expect(result).toBe(9);
    result = true;
    expect(result).toBe(true)

});

// test('empty', () => {
//     let result = isEmpty('');
//     expect(result).toBeTruthy();
// });