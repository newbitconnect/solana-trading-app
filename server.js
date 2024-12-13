const express = require('express');
const solanaWeb3 = require('@solana/web3.js');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta "public"

// Solana connection
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');

// Rutas
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Enviar el archivo HTML principal
});

// Buy token endpoint
app.post('/buy', async (req, res) => {
    const { privateKey, tokenAddress, amountInSol } = req.body;

    try {
        const wallet = solanaWeb3.Keypair.fromSecretKey(new Uint8Array(privateKey));
        const transaction = new solanaWeb3.Transaction();
        const instruction = new solanaWeb3.TransactionInstruction({
            keys: [],
            programId: new solanaWeb3.PublicKey(tokenAddress),
            data: Buffer.from([]),
        });
        transaction.add(instruction);

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
        const wallet = solanaWeb3.Keypair.fromSecretKey(new Uint8Array(privateKey));
        const transaction = new solanaWeb3.Transaction();
        const instruction = new solanaWeb3.TransactionInstruction({
            keys: [],
            programId: new solanaWeb3.PublicKey(tokenAddress),
            data: Buffer.from([]),
        });
        transaction.add(instruction);

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
