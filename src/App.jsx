import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import {
  PLAYER_X,
  createInitialBoard,
  getGameStatus,
  getNextPlayer,
  makeMove,
} from './game/engine'
import { defaultSinglePlayerConfig } from './game/strategies/minimaxStrategy'

const getStatusMessage = (status, currentPlayer) => {
  if (status.winner) {
    return `Winner: ${status.winner}`
  }

  if (status.isDraw) {
    return 'Draw game'
  }

  return `Turn: ${currentPlayer}`
}

function App() {
  const [board, setBoard] = useState(createInitialBoard)
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_X)
  const [gameConfig] = useState(defaultSinglePlayerConfig)

  const status = useMemo(() => getGameStatus(board), [board])

  const performMove = useCallback((index) => {
    if (status.isFinished) {
      return
    }

    const nextBoard = makeMove(board, index, currentPlayer)

    if (nextBoard === board) {
      return
    }

    setBoard(nextBoard)
    setCurrentPlayer(getNextPlayer(currentPlayer))
  }, [board, currentPlayer, status.isFinished])

  useEffect(() => {
    if (status.isFinished) {
      return
    }

    const currentConfig = gameConfig.players[currentPlayer]
    if (!currentConfig || currentConfig.type !== 'ai') {
      return
    }

    const aiMove = currentConfig.strategy.getMove(board, currentPlayer)
    if (typeof aiMove === 'number') {
      const timerId = window.setTimeout(() => performMove(aiMove), 250)
      return () => window.clearTimeout(timerId)
    }
  }, [board, currentPlayer, gameConfig, performMove, status.isFinished])

  return (
    <main className="app">
      <h1>Tic Tac Toe</h1>
      <p className="subtitle">Single player vs minimax algo</p>
      <p className="status" aria-live="polite">
        {getStatusMessage(status, currentPlayer)}
      </p>

      <section className="board" aria-label="Tic tac toe board">
        {board.map((cell, index) => (
          <button
            key={index}
            type="button"
            className="cell"
            onClick={() => performMove(index)}
            disabled={cell !== null || status.isFinished}
            aria-label={`Cell ${index + 1}`}
          >
            {cell}
          </button>
        ))}
      </section>

      <button
        type="button"
        className="reset"
        onClick={() => {
          setBoard(createInitialBoard())
          setCurrentPlayer(PLAYER_X)
        }}
      >
        Reset game
      </button>
    </main>
  )
}

export default App
