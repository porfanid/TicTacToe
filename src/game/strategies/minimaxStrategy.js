import {
  PLAYER_O,
  PLAYER_X,
  getAvailableMoves,
  getGameStatus,
  getNextPlayer,
  makeMove,
} from '../engine'

const scoreBoard = (status, maximizingPlayer, depth) => {
  if (!status.isFinished) {
    return 0
  }

  if (status.isDraw) {
    return 0
  }

  if (status.winner === maximizingPlayer) {
    return 10 - depth
  }

  return depth - 10
}

const minimax = (board, currentPlayer, maximizingPlayer, depth) => {
  const status = getGameStatus(board)

  if (status.isFinished) {
    return { score: scoreBoard(status, maximizingPlayer, depth), move: null }
  }

  const availableMoves = getAvailableMoves(board)
  const isMaximizing = currentPlayer === maximizingPlayer

  let bestScore = isMaximizing ? -Infinity : Infinity
  let bestMove = availableMoves[0]

  for (const move of availableMoves) {
    const nextBoard = makeMove(board, move, currentPlayer)
    const nextPlayer = getNextPlayer(currentPlayer)
    const result = minimax(nextBoard, nextPlayer, maximizingPlayer, depth + 1)

    if (isMaximizing && result.score > bestScore) {
      bestScore = result.score
      bestMove = move
    }

    if (!isMaximizing && result.score < bestScore) {
      bestScore = result.score
      bestMove = move
    }
  }

  return { score: bestScore, move: bestMove }
}

export const createMinimaxStrategy = (aiPlayer = PLAYER_O) => ({
  id: 'minimax',
  getMove(board, currentPlayer) {
    if (currentPlayer !== aiPlayer) {
      return null
    }

    const { move } = minimax(board, aiPlayer, aiPlayer, 0)
    return move
  },
})

export const defaultSinglePlayerConfig = {
  players: {
    [PLAYER_X]: { type: 'human' },
    [PLAYER_O]: { type: 'ai', strategy: createMinimaxStrategy(PLAYER_O) },
  },
}
