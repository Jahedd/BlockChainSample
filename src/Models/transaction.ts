import secp256k1 from "secp256k1";
import crypto from "crypto";

const SHA256 = (message) =>
  crypto.createHash("sha256").update(message).digest("hex");

export default class Transaction {
  fromAddress: string;
  toAddress: string;
  amount: number;
  timeStamp: number;
  signature: string[];
  constructor(fromAddress: string, toAddress: string, amount: number) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.timeStamp = Date.now();
    this.signature = [];
  }
  getHash(): string {
    return SHA256(
      this.fromAddress + this.toAddress + this.amount + this.timeStamp
    );
  }
  signTransaction(secretKey: string): void {
    const publicKey = secp256k1.publicKeyCreate(secretKey);
    if (publicKey == this.fromAddress) {
      const txHash = this.getHash();
      this.signature = secp256k1.ecdsaSign(txHash, secretKey);
    }
  }

  isValid(): boolean {
    if (this.fromAddress == "System") return true;
    if (this.signature == null || this.signature.length == 0) {
      return false;
    }

    return secp256k1.ecdsaVerify(
      this.signature,
      this.getHash(),
      this.fromAddress
    );
  }
}
