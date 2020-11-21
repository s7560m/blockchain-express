let Block = require('./block')
let Transaction = require('./transaction')
let HoffCoin = require('./hoffcoin')
let sha256 = require('js-sha256')
class Blockchain {
    // genesis block refers to the block origin
    constructor(genesisBlock, difficulty = 5) {
        this.blocks = [genesisBlock]
        this.difficulty = difficulty;
        // Pending transactions to be stored in the blockchain
        this._pendingTransactions = [];
    }

    // Set the pending transactions
    addPendingTransactions(pendingTransactions) {
        this._pendingTransactions.push(pendingTransactions);
    }

    // Reset pending transactions method to prevent boilerplate coding
    resetPendingTransactions() {
        this._pendingTransactions = [];
    }
    // In reality miners have to pick which transactions will go on the blockchain
    minePendingTransactions(miningRewardAddress) {
        let block = new Block(new Date().toISOString(), this._pendingTransactions, this.getPreviousBlock().hash);
        block.mine(this.difficulty);
        block.index = this.blocks.length;

        // push mined block to blockchain
        this.blocks.push(block);

        // reset pending transactions with pending reward
        this.resetPendingTransactions();
        this.addPendingTransactions(new Transaction(null, miningRewardAddress, new HoffCoin(5)))

    }

    getPreviousBlock() {
        return this.blocks[this.blocks.length - 1]
    }
    // Validate blockchain by iterating through blocks and determining hashes
    isChainValid(currentBlock = this.getPreviousBlock()) {
        /** blockchain can never be less than length of one
         * if blockchain only length of one, automatically returns true because
         * chain only contains genesis block.
         */
        if (this.blocks.length === 1) {
            return true;
        }
        /** Let's regenerate the hash and ensure that it matches up with
         * the current hash.
         */
        else if (currentBlock.hash !== currentBlock.key) {
            return false;
        }
        /** -------------------------------------------------------------
         * Otherwise we'll have to loop through the blockchain and ensure
         * that the current block's previous hash matches with the previous block's hash
         */
        else {
            return this.blocks.some((block, index) => {
                if (index !== 0) {
                    return block.previousHash === this.blocks[index - 1].hash
                }
            })
        }
    }
}

module.exports = Blockchain