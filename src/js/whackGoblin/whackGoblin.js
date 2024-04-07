import * as styles from './WhackGoblin.module.css'

/**
 * Игра попади по гоблину
 * @class
 */
export default class WhackGoblin {
  /**
   * @constructor
   * @param {Element} board игровое поле
   */
  constructor(board) {
    this.board = board
    this.body = document.body
    this.cells = this.board.children
    this.activeClass = styles.cellActive

    this.timer = null
    this.activeCell = null

    this.points = null
    this.miss = null

    this.init()
  }

  init() {
    this.createContainers()
    this.addListeners()
    this.showTitle()
    this.reset()
  }

  /**
   * Создает элементы для размещения игрового интерфейса
   */
  createContainers() {
    this.container = this.createElement(styles.container)
    const wrapper = this.createElement(styles.wrapper)
    this.pointsElement = this.createElement(styles.points)
    this.missesElement = this.createElement(styles.misses)

    this.addElements(this.missesElement, 5, styles.miss)

    wrapper.append(this.pointsElement, this.board, this.missesElement)
    this.container.append(wrapper)
    this.body.appendChild(this.container)
  }

  /**
   * Добавляет указанное количество ячеек переданному элементу\родителю
   * @param {Element} elem родитель ячеек
   * @param {number} amount количество добавляемых ячеек
   * @param {string} className имя класса
   */
  addElements(elem, amount, className) {
    let cnt = amount
    while (cnt) {
      elem.append(this.createElement(className))
      cnt--
    }
  }

  /**
   * Создает элемент с указанным классом и типом
   * @param {string} className имя класса
   * @param {string} type тип элемента
   * @returns созданный элемент
   */
  createElement(className, type = 'div') {
    const elem = document.createElement(type)
    elem.classList.add(className)

    return elem
  }

  /**
   * Сбрасывает игру к начальным значениям
   */
  reset() {
    this.points = 0
    this.miss = 0
    this.move()
    this.resetProgress()
  }

  addListeners() {
    this.board.addEventListener('click', (evt) => {
      const cell = evt.target
      if (cell.classList.contains(this.activeClass)) {
        this.move()
        this.points += 1
        this.showPoint()
      } else {
        this.move()
        this.miss += 1
        this.showProgress(this.missesElement, styles.dead, this.miss)
      }
      this.isWin()
    })
  }

  /**
   * Показывает количество набранных очков
   */
  showPoint() {
    this.pointsElement.textContent = this.points
  }

  /**
   * Проверяем выигрыш\проигрыш
   */
  isWin() {
    let title = null
    if (this.points === 1000) {
      title = 'Победа !!!'
    }
    if (this.miss === 5) {
      title = 'Поражение :('
    }
    if (title) {
      const message = this.createElement(styles.message)
      const result = this.createElement(styles.welcome)
      result.textContent = title

      message.append(result)
      this.container.prepend(message)

      setTimeout(() => {
        message.remove()
        this.reset()
      }, 2000)
    }
  }

  /**
   * Показывает прогресс, уменьшая изображения ячеек
   * @param {Element} elem родительский элемент ячеек очков
   * @param {string} className имя класса
   * @param {Element} points тип очков
   */
  showProgress(elem, className, points) {
    const cells = [...elem.children].reverse()
    let cnt = points
    cells.forEach((cell) => {
      if (cnt) {
        cell.classList.add(className)
        cnt--
      }
    })
  }

  /**
   * Сбрасывает значение класса для ячеек очков\промахов
   */
  resetProgress() {
    this.showPoint()
    ;[...this.missesElement.children].forEach((item) =>
      item.classList.remove(styles.dead)
    )
  }

  /**
   * Логика движения гоблина
   */
  move() {
    this.stop()

    let index
    do {
      index = Math.floor(Math.random() * this.cells.length)
    } while (this.activeCell !== null && index === this.activeCell)

    if (this.activeCell !== null) {
      this.cells[this.activeCell].classList.remove(this.activeClass)
    }

    this.activeCell = index
    this.cells[index].classList.add(this.activeClass)

    this.timer = setTimeout(() => {
      this.miss++
      this.isWin()
      this.showProgress(this.missesElement, styles.dead, this.miss)
      this.move()
    }, 1000)
  }

  /**
   * Останавливает перемещение гоблина
   */
  stop() {
    if (this.timer) clearTimeout(this.timer)
  }

  /**
   * Показывает заголовки на странице
   */
  showTitle() {
    document.querySelector('title').textContent = 'Whack Goblin Game'
    document.querySelector('.welcome').textContent = 'Whack Goblin Game'
  }
}
