import dotenv from "dotenv";
dotenv.config();
import { MY_PUBLIC_KEY, PRIVATE_KEY, TOKEN_MINT_ADDRESS } from "./address";

const {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
} = require("@solana/web3.js");
const {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} = require("@solana/spl-token");
import bs58 from "bs58";
import { burn, transfer } from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const decodedKey = bs58.decode(PRIVATE_KEY);
const payer = Keypair.fromSecretKey(decodedKey);
const mint = new PublicKey(TOKEN_MINT_ADDRESS);

export const mintTokens = async (fromAddress: string, amount: number) => {
  console.log("Minting tokens");

  const recipientPublicKey = new PublicKey(fromAddress);

  const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    recipientPublicKey
  );

  console.log(
    "Recipient Token Account:",
    recipientTokenAccount.address.toBase58()
  );
  const mintAuthority = payer;

  await mintTo(
    connection,
    payer,
    mint,
    recipientTokenAccount.address,
    mintAuthority,
    amount
  );

  console.log(`Minted ${amount} tokens to ${recipientPublicKey}`);
};

export const burnTokens = async (fromAddress: string, amount: number) => {
  console.log("Burning tokens");
  fromAddress = new PublicKey(fromAddress);
  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    fromAddress
  );

  await burn(connection, payer, fromTokenAccount.address, mint, fromTokenAccount.owner, amount);
  console.log(`${amount} tokens burned successfully.`);
};

export const sendNativeTokens = async (fromAddress: string, amount: number) => {
  console.log("Sending native tokens");
  const recipientPublicKey = new PublicKey(fromAddress);
  const transaction = await transfer(
    connection,
    payer,
    payer.publicKey,
    recipientPublicKey,
    payer,
    amount
  );

  console.log(
    `Transferred ${amount} SOL to ${recipientPublicKey}: Signature ${transaction}`
  );
};
