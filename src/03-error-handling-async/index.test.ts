import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'test';
    const res = await resolveValue(value);

    expect(res).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'Test error message';

    expect(() => throwError(errorMessage)).toThrowError(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';

    expect(() => throwError()).toThrowError(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(() => rejectCustomError()).rejects.toThrowError(
      MyAwesomeError,
    );
  });
});
