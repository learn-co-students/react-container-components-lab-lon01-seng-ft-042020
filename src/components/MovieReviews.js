import React from 'react'

const MovieReviews = ({review}) =>
<div className="review">
    <h5>{review.display_title}</h5>
    <ul>
    <li>{review.summary_short}</li>
    </ul>
</div>

export default MovieReviews
