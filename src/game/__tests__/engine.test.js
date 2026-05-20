import { describe, expect, it } from 'vitest'
import {
  PLAYER_X,
  createInitialBoard,
  getGameStatus,
  getWinner,
  makeMove,
} from '../engine'

describe('game engine', () => {
  it('creates an empty board', () => {
    expect(createInitialBoard()).toEqual(Array(9).fill(null))
  })

  it('detects a winner', () => {
    expect(getWinner([PLAYER_X, PLAYER_X, PLAYER_X, null, null, null, null, null, null])).toBe(
      PLAYER_X,
    )
  })

  it('does not overwrite an existing move', () => {
    const board = [PLAYER_X, null, null, null, null, null, null, null, null]
    expect(makeMove(board, 0, 'O')).toBe(board)
  })

  it('detects draw status', () => {
    expect(getGameStatus(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'])).toEqual({
      winner: null,
      isDraw: true,
      isFinished: true,
    })
  })
})
