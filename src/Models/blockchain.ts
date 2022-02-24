import Block from "./block";
import Transaction from "./transaction";

export default class BlockChain {
  chain: Block[];
  difficulty: number;
  unminedTransactions: Transaction[];
  miningReward: number;
  registeredAddresses: string[];
  constructor(initialAmounts: number[]) {
    this.chain = [];
    this.difficulty = 2;
    this.unminedTransactions = [];
    this.miningReward = 50;
    this.createGenesisBlock();
    this.addInitialAmounts(initialAmounts);
  }
  private addInitialAmounts = (initialAmounts: number[]) => {
    for (let i = 0; i < initialAmounts.length; i++) {
      const transaction = new Transaction(
        "System",
        i.toString(),
        initialAmounts[i]
      );
      this.unminedTransactions.push(transaction);
    }
    this.mineCurrentBlock("Miner_Wallet");
  };

  private createGenesisBlock = () => {
    const transaction = new Transaction("System", "genesis", 0);
    const block = new Block(Date.now(), [transaction], "0");
    this.chain.push(block);
  };
  getLatestBlock = () => this.chain[this.chain.length - 1];

  mineCurrentBlock = (minerAddr: string) => {
    const validatedTxns: Transaction[] = [];
    for (const txn of this.unminedTransactions) {
      if (txn.fromAddress === "System" || this.validateTransaction(txn)) {
        validatedTxns.push(txn);
      }
    }
    console.log("transactions validated: " + validatedTxns.length);

    const block = new Block(
      Date.now(),
      validatedTxns,
      this.getLatestBlock().hash
    );
    block.mineBlock(this.difficulty);

    console.log("Current Block successfully mined...");
    this.chain.push(block);

    this.unminedTransactions = [
      new Transaction("System", minerAddr, this.miningReward),
    ];
  };
  private validateTransaction = (transaction: Transaction) => {
    const fromAddress = transaction.fromAddress;
    const previusValidTransactionAmount = this.unminedTransactions
      .slice(0, this.unminedTransactions.indexOf(transaction))
      .filter((t) => this.validateTransaction(t))
      .filter((t) => t.fromAddress == transaction.fromAddress)
      .reduce((a, b) => a + b.amount, 0);
    const balance = this.getAddressBalance(fromAddress);
    return balance - previusValidTransactionAmount >= transaction.amount;
  };
  getAddressBalance = (address: string) => {
    let balance = 0;

    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.fromAddress === address) {
          balance -= transaction.amount;
        }
        if (transaction.toAddress === address) {
          balance += transaction.amount;
        }
      }
    }
    return balance;
  };
  createTransaction = (transaction: Transaction) => {
    this.unminedTransactions.push(transaction);
  };
  isChainValid = () => {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      // validate data integrity
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      // validate hash chain link
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
      //check for transaction signiture
      //and validate block transaction signuture
      //should implemented here
    }
    // all good, no manipulated data or bad links
    return true;
  };
}
