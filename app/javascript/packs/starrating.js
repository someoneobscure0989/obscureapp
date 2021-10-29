const DATA_RATING = 'data-rating'
const DATA_RATING_MAX = 'data-rating-max'

const STAR_EMPTY = 'star-empty'
const STAR_FULL = 'star-full'


class StarRating {
  constructor(container, score, maxScore) {
    this.state = {
      container,
      score,
      maxScore,
    }
    this.initStars()
  }

  initStars() {
    if (!this.state.container) return

    const starTemplate = document.querySelector('#starSvg').content.firstElementChild

    for (let i = 0; i < this.state.maxScore; i++) {
      const starEl = starTemplate.cloneNode(true)
      starEl.setAttribute('data-rating-idx', i)
      this.state.container.appendChild(starEl)
    }

    this.renderScore()
  }

  _setStarClass(el, className) {
    for (let cls of [STAR_EMPTY, STAR_FULL]) {
      el.classList.remove(cls)
    }
    el.classList.add(className)
  }

  renderScore() {
    const { score, maxScore, container } = this.state

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

  new StarRating(container, score, maxScore)
})
