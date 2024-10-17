import path from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  const timeout = 100;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();

    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(cb, timeout);

    expect(setTimeout).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();

    doStuffByTimeout(cb, timeout);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  const interval = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(cb, interval);

    expect(setInterval).toHaveBeenCalledWith(cb, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();

    jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, interval);

    jest.advanceTimersByTime(interval * 3);

    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'path_to_file';
    const spyJoin = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);

    expect(spyJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const res = await readFileAsynchronously('non-exist.file');

    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'file_content';
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockReturnValue(Buffer.from(fileContent));

    const res = await readFileAsynchronously('exist.file');

    expect(res).toBe(fileContent);
  });
});
