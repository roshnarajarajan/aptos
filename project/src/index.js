import express from 'express';
import { TransactionService } from './services/transactionService.js';
import { createAccount, getAccountBalance } from './utils/accountUtils.js';
import { client } from './config/aptosConfig.js';

const app = express();
app.use(express.json());

// Create new wallet account
app.post('/account/create', (req, res) => {
  try {
    const account = createAccount();
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get account balance
app.get('/account/balance/:address', async (req, res) => {
  try {
    const balance = await getAccountBalance(client, req.params.address);
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Transfer tokens
app.post('/transaction/transfer', async (req, res) => {
  try {
    const { fromPrivateKey, toAddress, amount } = req.body;
    const result = await TransactionService.transferTokens(fromPrivateKey, toAddress, amount);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get transaction status
app.get('/transaction/:hash', async (req, res) => {
  try {
    const status = await TransactionService.getTransactionStatus(req.params.hash);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Aptos Gateway running on port ${PORT}`);
});