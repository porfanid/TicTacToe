import { describe, expect, it } from 'vitest'
import { PLAYER_O } from '../engine'
import { createMinimaxStrategy } from '../strategies/minimaxStrategy'

describe('minimax strategy', () => {
  it('takes a winning move when available', () => {
    const strategy = createMinimaxStrategy(PLAYER_O)
    const board = ['X', 'X', null, 'O', 'O', null, null, null, null]

    expect(strategy.getMove(board, PLAYER_O)).toBe(5)
  })

  it('blocks an immediate opponent win', () => {
    const strategy = createMinimaxStrategy(PLAYER_O)
    const board = ['X', 'X', null, null, 'O', null, null, null, null]

    expect(strategy.getMove(board, PLAYER_O)).toBe(2)
  })
})
