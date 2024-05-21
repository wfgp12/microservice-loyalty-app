const Loyalty = require("../models/loyalty");


const createLoyaltyPointsService = async (user, description="", points) => {
    try {
        const loyaltyRecord = await Loyalty.create({
            user: user,
            points: points,
            description: description
        });
        console.log(`Loyalty points for user ${userData.userId} created successfully`);
    } catch (error) {
        console.error('Error creating loyalty points', error);
    }
};

module.exports = { createLoyaltyPointsService };
