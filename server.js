const express = require('express');
const solanaWeb3 = require('@solana/web3.js');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos desde "public"

// Solana connection
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');

// Ruta principal: Servir el archivo HTML desde "public/index.html"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint para comprar tokens
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

// Endpoint para vender tokens
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

// Iniciar servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
