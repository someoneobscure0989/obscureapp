const DATA_RATING = 'data-rating'
const DATA_RATING_MAX = 'data-rating-max'
const DATA_RATING_READONLY = 'data-rating-readonly'
const DATA_RATING_CALLBACK = 'data-rating-callback'

const STAR_EMPTY = 'star-empty'
const STAR_FULL = 'star-full'

const ZERO_AREA_PADDING_PX = 10

class StarRating {
  constructor(container, score, maxScore, readonly, callback) {
    this.state = {
      container,
      score,
      maxScore,
      readonly,
      callback,
      hoverScore: undefined,
    }
    this.initStars()
  }

  _getEventScore(e) {
    const idx = Number(e.currentTarget.getAttribute('data-rating-idx'))
    let x = e.offsetX

    if (idx === 0) {
      if (x < ZERO_AREA_PADDING_PX) {
        return 0
      }
      x -= ZERO_AREA_PADDING_PX
    }

    return idx + 1
  }

  _handleMouseMove(e) {
    const score = this._getEventScore(e)
    if (score !== this.state.hoverScore) {
      this.state.hoverScore = score
      this.renderScore()
    }
  }

  _handleMouseOut(e) {
    this.state.hoverScore = undefined
    this.renderScore()
  }

  _handleClick(e) {
    const score = this._getEventScore(e)
    this.state.score = score
    const callback = window[this.state.callback]
    if (typeof callback === 'function') {
      callback(score)
    }
  }

  initStars() {
    if (!this.state.container) return

    const starTemplate = document.querySelector('#starSvg').content.firstElementChild

    for (let i = 0; i < this.state.maxScore; i++) {
      const starEl = starTemplate.cloneNode(true)
      starEl.setAttribute('data-rating-idx', i)
      if (!this.state.readonly) {
        starEl.addEventListener('mousemove', this._handleMouseMove.bind(this))
        starEl.addEventListener('mouseout', this._handleMouseOut.bind(this))
        starEl.addEventListener('click', this._handleClick.bind(this))
      }
      this.state.container.appendChild(starEl)
    }

    this.state.container.firstElementChild.style.paddingLeft = `${ZERO_AREA_PADDING_PX}px`

    this.renderScore()
  }

  _setStarClass(el, className) {
    for (let cls of [STAR_EMPTY, STAR_FULL]) {
      el.classList.remove(cls)
    }
    el.classList.add(className)
  }

  renderScore() {
    const {maxScore, container, readonly, hoverScore} = this.state

    let score
    if (!readonly && hoverScore !== undefined) {
      score = hoverScore
    } else {
      score = this.state.score
    }

    let fullStars = Math.max(Math.trunc(Math.min(score, maxScore)), 0)
    const stars = container.children

    let i
    for (i = 0; i < fullStars; i++) {
      this._setStarClass(stars[i], STAR_FULL)
    }
    for (; i < maxScore; i++) {
      this._setStarClass(stars[i], STAR_EMPTY)
    }
  }
}

document.querySelectorAll('[role="star-rating"]').forEach((container) => {
  const score = Number(container.getAttribute(DATA_RATING))
  const maxScore = Number(container.getAttribute(DATA_RATING_MAX)) || 5
  const readonly = container.getAttribute(DATA_RATING_READONLY) !== null
  const callback = container.getAttribute(DATA_RATING_CALLBACK)

  new StarRating(container, score, maxScore, readonly, callback)
})
