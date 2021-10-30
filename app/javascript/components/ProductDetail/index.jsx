import React from 'react'
import {PropTypes} from 'prop-types'

import styles from './ProductDetail.module.scss'

function ProductDetail({slug}) {
  const title = undefined

  return (
    <>
      <h1>{title || 'The Sample Product'}</h1>

      <div className={styles.topContent}>
        <div className={styles.averageRating}>
          <span>–.–</span>
          <div className={styles.stars}></div>
        </div>
        <button id="btn-add-review">Add review</button>
      </div>

      <hr />

      <h2>Reviews</h2>

      <div className={styles.reviews}>
        {/* for each review */}
        <div className={styles.reviewRow}>
          <div className={styles.stars}></div>
          <span>
            {/* <b><%= review.score %></b><% if review.text -%>, <%= review.text %><% end %> */}
            <b>5.0</b>, Amazing! This must be one of my favourite products. I am using it all the time. Best buy in a long time.
          </span>
        </div>
        {/* endfor */}
        {/* if !reviews */}
        <span>None yet.</span>
        {/* endif */}
      </div>
    </>
  )
}

ProductDetail.propTypes = {
  slug: PropTypes.string.isRequired,
}

export default ProductDetail
