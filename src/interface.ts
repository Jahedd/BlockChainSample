import Blockchain from "./Models/blockchain";
import Transaction from "./Models/transaction";
let blockchain: Blockchain;

export const init = (
  initialBalances: number[],
  transactions: number[][],
  blockSize: number
) => {
  blockchain = new Blockchain(initialBalances);

  for (let i = 0; i < transactions.length; i += blockSize) {
    for (let j = i; j < i + blockSize && j < transactions.length; j++) {
      blockchain.createTransaction(
        new Transaction(
          transactions[j][0].toString(),
          transactions[j][1].toString(),
          transactions[j][2]
        )
      );
    }
    blockchain.mineCurrentBlock("wallet-Minerr");
  }
  console.log(getAccountBalance("0"));
};
export const getAccountBalance = (accountAddress) =>
  blockchain.getAddressBalance(accountAddress);
