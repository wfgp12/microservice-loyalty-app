require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { connectRabbitMQ, getChannel, closeRabbitMQ } = require('./config/rabbitmq');
const sequelize = require('./config/databases');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

sequelize.sync()
.then(async() => {
        await connectRabbitMQ();
        console.log('Database connected and models synced');

        const channel = getChannel();
        const queue = 'loyaltyPointsQueue';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.consume(queue, async (msg) => {
            const userData = JSON.parse(msg.content.toString());
            console.log(`Received message for user: ${JSON.stringify(userData)}`);

            // try {
            //     // Crear o actualizar puntos de lealtad en la base de datos
            //     const loyaltyRecord = await Loyalty.create({
            //         user: userData.userId,
            //         points: userData.points,
            //         description: 'Initial loyalty points'
            //     });

            //     console.log(`Loyalty points for user ${userData.userId} created successfully`);
            // } catch (error) {
            //     console.error('Error creating loyalty points', error);
            // }
        }, {
            noAck: true
        });

        app.listen(PORT, () => {
            console.log(`Loyalty service running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

process.on('SIGINT', () => {
    console.log(2);
    closeRabbitMQ();
    process.exit();
});

process.on('SIGTERM', () => {
    console.log(3);
    closeRabbitMQ();
    process.exit();
});