import Block from '../block'
import Transaction from '../transaction'

class Blockchain {
  chain: Array<Block>;
  difficulty: number;
  pendingTransactions: Array<Transaction>;
  miningReward: number;

  constructor () {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.miningReward = 100;
    this.pendingTransactions = [];
  }

  createGenesisBlock () {
    return new Block(new Date("01/01/2017"), [], "0");
  }

  getLatestBlock () {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions (miningRewardAddress) {
    let block = new Block(new Date(), this.pendingTransactions, this.chain[this.chain.length - 1].hash);
    block.mineBlock(this.difficulty)

    console.log('Block successfully mined!')
    this.chain.push(block)

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ]
  }

  createTransaction (transaction: Transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress (address: string) {
    let balance = 0;

    for (let block of this.chain) {
      for (let transaction of block.transactions) {
        if (transaction.toAddress === address) {
          balance += transaction.amount
        }

        else if (transaction.fromAddress === address) {
          balance -= transaction.amount
        }
      }
    }

    return balance
  }

  addBlock (newBlock: Block) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty)
    this.chain.push(newBlock);
  }

  isChainValid (): boolean {
    return this.chain.reduce((isValid, currBlock, currBlockIndex) => {
      if (currBlockIndex === 0) {
        return isValid;
      }

      return (
        isValid 
        && currBlock.hash === currBlock.calculateHash() 
        && currBlock.previousHash === this.chain[currBlockIndex - 1].hash
      )
    }, true)
  }
}

export default Blockchain