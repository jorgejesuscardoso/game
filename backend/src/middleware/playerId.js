const players = require('../data/players');

const playerId = (req, res, next) => {
    const { id } = req.params;
    const player = players.find((player) => player.id === Number(id));

    if (!player || player.id !== Number(id)) {
        return res.status(404).json({ message: 'ID inválida' });
    }

    next();
}

module.exports = {
    playerId,
};