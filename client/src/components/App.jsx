import React from 'react';
import Overview from './Overview/Overview';
import RelatedItems from './RelatedItems/RelatedItems';
import Reviews from './reviews/Reviews';
import Questions from './Questions/Main';
import postInteraction from './PostInteraction';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: Number(sessionStorage.productId) || 16063,
      ratingForCurrentProduct: 0,
      totalReviewsForCurrentProduct: 0,
      productInfo: {},
    };
    this.getCurrentProductId = this.getCurrentProductId.bind(this);
    this.getRating = this.getRating.bind(this);
    this.getTotalReviews = this.getTotalReviews.bind(this);
    this.getCurrentProductInfo = this.getCurrentProductInfo.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  // function to get current product_id from relatedItem and save it to state
  getCurrentProductId() {
    this.setState({
      currentProduct: Number(sessionStorage.productId),
    });
  }

  // function to get current product info from Overview and save it to state
  getCurrentProductInfo(info) {
    this.setState({
      productInfo: info,
    });
  }

  // function to get current displaying product's rating from reviews
  getRating(rating) {
    this.setState({
      ratingForCurrentProduct: rating,
    });
  }

  // function to get current displaying product's rating from reviews
  getTotalReviews(total) {
    this.setState({
      totalReviewsForCurrentProduct: total,
    });
  }

  toggleTheme () {
    document.body.classList.toggle('dark-theme');
  }

  render() {
    return (
      <div>
        <div className="container-header">
          <div id="page-header">
            <img
              src="./logo.jpeg"
              className="logo"
              alt="Wejudiza Logo"
            />
            WEJUDIZA HYPEBEAST COLLECTION
          </div>
          <button id="btn-theme" type="button" onClick={this.toggleTheme}>
            <img alt="sun" src="/icons/white_sun.png" className="theme-icons"/>
            <img alt="moon" src="/icons/white_moon.png" className="theme-icons"/>
          </button>
        </div>
        <div id="products">
          <Overview
            rating={this.state.ratingForCurrentProduct}
            currentProduct={this.state.currentProduct}
            totalReviews={this.state.totalReviewsForCurrentProduct}
            getCurrentProductInfo={this.getCurrentProductInfo}
          />
        </div>
        <div
          id="relatedItems"
          onClick={(e) => this.props.postToApi(e, 'Related Items & Comparison')}
        >
          <RelatedItems
            currentProduct={this.state.currentProduct}
            productInfo={this.state.productInfo}
            getCurrentProductId={this.getCurrentProductId}
          />
        </div>
        <div
          id="questions"
          onClick={(e) => this.props.postToApi(e, 'Related Items & Comparison')}
        >
          <Questions
            currentProduct={this.state.currentProduct}
          />
        </div>
        <div
          id="reviews"
          onClick={(e) => this.props.postToApi(e, 'Ratings & Reviews')}
        >
          <Reviews
            currentProduct={this.state.currentProduct}
            getRating={this.getRating}
            getTotalReviews={this.getTotalReviews}
            productInfo={this.state.productInfo}
          />
        </div>
      </div>
    );
  }
}

// export default App;
export default postInteraction(App);
