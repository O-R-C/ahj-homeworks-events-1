import Board from './whackGoblin/Board'
import WhackGoblin from './whackGoblin/whackGoblin'

const whackGoblin = new WhackGoblin(new Board().getBoard())

console.log('app start', whackGoblin)
