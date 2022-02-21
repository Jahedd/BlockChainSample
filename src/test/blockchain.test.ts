const assert = require("assert");
const blockchain = require("../blockchain");

describe("Test for sample transaction", () => {
  it("should return 500", () => {
    blockchain.init(
      [100, 100, 500],
      [
        [0, 1, 50],
        [1, 2, 80],
        [2, 0, 450],
      ],
      2
    );

    assert.equal(blockchain.getAccountBalance(0), 500);
  });

  it("should return 400", () => {
    blockchain.init(
      [100, 100, 500],
      [
        [0, 1, 50],
        [1, 2, 80],
        [2, 0, 350],
        [2, 0, 350],
      ],
      2
    );

    assert.equal(blockchain.getAccountBalance(0), 400);
  });
});
