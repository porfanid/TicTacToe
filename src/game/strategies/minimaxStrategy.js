import {
  PLAYER_O,
  PLAYER_X,
  getAvailableMoves,
  getGameStatus,
  getNextPlayer,
} from '../engine'

const scoreBoard = (status, maximizingPlayer, depth) => {
  if (!status.isFinished || status.isDraw) {
    return 0
  }

  return status.winner === maximizingPlayer ? 10 - depth : depth - 10
}

const minimax = (
  board,
  currentPlayer,
  maximizingPlayer,
  depth,
  alpha,
  beta,
) => {
  const status = getGameStatus(board)

  if (status.isFinished) {
    return { score: scoreBoard(status, maximizingPlayer, depth), move: null }
  }

  const availableMoves = getAvailableMoves(board)
  const isMaximizing = currentPlayer === maximizingPlayer

  let bestScore = isMaximizing ? -Infinity : Infinity
  let bestMove = availableMoves[0]

  for (const move of availableMoves) {
    board[move] = currentPlayer

    const result = minimax(
      board,
      getNextPlayer(currentPlayer),
      maximizingPlayer,
      depth + 1,
      alpha,
      beta,
    )

    board[move] = null

    if (isMaximizing) {
      if (result.score > bestScore) {
        bestScore = result.score
        bestMove = move
      }
      alpha = Math.max(alpha, bestScore)
    } else {
      if (result.score < bestScore) {
        bestScore = result.score
        bestMove = move
      }
      beta = Math.min(beta, bestScore)
    }

    if (beta <= alpha) {
      break
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

    const workingBoard = [...board]
    const { move } = minimax(
      workingBoard,
      aiPlayer,
      aiPlayer,
      0,
      -Infinity,
      Infinity,
    )

    return move
  },
})

export const defaultSinglePlayerConfig = {
  players: {
    [PLAYER_X]: { type: 'human' },
    [PLAYER_O]: { type: 'ai', strategy: createMinimaxStrategy(PLAYER_O) },
  },
}
