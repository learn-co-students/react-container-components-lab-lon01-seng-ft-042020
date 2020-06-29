import React from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

export default class SearchableMovieReviewsContainer extends React.Component {

  state = {
    reviews: [],
    searchTerm: ""
    }

    handleChange = (event) => {
      this.setState({
        searchTerm: event.target.value
      })
    }

    onSubmit = (event) => {
      event.preventDefault()
      fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=5Kl9N66BSliWMdpMjUhVonBP1Z47f270&query=${this.state.searchTerm}`)
      .then(resp => resp.json())
      .then(reviews => this.setState({reviews: reviews.results}))
      .catch(error => console.log(error.message));
      this.setState({
        searchTerm: ""
      })

    }

    renderSearchedMovies = () => {
      return this.state.reviews.sort((a, b) => (a.display_title > b.display_title) ? 1 : -1).map((review, index) => <MovieReviews key={index} review={review}/>)
    }
    
  render() {
    return (
      <div>
        <form className="searchable-movie-reviews" onSubmit={this.onSubmit}>
          <label><strong>Search Movies</strong></label>
          <input type="type" name="searchTerm" value={this.state.searchTerm} onChange={this.handleChange}></input>
        </form>
        {this.state.reviews.length > 0 ? <p>{this.state.reviews.length} results</p> : null }
        {this.renderSearchedMovies()}
      </div>
    )
  }
}
