// middlewares

const newPlayer = (req, res, next) => {
    const { user_name, email, password } = req.body;
    if (!user_name || !email || !password) {
        return res.status(400).json({ message: "Dados inválidos" });
    }
    next();
}

module.exports = {
  newPlayer,
};