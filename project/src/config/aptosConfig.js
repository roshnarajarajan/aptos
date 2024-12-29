import { AptosClient } from "aptos";
import dotenv from 'dotenv';

dotenv.config();

// Initialize Aptos client with the node URL
const client = new AptosClient(process.env.APTOS_NODE_URL || "https://fullnode.devnet.aptoslabs.com");

export { client };