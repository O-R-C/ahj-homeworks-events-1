import Board from './whackGoblin/Board'
import WhackGoblin from './whackGoblin/whackGoblin'

const board = new Board()
const whackGoblin = new WhackGoblin(board.getBoard())
console.log(whackGoblin)
