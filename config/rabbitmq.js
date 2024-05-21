const amqp = require('amqplib/callback_api');

let channel = null;
let connection = null;

const connectRabbitMQ = () => {
    return new Promise((resolve, reject) => {
        amqp.connect(process.env.RABBITMQ_URL, (error0, conn) => {
            if (error0) {
                reject(error0);
            }
            connection = conn;
            connection.createChannel((error1, ch) => {
                if (error1) {
                    reject(error1);
                }
                channel = ch;
                console.log('Connected to RabbitMQ');
                resolve();
            });
        });
    });
};

const getChannel = () => {
    if (!channel) {
        throw new Error('RabbitMQ channel is not created');
    }
    return channel;
};

const closeRabbitMQ = () => {
    console.log('close');
    if (channel) {
        channel.close((err) => {
            if (err) {
                console.error('Error closing RabbitMQ channel', err);
            } else {
                console.log('RabbitMQ channel closed');
            }
        });
    }
    console.log('close connection');
    if (connection) {
        connection.close((err) => {
            if (err) {
                console.error('Error closing RabbitMQ connection', err);
            } else {
                console.log('RabbitMQ connection closed');
            }
        });
    }
};

process.on('exit', (code) => {
    console.log('1');
    closeRabbitMQ();
    console.log(`About to exit with code: ${code}`);
});

module.exports = { connectRabbitMQ, getChannel, closeRabbitMQ };