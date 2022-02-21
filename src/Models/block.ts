import Transaction from "./transaction";
import crypto from "crypto";

const SHA256 = (message: crypto.BinaryLike) =>
  crypto.createHash("sha256").update(message).digest("hex");

export default class Block {
  timestamp: number;
  transactions: Transaction[];
  nonce: number;
  prevHash: string;
  hash: string;
  constructor(timestamp: number, transactions: Transaction[], prevHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.nonce = 0;
    this.prevHash = prevHash;
    this.hash = "";
  }

  getHash(): string {
    return SHA256(
      this.timestamp +
        this.prevHash +
        this.nonce +
        JSON.stringify(this.transactions)
    );
  }

  mineBlock(difficulty: number): void {
    while (this.hash.substring(0, difficulty) != "".padEnd(difficulty, "0")) {
      this.nonce++;
      this.hash = this.getHash();
    }
    console.log("Block successfully mined: " + this.hash);
  }

  hasValidTransactions = () =>
    this.transactions.every((transaction) => transaction.isValid());
}
