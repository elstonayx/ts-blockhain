import Blockchain from './blockchain'
import Transaction from './transaction';

let coin = new Blockchain();

coin.createTransaction(new Transaction('address1', 'address2', 100))
coin.createTransaction(new Transaction('address2', 'address1', 10))
coin.createTransaction(new Transaction('address1', 'address2', 5))

coin.minePendingTransactions('address3')
console.log(coin.getBalanceOfAddress('address3'))
console.log(JSON.stringify(coin.chain, null, 2))