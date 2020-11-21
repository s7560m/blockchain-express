var express = require('express');
var router = express.Router();
var Block = require('../models/block');
var Blockchain = require('../models/blockchain');
var Transaction = require('../models/transaction');
var HoffCoin = require('../models/hoffcoin')

// Define genesis block and its initial hash
let genesisBlock = new Block(new Date().toISOString());
genesisBlock.hash = genesisBlock.calculateHash();

const DIFFICULTY = 6;
// Create a new blockchain with genesis block at the start
let blockchain = new Blockchain(genesisBlock, DIFFICULTY);

// Used when someone uses hoffcoins to buy something
// Stores as pending transaction
router.post('/addTransaction', (req, res) => {
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const amount = req.body.amount;

    let transaction = new Transaction(sender, receiver, new HoffCoin(amount));
    blockchain.addPendingTransactions(transaction)
    // let block = blockchain.getNextBlock([transaction])
    // blockchain.addBlock(block);
    res.send("transaction successfully added");
});

router.post('/addTransactionToBlockchain', (req, res) => {
    const rewardAddress = req.body.rewardAddress;
    blockchain.minePendingTransactions(rewardAddress);
    res.send("block successfully added!");
});

router.get('/read', (req, res) => {
    res.send(blockchain);
});

router.get('/validateBlockchain', (req, res) => {
    if (blockchain.isChainValid(blockchain)) {
        res.send('chain is valid');
    } else {
        res.send('chain is not valid');
    }
});
module.exports = router;