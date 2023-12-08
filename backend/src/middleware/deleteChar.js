const deleteChar = (req, res, next) => {
  const { user_id, char_id } = req.body;
  
  if (!user_id || !char_id) {
    return res.status(400).json({ message: 'Missing user_id or char_id' });
  }

  next();
}

module.exports = {
  deleteChar,
};