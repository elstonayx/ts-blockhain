import Blockchain from './src/blockchain'
import Transaction from './src/transaction';
import { ec as EllipticCurve } from 'elliptic'
const curve = new EllipticCurve('secp256k1')

const PRIVATE_KEY = '86b1999bde12f4c230035768936288200c7595bf244e0a5d9b1fa68a5b7920d8'

const myKey = curve.keyFromPrivate(PRIVATE_KEY)
const myWalletAddress = myKey.getPublic('hex')

let coin = new Blockchain();

const transaction1 = new Transaction(myWalletAddress, 'some other public key', 10)
transaction1.signTransaction(myKey)

coin.addTransaction(transaction1)

coin.minePendingTransactions(myWalletAddress)
coin.minePendingTransactions(myWalletAddress)
console.log(coin.getBalanceOfAddress(myWalletAddress))
console.log(coin.pendingTransactions)