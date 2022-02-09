const crypto = require("crypto"),
  SHA256 = (message) =>
    crypto.createHash("sha256").update(message).digest("hex");

class Block {
  constructor(data, prevHash) {
    this.data = data;
    this.hash = Block.getHash(this);
    this.nonce = "1234";

    this.prevHash =
      typeof prevHash === "undefined"
        ? "0000000000000000000000000000000000000000"
        : prevHash;
  }

  static getHash(block) {
    return SHA256(block.prevHash + block.nonce + JSON.stringify(block.data));
  }
}

module.exports = Block;
