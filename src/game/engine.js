export const PLAYER_X = 'X'
export const PLAYER_O = 'O'

export const createInitialBoard = () => Array(9).fill(null)

export const getAvailableMoves = (board) =>
  board.reduce((moves, cell, index) => {
    if (cell === null) {
      moves.push(index)
    }
    return moves
  }, [])

export const isBoardFull = (board) => board.every((cell) => cell !== null)

export const getWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }

  return null
}

export const getNextPlayer = (player) =>
  player === PLAYER_X ? PLAYER_O : PLAYER_X

export const makeMove = (board, index, player) => {
  if (board[index] !== null) {
    return board
  }

  const nextBoard = [...board]
  nextBoard[index] = player
  return nextBoard
}

export const getGameStatus = (board) => {
  const winner = getWinner(board)

  if (winner) {
    return { winner, isDraw: false, isFinished: true }
  }

  if (isBoardFull(board)) {
    return { winner: null, isDraw: true, isFinished: true }
  }

  return { winner: null, isDraw: false, isFinished: false }
}
