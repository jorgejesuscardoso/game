const createCharacter = async (req, res, next) => {
  
  const { user_id,
    character_name,
    character_class,
    character_level,
    character_experience,
    character_gold,
    character_hp,
    character_mp,
    character_strength,
    character_dexterity,
    character_intelligence,
    character_constitution,
    character_attack,
    character_defense,
    character_magic_attack,
    character_magic_defense} = req.body;

    if (!user_id || !character_name || !character_class || !character_level || character_experience !== 0 || character_gold !== 0 || !character_hp || !character_mp || !character_strength || !character_dexterity || !character_intelligence || !character_constitution || !character_attack || !character_defense || !character_magic_attack || !character_magic_defense) {
      return res.status(400).json({ message: "Please fill out all fields" });
    }

    next();
  };


module.exports = createCharacter;