import React from 'react';
import Overview from './Overview/Overview';
import RelatedItems from './RelatedItems/RelatedItems';
import Reviews from './reviews/Reviews';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: 16056,
      ratingForCurrentProduct: 0,
    };
    this.getCurrentProductId = this.getCurrentProductId.bind(this);
    this.getRating = this.getRating.bind(this);
  }

  getCurrentProductId(product_id) {
    this.setState({
      currentProduct: product_id,
    });
  }

  getRating(rating) {
    this.setState({
      ratingForCurrentProduct: rating,
    });
  }

  getRating(rating) {
    this.setState({
      ratingForCurrentProduct: rating,
    }, ()=> {console.log(this.state.ratingForCurrentProduct)});
  }

  render() {
    return (
      <div>
        <div id="products">
          <Overview
            rating={this.state.ratingForCurrentProduct}
            currentProduct={this.state.currentProduct}
          />
        </div>
        <div id="relatedItems">
          <RelatedItems
            currentProduct={this.state.currentProduct} getCurrentProductId={this.getCurrentProductId}
          />
        </div>
        <div id="reviews">
          <Reviews
            currentProduct={this.state.currentProduct}
            getRating={this.getRating}
          />
        </div>
      </div>
    );
  }
}
export default App;
