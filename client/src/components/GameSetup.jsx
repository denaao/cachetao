import { useState } from 'react';
import axios from 'axios';
import './GameSetup.css';

export default function GameSetup({ onGameCreated, apiUrl }) {
  const [players, setPlayers] = useState(['', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePlayerChange = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const addPlayer = () => {
    if (players.length < 11) {
      setPlayers([...players, '']);
    }
  };

  const removePlayer = (index) => {
    if (players.length > 3) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validPlayers = players.filter((p) => p.trim());
    
    if (validPlayers.length < 3) {
      setError('Mínimo 3 jogadores necessários');
      return;
    }

    if (validPlayers.length > 11) {
      setError('Máximo 11 jogadores permitidos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${apiUrl}/api/games`, {
        playerNames: validPlayers
      });
      
      onGameCreated(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar jogo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="game-setup">
      <div className="card">
        <h2>Iniciar Novo Jogo</h2>
        <p className="subtitle">Digite os nomes dos jogadores (mínimo 3, máximo 11)</p>

        <form onSubmit={handleSubmit}>
          <div className="players-list">
            {players.map((player, index) => (
              <div key={index} className="player-input-group">
                <input
                  type="text"
                  placeholder={`Jogador ${index + 1}`}
                  value={player}
                  onChange={(e) => handlePlayerChange(index, e.target.value)}
                  autoFocus={index === 0}
                />
                {players.length > 3 && (
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removePlayer(index)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {players.length < 11 && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={addPlayer}
            >
              + Adicionar Jogador
            </button>
          )}

          {error && <div className="error">{error}</div>}

          <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
            {loading ? '⏳ Criando...' : '🎮 Começar Jogo'}
          </button>
        </form>

        <div className="rules">
          <h3>Regras Rápidas:</h3>
          <ul>
            <li>💰 Cada jogador começa com <strong>10 pontos</strong></li>
            <li>✅ Quem bate e ganha: <strong>mantém os pontos</strong></li>
            <li>❌ Quem bate e perde: <strong>-2 pontos</strong></li>
            <li>👥 Quem não bate: <strong>-1 ponto</strong></li>
            <li>🏆 Ganha quem sobrar vivo</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
