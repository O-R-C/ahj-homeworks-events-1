import styles from './WhackGoblin.module.css'

export default class WhackGoblin {
  constructor(board) {
    this.board = board
    this.body = document.body
    this.cells = this.board.children
    this.activeClass = styles.cellActive

    this.activeCell = null
    this.timer = null

    this.init()
  }

  init() {
    this.body.appendChild(this.board)
    this.showTitle()
    this.move()
  }

  move() {
    if (this.timer) clearTimeout(this.timer)

    let index
    do {
      index = Math.floor(Math.random() * this.cells.length)
    } while (this.activeCell !== null && index === this.activeCell)

    if (this.activeCell !== null) {
      this.cells[this.activeCell].classList.remove(this.activeClass)
    }

    this.activeCell = index
    this.cells[index].classList.add(this.activeClass)

    this.timer = setTimeout(this.move.bind(this), 1000)
  }

  showTitle() {
    document.querySelector('title').textContent = 'Whack Goblin Game'
    document.querySelector('.welcome').textContent = 'Whack Goblin Game'
  }
}
