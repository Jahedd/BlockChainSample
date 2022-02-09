const Block = require("./block");

let balances;
let blocks = [];

const init = function (initialBalances, transactions, blockSize) {
  balances = [...initialBalances];

  for (let i = 0; i < transactions.length; i++) {
    if (balances[transactions[i][0]] - transactions[i][2] > 0) {
      balances[transactions[i][1]] =
        balances[transactions[i][1]] + transactions[i][2];
      balances[transactions[i][0]] =
        balances[transactions[i][0]] - transactions[i][2];
    } else {
      transactions.splice(i, 1);
    }
  }

  for (var i = 0; i < transactions.length; i += blockSize) {
    blocks.push(
      new Block(
        transactions.slice(i, i + blockSize),
        blocks[blocks.length] ? blocks[blocks.length].hash : undefined
      )
    );
  }
};
const getAccountBalance = function (accountIndex) {
  return balances[accountIndex];
};

module.exports = { init, getAccountBalance };
