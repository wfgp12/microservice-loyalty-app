const { getChannel } = require('../config/rabbitmq');
const { createLoyaltyPointsService } = require('../services/loyalty-service');

const startLoyaltyConsumer = async () => {
    try {
        const channel = getChannel();
        const queue = 'loyaltyPointsQueue';

        channel.assertQueue(queue, { durable: false });

        channel.consume(queue, async (msg) => {
            const {description, user, points} = JSON.parse(msg.content.toString());

            await createLoyaltyPointsService(user.id, description, points);
        }, { noAck: true });

        console.log('Loyalty consumer started');
    } catch (error) {
        console.error('Failed to start loyalty consumer', error);
        throw error;
    }
};

module.exports = { startLoyaltyConsumer };
