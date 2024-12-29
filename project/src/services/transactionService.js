import { client } from '../config/aptosConfig.js';
import { AptosAccount, TxnBuilderTypes, BCS } from "aptos";

export class TransactionService {
  static async transferTokens(fromPrivateKey, toAddress, amount) {
    try {
      const sender = new AptosAccount(fromPrivateKey);
      
      const payload = {
        type: "entry_function_payload",
        function: "0x1::coin::transfer",
        type_arguments: ["0x1::aptos_coin::AptosCoin"],
        arguments: [toAddress, amount.toString()]
      };

      const txnRequest = await client.generateTransaction(sender.address(), payload);
      const signedTxn = await client.signTransaction(sender, txnRequest);
      const response = await client.submitTransaction(signedTxn);
      
      return {
        hash: response.hash,
        sender: sender.address().hex(),
        recipient: toAddress,
        amount: amount
      };
    } catch (error) {
      throw new Error(`Transaction failed: ${error.message}`);
    }
  }

  static async getTransactionStatus(txHash) {
    try {
      const txInfo = await client.getTransactionByHash(txHash);
      return {
        status: txInfo.success ? 'success' : 'failed',
        version: txInfo.version,
        vmStatus: txInfo.vm_status,
        gasUsed: txInfo.gas_used
      };
    } catch (error) {
      throw new Error(`Failed to get transaction status: ${error.message}`);
    }
  }
}