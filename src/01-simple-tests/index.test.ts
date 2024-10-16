import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const res = simpleCalculator({ a: 2, b: 2, action: Action.Add });

    expect(res).toBe(4);
  });

  test('should subtract two numbers', () => {
    const res = simpleCalculator({ a: 5, b: 2, action: Action.Subtract });

    expect(res).toBe(3);
  });

  test('should multiply two numbers', () => {
    const res = simpleCalculator({ a: 3, b: 2, action: Action.Multiply });

    expect(res).toBe(6);
  });

  test('should divide two numbers', () => {
    const res = simpleCalculator({ a: 6, b: 2, action: Action.Divide });

    expect(res).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const res = simpleCalculator({ a: 2, b: 4, action: Action.Exponentiate });

    expect(res).toBe(16);
  });

  test('should return null for invalid action', () => {
    const res = simpleCalculator({ a: 2, b: 5, action: 'invalid action' });

    expect(res).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const res1 = simpleCalculator({ a: '2', b: 5, action: Action.Add });
    const res2 = simpleCalculator({ a: 2, b: '7', action: Action.Subtract });
    const res3 = simpleCalculator({
      a: 2,
      b: 'some string',
      action: Action.Subtract,
    });

    expect(res1).toBeNull();
    expect(res2).toBeNull();
    expect(res3).toBeNull();
  });
});
