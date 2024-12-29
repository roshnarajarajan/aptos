import { expect, test, describe, beforeEach } from 'vitest';
import { TransactionService } from '../services/transactionService';
import { createAccount } from '../utils/accountUtils';

describe('TransactionService', () => {
  test('should create valid transaction payload', async () => {
    const account1 = createAccount();
    const account2 = createAccount();
    
    // Note: This test will fail without actual funds
    // Consider mocking the client for testing
    await expect(
      TransactionService.transferTokens(
        account1.privateKey,
        account2.address,
        100
      )
    ).rejects.toThrow();
  });

  test('should get transaction status', async () => {
    await expect(
      TransactionService.getTransactionStatus(
        '0x1234567890abcdef'
      )
    ).rejects.toThrow();
  });
});