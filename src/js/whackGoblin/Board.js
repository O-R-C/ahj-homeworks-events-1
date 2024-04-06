import styles from './Board.module.css'
export default class Board {
  constructor(side = 4) {
    this.side = side

    this.init()
  }

  init() {
    this.createBoard()
    this.addCells()
  }

  createBoard() {
    this.board = this.createElement(styles.board)
  }

  addCells() {
    let cnt = Math.pow(this.side, 2)

    while (cnt) {
      const cell = this.createElement(styles.cell)
      this.board.append(cell)

      cnt--
    }
  }

  createElement(className, type = 'div') {
    const elem = document.createElement(type)
    elem.classList.add(className)

    return elem
  }

  getBoard() {
    return this.board
  }
}
