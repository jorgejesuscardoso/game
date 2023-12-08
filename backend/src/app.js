//pasta src/app.js
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const players = require('./data/players.json');
const { newPlayer } = require('./middleware/newPLayer');
const { playerId } = require('./middleware/playerId');
const createCharacter = require('./middleware/createCharacter');
const { deleteChar } = require('./middleware/deleteChar');


app.use(express.json());
app.use(cors());

app.get('/player', (req, res) => {
    res.status(200).json(players);
});
app.get('/player/character', (req, res) => {
  const character = req.query.name;
  const playerId = req.query.id;
  const player = players && players.find((player) => player.id === +playerId).characters;
  const characterFound = player.find((char) => char.character_name === character);
  res.status(200).json(characterFound);
});

app.delete('/player/character', deleteChar, (req, res) => {
  const { user_id, char_id } = req.body;
  const player = players.find((player) => player.id === +user_id).characters;
  const characterIndex = player.findIndex((char) => char.char_id === char_id);

  player.splice(characterIndex, 1);

  const filePath = path.join(__dirname, 'data', 'players.json');
  fs.writeFile(filePath, JSON.stringify(players, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: 'Character deleted successfully' });
  });
});

app.get('/player/:id', playerId, (req, res) => {
  const { id } = req.params;
  const player = players.find((player) => player.id === +id);

  if (!player) {
      return res.status(404).json({ message: 'Player not found' });
  }

  res.status(200).json(player);
})

app.post('/player', newPlayer, (req, res) => {
  const { user_name, email, password } = req.body; 
  const id = players.length + 1;
  const newPlayer = { id, user_name, email, password, characters: [] };

  players.push(newPlayer);

  const filePath = path.join(__dirname, 'data', 'players.json');
  fs.writeFile(filePath, JSON.stringify(players, null, 2), (err) => {
      if (err) {
          return res.status(500).json({ message: err.message });
      }
      res.status(201).json(newPlayer);
  });
});

app.post('/player/character', createCharacter, (req, res) => {
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
    const player = players.find((player) => player.id === +user_id).characters;
    const char_id = player.length + 1;
    const newCharacter = { char_id, character_name, character_class, character_level, character_experience, character_gold, character_hp, character_mp, character_strength, character_dexterity, character_intelligence, character_constitution, character_attack, character_defense, character_magic_attack, character_magic_defense };

    player.push(newCharacter);
    const filePath = path.join(__dirname, 'data', 'players.json');
    fs.writeFile(filePath, JSON.stringify(players, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json(newCharacter);
    });

    res.status(200).json(newCharacter);
  });

app.put('/player/:id', (req, res) => {
  const { id } = req.params;
  const { user_name, email, password } = req.body;

  const player = players.find((player) => player.id === Number(id));

  if (!player) {
      return res.status(404).json({ message: 'Player not found' });
  }

  player.user_name = user_name || player.user_name;
  player.email = email || player.email;
  player.password = password || player.password;

  const filePath = path.join(__dirname, 'data', 'players.json');
  fs.writeFile(filePath, JSON.stringify(players, null, 2), (err) => {
      if (err) {
          return res.status(500).json({ message: err.message });
      }
      res.status(200).json(player);
  });
});

app.delete('/player/:id', (req, res) => {
  const { id } = req.params;

  const playerIndex = players.findIndex((player) => player.id === +id);

  if (playerIndex === -1) {
    return res.status(404).json({ message: 'Player not found' });
  }

  players.splice(playerIndex, 1);

  const filePath = path.join(__dirname, 'data', 'players.json');
  fs.writeFile(filePath, JSON.stringify(players, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: 'Player deleted successfully' });
  });
});


module.exports = app;