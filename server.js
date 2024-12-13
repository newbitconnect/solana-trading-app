const express = require('express');
const solanaWeb3 = require('@solana/web3.js');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Solana connection
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');

// Buy token endpoint
app.post('/buy', async (req, res) => {
    const { privateKey, tokenAddress, amountInSol } = req.body;

    try {
        // Parse private key and create wallet
        const wallet = solanaWeb3.Keypair.fromSecretKey(new Uint8Array(privateKey));
        const transaction = new solanaWeb3.Transaction();

        // Example: Add buy logic here (integration with Raydium or Orca)
        const instruction = new solanaWeb3.TransactionInstruction({
            keys: [],
            programId: new solanaWeb3.PublicKey(tokenAddress),
            data: Buffer.from([]) // Replace with actual data
        });
        transaction.add(instruction);

        // Send transaction
        const signature = await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [wallet]);
        res.json({ status: 'success', signature });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Sell token endpoint
app.post('/sell', async (req, res) => {
    const { privateKey, tokenAddress, sellAmount } = req.body;

    try {
        // Parse private key and create wallet
        const wallet = solanaWeb3.Keypair.fromSecretKey(new Uint8Array(privateKey));
        const transaction = new solanaWeb3.Transaction();

        // Example: Add sell logic here
        const instruction = new solanaWeb3.TransactionInstruction({
            keys: [],
            programId: new solanaWeb3.PublicKey(tokenAddress),
            data: Buffer.from([]) // Replace with actual data
        });
        transaction.add(instruction);

        // Send transaction
        const signature = await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [wallet]);
        res.json({ status: 'success', signature });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
