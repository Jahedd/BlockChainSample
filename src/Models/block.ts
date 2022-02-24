import Transaction from "./transaction";
import crypto from "crypto";

const SHA256 = (message: crypto.BinaryLike) =>
  crypto.createHash("sha256").update(message).digest("hex");

export default class Block {
  timestamp: number;
  transactions: Transaction[];
  nonce: number;
  previousHash: string;
  hash: string;
  constructor(timestamp: number, transactions: Transaction[], prevHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.nonce = 0;
    this.previousHash = prevHash;
    this.hash = this.calculateHash();
  }

  calculateHash = () =>
    SHA256(
      this.timestamp +
        this.previousHash +
        this.nonce +
        JSON.stringify(this.transactions)
    );

  mineBlock = (difficulty: number) => {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block successfully mined: " + this.hash);
  };

  hasValidTransactions = () =>
    this.transactions.every((transaction) => transaction.isValid());
}
