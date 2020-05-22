import { SHA256 } from 'crypto-js'
import { ec as EllipticCurve } from 'elliptic'
const curve = new EllipticCurve('secp256k1')

class Transaction {
  fromAddress?: string;
  toAddress: string;
  amount: number;
  signature: string;

  constructor (fromAddress: string, toAddress: string, amount: number) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  calculateHash (): string {
    return SHA256(this.fromAddress + this.toAddress + this.amount).toString()
  }

  signTransaction (signingKey) {
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('You cannot sign transactions for other wallets!')
    }

    const hashTx = this.calculateHash()
    const sig = signingKey.sign(hashTx, 'base64');
    this.signature = sig.toDER('hex')
  }

  isValid () {
    if (this.fromAddress === null) {
      return true
    }

    if (!this.signature || this.signature.length === 0) {
      throw new Error('No signature in this transaction.')
    }

    const publicKey = curve.keyFromPublic(this.fromAddress, 'hex')
    return publicKey.verify(this.calculateHash(), this.signature)
  }
}

export default Transaction