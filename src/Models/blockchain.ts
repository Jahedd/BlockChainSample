import Block from "./block";
import Transaction from "./transaction";

export default class BlockChain {
  chain: Block[];
  difficulty: number;
  pendingTransactions: Transaction[];
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }
  private createGenesisBlock = () => new Block(0, [], "0");
}

const init = function (
  initialBalances: number[],
  transactions: Transaction[],
  blockSize: number
) {
  console.log(this.blocks);
  for (let i = 0; i < transactions.length; i += blockSize) {
    this.blocks.push(
      new Block(
        Date.now(),
        transactions.slice(i, i + blockSize),
        this.blocks[this.blocks.length].hash
      )
    );
  }
  console.log(this.blocks);
};
const getAccountBalance = function (accountIndex) {
  return this.balances[accountIndex];
};
