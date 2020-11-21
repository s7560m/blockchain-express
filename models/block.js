const sha256 = require('js-sha256')
class Block {
    //
    constructor(timestamp, transactions = [], previousHash = '', currentHash = '') {

        this.index = 0
        this.previousHash = previousHash
        this.timestamp = timestamp;
        this.hash = ""
        this.nonce = 0
        this.transactions = transactions

    }
    addTransaction(transaction) {
        this.transactions.push(transaction)
    }
    // Mine the block with the given difficulty
    mine(difficulty) {
        while(!this.hash.startsWith(Array(difficulty).join("0"))) {
            this.nonce++;
            // Recalculate hash until correct nonce is reached
            this.hash = this.calculateHash();
            // console.log(this.hash);
        }
    }
    get key() {
        return JSON.stringify(this.transactions) + this.timestamp + this.index + this.previousHash + this.nonce
    }
    // Same thing as get key()
    calculateHash() {
        return sha256(JSON.stringify(this.transactions) + this.timestamp + this.index + this.previousHash + this.nonce)
    }
}

module.exports = Block