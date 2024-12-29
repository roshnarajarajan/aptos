import { AptosAccount } from "aptos";

export const createAccount = () => {
  const account = new AptosAccount();
  return {
    address: account.address().hex(),
    publicKey: account.pubKey().hex(),
    privateKey: account.toPrivateKeyObject().privateKeyHex
  };
};

export const getAccountBalance = async (client, address) => {
  try {
    const resources = await client.getAccountResources(address);
    const accountResource = resources.find(r => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>");
    return accountResource ? accountResource.data.coin.value : "0";
  } catch (error) {
    throw new Error(`Failed to get balance: ${error.message}`);
  }
};