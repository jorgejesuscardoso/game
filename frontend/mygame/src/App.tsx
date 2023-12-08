/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import './style.css'
export type Player ={
  id: number,
  password: number,
  user_name: string,
  email: string,
  characters: [{
    id: number,
    character_name: string,
    character_class: string,
    character_level: number,
    character_experience: number,
    character_gold: number,
    character_hp: number,
    character_mp: number,
    character_strength: number,
    character_dexterity: number,
    character_intelligence: number,
    character_constitution: number,
    character_attack: number,
    character_defense: number,
    character_magic_attack: number,
    character_magic_defense: number,
  }]
}
export type NewPlayerType = {
  user_name: string,
  email: string,
  password: number,
}
export type EditPlayerType = {
  id: number,
  user_name: string,
  email: string,
  password: number,
}
export type CharactType = {
  char_id?: number,
  character_name: string,
  character_class: string,
  character_level: number,
  character_experience: number,
  character_gold: number,
  character_hp: number,
  character_mp: number,
  character_strength: number,
  character_dexterity: number,
  character_intelligence: number,
  character_constitution: number,
  character_attack: number,
  character_defense: number,
  character_magic_attack: number,
  character_magic_defense: number,
}
export type CreateCharactType = {
  user_id: number,
  character_name: string,
  character_class: string,
  character_level: number,
  character_experience: number,
  character_gold: number,
  character_hp: number,
  character_mp: number,
  character_strength: number,
  character_dexterity: number,
  character_intelligence: number,
  character_constitution: number,
  character_attack: number,
  character_defense: number,
  character_magic_attack: number,
  character_magic_defense: number,
}

function App() {
  const [players, setPlayers] = useState([])
  const [newPlayer, setNewPlayer] = useState<NewPlayerType>({
    user_name: '',
    email: '',
    password: 0
  })
  const [editPlayer, setEditPlayer] = useState<EditPlayerType>({
    id: 0,
    password: 0,
    user_name: '',
    email: '',
  })
  const [deletePlayer, setDeletePlayer] = useState<number>(0)
  const [createChar, setCreateChar] = useState<CreateCharactType>({
    user_id: 0,
    character_name: '',
    character_class: '',
    character_level: 1,
    character_experience: 0,
    character_gold: 0,
    character_hp: 100,
    character_mp: 100,
    character_strength: 10,
    character_dexterity: 10,
    character_intelligence: 10,
    character_constitution: 10,
    character_attack: 100,
    character_defense: 100,
    character_magic_attack: 100,
    character_magic_defense: 100,
  })
  const [deleteChar, setDeleteChar] = useState({
    char_id: 0,
    user_id: 0,
  })
  const [enemy, setEnemy] = useState({
    enemy_hp: 100,
    enemy_defense: 200,
  })
  const [playerStatus, setPlayerStatus] = useState<any>(0)

  useEffect(() => {
    const getPlayers = async () => {
      const response = await fetch('http://localhost:3006/player')
      const data = await response.json()
      setPlayers(data)
    }
    getPlayers()
    const char1 = players.map((s: any) => s = s.characters[0])
    const status = char1.map((s: any) => s.character_attack )
    setPlayerStatus(status)
  }, [players])

  const handleCreateNewPlayer = async () => {
    try {
    const response = await fetch('http://localhost:3006/player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPlayer)
    })
    if (!response.ok) {
      throw new Error('Não foi possível criar o jogador!')
    }
    if (response.ok) {
      alert('Jogador criado com sucesso!')
    
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    const data = await response.json()
    console.log('Criado com sucesso!', data)

    } catch (error) {
      console.log(error)
    }
  }
  const handleEditPlayer = async () => {
    try {
    const response = await fetch(`http://localhost:3006/player/${editPlayer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editPlayer)
    })
    if (response.ok) {
      alert('Jogador editado com sucesso!')
    
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (!response.ok) {
      throw new Error('Não foi possível editar o jogador!')
    }
    const data = await response.json()
    console.log('Editado com sucesso!',data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeletePlayer = async () => {
    try {
    const response = await fetch(`http://localhost:3006/player/${deletePlayer}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      alert('Jogador deletado com sucesso!')
    
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (!response.ok) {
      throw new Error('Não foi possível deletar o jogador!')
    }
    const data = await response.json()
    console.log('Deletado com sucesso!', data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateChar = async () => {
    try {
    const response = await fetch(`http://localhost:3006/player/character`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createChar)
    })
    if (response.ok) {
      alert('Personagem criado com sucesso!')
    
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (!response.ok) {
      throw new Error('Não foi possível criar o personagem!')
    }
    const data = await response.json()
    console.log('Personagem criado com sucesso!', data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleDeleteChar = async () => {
    try {
    const response = await fetch(`http://localhost:3006/player/character`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deleteChar)
    })
    if (response.ok) {
      alert('Personagem deletado com sucesso!')
    
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (!response.ok) {
      throw new Error('Não foi possível deletar o personagem!')
    }
    const data = await response.json()
    console.log('Personagem deletado com sucesso!', data)
    } catch (error) {
      console.log(error)
    }
  }
  const handlefight = () => {
    const enemyHp = enemy.enemy_hp - ((playerStatus *2) / enemy.enemy_defense);
    setEnemy({...enemy, enemy_hp: enemyHp})

    if (enemyHp <= 0) {
      alert('Você venceu!')
    }

    console.log(enemyHp)    
  }
  return (
    <>
      <h1>My Game</h1>
        {players.map((player: Player) => (
          <div key={player.id} className="player_data">
            <div className="user_data">
              <h2>Dados do jogador</h2>
              <br />
              <p><b>ID:</b> { player.id }</p>
              <p><b>Nome:</b> { player.user_name }</p>
              <p><b>Senha:</b> { player.password }</p>
              <p><b>Email:</b> { player.email } </p>
            </div>
            <br />
            { player.characters ? (player.characters && player.characters.map((char: CharactType) => (
              <div className="char_data" key={ char.char_id }>
                <h2>Status do personagem {char.char_id}</h2>
                <br />
                <p><b>ID:</b> { char.char_id }</p>
                <p><b>Nível:</b> { char.character_level }</p>
                <p><b>Experiência:</b> { char.character_experience }</p>
                <p><b>Nome:</b> { char.character_name }</p>
                <p><b>Classe:</b> { char.character_class }</p>
                <p><b>Ouro:</b> { char.character_gold }</p>
                <p><b>HP:</b> { char.character_hp }</p>
                <p><b>MP:</b> { char.character_mp }</p>
                <p><b>Força:</b> { char.character_strength }</p>
                <p><b>Destreza:</b> { char.character_dexterity }</p>
                <p><b>Inteligência:</b> { char.character_intelligence }</p>
                <p><b>Constituição:</b> { char.character_constitution }</p>
                <p><b>Ataque:</b> { char.character_attack }</p>
                <p><b>Defesa:</b> { char.character_defense }</p>
                <p><b>Ataque Mágico:</b> { char.character_magic_attack }</p>
                <p><b>Defesa Mágica:</b> { char.character_magic_defense }</p>
                <br />
              </div>
            )))
            : (
              <div>
                <h2>Status do personagem</h2>
                <br />
                <p>Não possui personagem ainda!</p>
              </div>
            )}

                <h2>Inimigo teste</h2>
                <br />
                <p><b>HP:</b> { enemy.enemy_hp }</p>
                <p><b>Defesa:</b> { enemy.enemy_defense }</p>
                <br />
                <button onClick={ handlefight }>Lutar</button>
          </div>
        ))}
      <br />
      <div className="create_player">
        <h2>Criar novo jogador</h2>
        <br />
        <input type="text" placeholder="Nome" onChange={(e) => setNewPlayer({...newPlayer, user_name: e.target.value})} />
        <input type="text" placeholder="Email" onChange={(e) => setNewPlayer({...newPlayer, email: e.target.value})} />
        <input type="password" placeholder="Senha" onChange={(e) => setNewPlayer({...newPlayer, password: Number(e.target.value)})} />
        <button onClick={handleCreateNewPlayer}>Criar</button>
      </div>
      <br />
      <br /> 
      <div className="edit_player">
        <h2>Editar jogador</h2>
        <br />
        <input type="text" placeholder="ID" onChange={(e) => setEditPlayer({...editPlayer, id: Number(e.target.value)})} />
        <input type="text" placeholder="Novo nome" onChange={(e) => setEditPlayer({...editPlayer, user_name: e.target.value})} />
        <input type="text" placeholder="Novo email" onChange={(e) => setEditPlayer({...editPlayer, email: e.target.value})} />
        <input type="password" placeholder="Senha" onChange={(e) => setEditPlayer({...editPlayer, password: Number(e.target.value)})} />
        <button onClick={handleEditPlayer}>Editar</button>
      </div>
      <br />
      <br />
      <div className="delete_player">
        <h2>Deletar jogador</h2>
        <br />
        <input type="text" placeholder="ID" onChange={(e) => setDeletePlayer(Number(e.target.value))} />
        <button onClick={handleDeletePlayer}>Deletar</button>
      </div>
      <br />
      <br />
      <div className="create_char">
        <h2>Criar novo personagem</h2>
        <br />
        <input type="text" placeholder="ID do jogador" onChange={(e) => setCreateChar({...createChar, user_id: Number(e.target.value)})} />

        <input type="text" placeholder="Nome" onChange={(e) => setCreateChar({...createChar, character_name: e.target.value})} />
        
        <select
          name="class"
          id="class"
          onChange={(e) => setCreateChar({...createChar, character_class: e.target.value})}
        >
          <option value="">Classe</option>
          <option value="warrior">Guerreiro</option>
          <option value="mage">Mago</option>
          <option value="archer">Arqueiro</option>
          <option value="priest">Sacerdote</option>
          <option value="barbarian">Barbaro</option>
          <option value="assassin">Mercenário</option>
        </select>
        <button onClick={ handleCreateChar }>Criar</button>
        </div>
        <br />
        <br />
        <div className="delete_char">
          <h2>Deletar personagem</h2>
          <br />
          <input
            type="text"
            name="userId"
            id="ui"
            placeholder="ID do jogador"
            onChange={(e) => setDeleteChar({...deleteChar, user_id: Number(e.target.value)})}
            />
          <input type="text" placeholder="ID" onChange={(e) => setDeleteChar({...deleteChar, char_id: Number(e.target.value)})} />
          <button onClick={handleDeleteChar}>Deletar</button>
        </div>
        <br />
        <br />
    </>
  )
}

export default App
