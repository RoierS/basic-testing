import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance1 = 300;
  const initialBalance2 = 100;
  const account2InitialBalance = 200;
  const depositValue = 300;
  const transferValue = 400;
  const transferValue2 = 150;
  const withdrawValue = 50;

  test('should create account with initial balance', () => {
    const newBankAccount = getBankAccount(initialBalance1);

    expect(newBankAccount).toBeDefined();
    expect(newBankAccount.getBalance()).toBe(initialBalance1);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(initialBalance2);

    expect(() =>
      bankAccount.withdraw(withdrawValue + initialBalance2),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount1 = getBankAccount(initialBalance2);
    const bankAccount2 = getBankAccount(account2InitialBalance);

    expect(() =>
      bankAccount1.transfer(transferValue, bankAccount2),
    ).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount1 = getBankAccount(initialBalance2);

    expect(() =>
      bankAccount1.transfer(transferValue, bankAccount1),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(initialBalance2);
    bankAccount.deposit(depositValue);
    const currentBalance = bankAccount.getBalance();

    expect(currentBalance).toBe(initialBalance2 + depositValue);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(initialBalance2);
    bankAccount.withdraw(withdrawValue);
    const currentBalance = bankAccount.getBalance();

    expect(currentBalance).toBe(initialBalance2 - withdrawValue);
  });

  test('should transfer money', () => {
    const bankAccount1 = getBankAccount(initialBalance1);
    const bankAccount2 = getBankAccount(initialBalance2);

    bankAccount1.transfer(transferValue2, bankAccount2);

    const currentBalanceAccount1 = bankAccount1.getBalance();
    const currentBalanceAccount2 = bankAccount2.getBalance();

    expect(currentBalanceAccount1).toBe(initialBalance1 - transferValue2);
    expect(currentBalanceAccount2).toBe(initialBalance2 + transferValue2);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount1 = getBankAccount(initialBalance1);

    jest
      .spyOn(bankAccount1, 'fetchBalance')
      .mockResolvedValueOnce(initialBalance1);

    const balance = await bankAccount1.fetchBalance();
    expect(balance).toBe(initialBalance1);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount1 = getBankAccount(initialBalance1);

    jest
      .spyOn(bankAccount1, 'fetchBalance')
      .mockResolvedValueOnce(initialBalance1);

    await bankAccount1.synchronizeBalance();

    expect(bankAccount1.getBalance()).toBe(initialBalance1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount1 = getBankAccount(initialBalance1);

    jest.spyOn(bankAccount1, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(bankAccount1.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
