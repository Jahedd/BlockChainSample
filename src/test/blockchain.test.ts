import assert from "assert";
import { getAccountBalance, init } from "../interface";

describe("Test for sample transaction", () => {
  it("should return 500", () => {
    init(
      [100, 100, 500],
      [
        [0, 1, 50],
        [1, 2, 80],
        [2, 0, 450],
      ],
      2
    );

    assert.equal(getAccountBalance("0"), 500);
  });

  it("should return 400", () => {
    init(
      [100, 100, 500],
      [
        [0, 1, 50],
        [1, 2, 80],
        [2, 0, 350],
        [2, 0, 350],
      ],
      2
    );

    assert.equal(getAccountBalance("0"), 400);
  });
});
