const { createLoyaltyPointsService } = require("../services/loyalty-service");

module.exports = {
    createLoyaltyPointController: async (req, res) => {
        try {
            const {user, points, description} = req.body;
            await createLoyaltyPointsService(user, points, description);
            res.status(201).send({ message: 'Loyalty points created successfully' });
        } catch (error) {
            res.status(500).send({ error: 'Failed to create loyalty points' });
        }
    }
}