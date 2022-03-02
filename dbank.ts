const express = require('express');
const app = express();
const port = 3000;
const fetch = require("node-fetch");

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
});

// -- Webserver started
const bankId = "a";

// How much balance on :account ?
app.get('/balance/:account', async (req, res) => {
    const accounts = await getCurrentBalances(bankId);
    res.send("Balance: " + accounts[req.params.account] || 0);
});

// Transfer from :from to :to with amount :amount
app.post('/transfer/:from/:to/:amount', async (req, res) => {
    const amount = parseInt(req.params.amount);
    const accounts = await getCurrentBalances(bankId);
    if (accounts[req.params.from] < amount)
        return res.status(400).send("Insufficent funds");

    await fetch("http://192/balances/" + req.params.from + "/" + req.params.from + "/" + req.params.amount);

    return res.send(true);
});

// Get database
app.get('/balances', async (req, res) => {
    const accounts = await getCurrentBalances(bankId);
    return res.send(accounts);
})

// Get Version
app.get('/version', (req, res) => {
    const pck = require("./package.json");
    return res.send("Version: " + pck.version);
});

const getCurrentBalances = async(bank_id) => {
    return await (await fetch("http://192/balances/a")).json();
}
