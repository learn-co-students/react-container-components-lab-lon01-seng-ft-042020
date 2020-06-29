import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

export default class LatestMovieReviewsContainer extends Component {

    state = {
      reviews: []
      }

    componentDidMount() {
        fetch('https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=5Kl9N66BSliWMdpMjUhVonBP1Z47f270')
        .then(resp => resp.json())
        .then(reviews => this.setState({reviews: reviews.results}))
        .catch(error => console.log(error.message));
    }

    renderReview = () => {
        return this.state.reviews.sort((a, b) => (a.display_title > b.display_title) ? 1 : -1).map((review, index) => <MovieReviews key={index} review={review}/>)
    }

  render() {
    return (
        <div className="latest-movie-reviews">
            <strong>Latest Movie Reviews</strong>
            {this.renderReview()}
        </div>
    )
  }
}
