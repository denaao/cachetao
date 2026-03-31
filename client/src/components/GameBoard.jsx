import { useState } from 'react';
import './GameBoard.css';

export default function GameBoard({ gameState, onRoundResult, onResetGame }) {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectionStep, setSelectionStep] = useState('participants');

  const players = gameState?.players || [];
  const activePlayers = players.filter((player) => player.status === 'active');

  const toggleParticipant = (playerId) => {
    if (selectionStep !== 'participants') {
      return;
    }

    setSelectedPlayers((currentPlayers) => {
      if (currentPlayers.includes(playerId)) {
        return currentPlayers.filter((id) => id !== playerId);
      }

      return [...currentPlayers, playerId];
    });
  };

  const goToWinnerSelection = () => {
    if (selectedPlayers.length < 2) {
      alert('Selecione pelo menos 2 jogadores que foram para a rodada');
      return;
    }

    setSelectionStep('winner');
  };

  const handleWinnerClick = (winnerId) => {
    if (selectionStep !== 'winner') {
      return;
    }

    onRoundResult(selectedPlayers, winnerId);
    setSelectedPlayers([]);
    setSelectionStep('participants');
  };

  const cancelRoundSelection = () => {
    setSelectedPlayers([]);
    setSelectionStep('participants');
  };

  const activePlayerCount = activePlayers.length;
  const isGameOver = activePlayerCount <= 1;
  const winnerPlayer = activePlayers[0] || players.find((player) => player.status === 'active');

  return (
    <div className="game-board">
      <div className="game-status">
        <h2>🎮 Jogo em Andamento</h2>
        <div className="status-info">
          <span>Jogadores Ativos: {activePlayerCount}</span>
          {gameState?.status === 'finished' && (
            <span className="game-finished">JOGO FINALIZADO</span>
          )}
        </div>
      </div>

      <div className="placar-section">
        <h3>📊 Placar Atual</h3>
        <div className="placar-list">
          {players.map((player) => (
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
              {selectionStep === 'participants' ? (
                <>
                  <label>Clique nos jogadores que foram para a rodada</label>
                  <div className="player-buttons vertical">
                    {activePlayers.map((player) => (
                      <button
                        key={player.id}
                        type="button"
                        className={`player-btn row ${selectedPlayers.includes(player.id) ? 'selected' : ''}`}
                        onClick={() => toggleParticipant(player.id)}
                      >
                        <span>{player.name}</span>
                        <span>{selectedPlayers.includes(player.id) ? 'Na rodada' : 'Disponivel'}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <label>Agora clique em quem ganhou a rodada</label>
                  <div className="player-buttons vertical">
                    {activePlayers
                      .filter((player) => selectedPlayers.includes(player.id))
                      .map((player) => (
                        <button
                          key={player.id}
                          type="button"
                          className="player-btn row winner-pick"
                          onClick={() => handleWinnerClick(player.id)}
                        >
                          <span>{player.name}</span>
                          <span>Clique para confirmar vencedor</span>
                        </button>
                      ))}
                  </div>
                </>
              )}
            </div>

            <div className="round-summary">
              <span>{selectedPlayers.length} jogador(es) selecionado(s) para a rodada</span>
              <span>Selecionados e sem vencer: -2 pontos</span>
              <span>Quem ficou fora: -1 ponto</span>
            </div>

            {selectionStep === 'participants' ? (
              <button
                type="button"
                className="btn btn-primary btn-submit"
                onClick={goToWinnerSelection}
                disabled={selectedPlayers.length < 2}
              >
                ✓ Escolher vencedor
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary btn-submit"
                onClick={cancelRoundSelection}
              >
                ↩ Voltar para selecao
              </button>
            )}
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="game-over card">
          <h2>🏆 Jogo Finalizado!</h2>
          <div className="winner">
            <p className="winner-name">Vencedor: {winnerPlayer?.name}</p>
            <p className="winner-points">{winnerPlayer?.points} Pontos</p>
          </div>
          <button className="btn btn-primary btn-large" onClick={onResetGame}>
            🔄 Novo Jogo
          </button>
        </div>
      )}
    </div>
  );
}
