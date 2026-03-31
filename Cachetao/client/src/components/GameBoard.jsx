import { useState } from 'react';
import './GameBoard.css';

export default function GameBoard({ gameState, onRoundResult, onResetGame }) {
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [selectedLoser, setSelectedLoser] = useState(null);

  const activePlayers = gameState?.players || [];
  
  const handleSubmitRound = () => {
    if (!selectedWinner || !selectedLoser) {
      alert('Selecione o vencedor e o perdedor');
      return;
    }

    const otherPlayers = activePlayers
      .filter((p) => p.id !== selectedWinner && p.id !== selectedLoser)
      .map((p) => p.id);

    onRoundResult(selectedWinner, selectedLoser, otherPlayers);
    
    setSelectedWinner(null);
    setSelectedLoser(null);
  };

  const activePLayerCount = activePlayers.filter((p) => p.status === 'active').length;
  const isGameOver = activePLayerCount <= 1;

  return (
    <div className="game-board">
      <div className="game-status">
        <h2>🎮 Jogo em Andamento</h2>
        <div className="status-info">
          <span>Jogadores Ativos: {activePLayerCount}</span>
          {gameState?.status === 'finished' && (
            <span className="game-finished">JOGO FINALIZADO</span>
          )}
        </div>
      </div>

      <div className="placar-section">
        <h3>📊 Placar Atual</h3>
        <div className="placar-list">
          {activePlayers.map((player) => (
            <div key={player.id} className={`player-row ${player.status}`}>
              <div className="player-info">
                <span className="player-name">{player.name}</span>
                <span className={`player-status ${player.status}`}>
                  {player.status === 'active' ? '✓ Ativo' : '✗ Eliminado'}
                </span>
              </div>
              <div className="player-points">
                <span className="points-number">{player.points}</span>
                <span className="points-label">Pontos</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!isGameOver && (
        <div className="round-section card">
          <h3>⚡ Registrar Rodada</h3>
          
          <div className="round-form">
            <div className="form-group">
              <label>Quem VENCEU a rodada?</label>
              <div className="player-buttons">
                {activePlayers
                  .filter((p) => p.status === 'active')
                  .map((player) => (
                    <button
                      key={player.id}
                      className={`player-btn ${selectedWinner === player.id ? 'selected' : ''}`}
                      onClick={() => setSelectedWinner(player.id)}
                    >
                      ✓ {player.name}
                    </button>
                  ))}
              </div>
            </div>

            <div className="form-group">
              <label>Quem PERDEU a rodada?</label>
              <div className="player-buttons">
                {activePlayers
                  .filter((p) => p.status === 'active')
                  .map((player) => (
                    <button
                      key={player.id}
                      className={`player-btn ${selectedLoser === player.id ? 'selected-danger' : ''}`}
                      onClick={() => setSelectedLoser(player.id)}
                    >
                      ✗ {player.name}
                    </button>
                  ))}
              </div>
            </div>

            <button 
              className="btn btn-primary btn-submit"
              onClick={handleSubmitRound}
              disabled={!selectedWinner || !selectedLoser || selectedWinner === selectedLoser}
            >
              ✓ Registrar Rodada
            </button>
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="game-over card">
          <h2>🏆 Jogo Finalizado!</h2>
          <div className="winner">
            <p className="winner-name">Vencedor: {activePlayers[0]?.name}</p>
            <p className="winner-points">{activePlayers[0]?.points} Pontos</p>
          </div>
          <button className="btn btn-primary btn-large" onClick={onResetGame}>
            🔄 Novo Jogo
          </button>
        </div>
      )}
    </div>
  );
}
