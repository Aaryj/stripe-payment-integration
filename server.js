const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });
        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
