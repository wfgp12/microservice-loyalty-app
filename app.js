require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { connectRabbitMQ, closeRabbitMQ } = require('./config/rabbitmq');
const sequelize = require('./config/databases');
const LoyaltyRouter = require('./routes/loyalty-routes');

const { startLoyaltyConsumer } = require('./helpers/loyaltyConsumer');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

sequelize.sync()
.then(async() => {
        await connectRabbitMQ();
        await startLoyaltyConsumer()

        app.use('/api/loyalty', LoyaltyRouter);

        app.listen(PORT, () => {
            console.log(`Loyalty service running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

process.on('SIGINT', () => {
    closeRabbitMQ();
    process.exit();
});

process.on('SIGTERM', () => {
    closeRabbitMQ();
    process.exit();
});