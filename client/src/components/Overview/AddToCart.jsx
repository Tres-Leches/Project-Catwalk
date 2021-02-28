import React from 'react';
// import axios from 'axios';

export default class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: null,
      sku: null,
      quantity: null,
    };
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.selectedSizeMode = this.selectedSizeMode.bind(this);
  }

  handleSizeChange(e) {
    var skuNum = e.target.options[e.target.selectedIndex].getAttribute('name');
    this.setState({
      size: e.target.value,
      sku: skuNum,
      quantity: this.props.skus[skuNum].quantity,
    }, () => console.log('state', this.state));
  }

  selectedSizeMode() {
    if (this.state.size) {
      return (
        <option></option>
      )
    }
  }

  render() {
    return (
      <div>
        <br />
        <select onChange={this.handleSizeChange}>
          <option>SELECT SIZE</option>
          {Object.keys(this.props.skus).map((sku, index) => (
            <option name={sku} key={index}>
              {this.props.skus[sku].size}
            </option>
          ))}
        </select>
        <select>
          Choose Quantity
          <option>--Quantity--</option>
          {this.selectedSizeMode()}
        </select>
        <br />
        <button type="button" id="cart ">Add to Cart</button>
      </div>
    )
  }
}

// const AddToCart = (props) => {
//   // if (!props.currentStyle !== undefined) {
//   //   return null;
//   // }
//   return (
//     <div>
//       <br />
//       <select>
//         Choose Size
//         <option>--Sizes--</option>
//         <option>
//           {/* {console.log('current style: ', props.currentStyle)} */}
//         </option>
//       </select>
//       <select>
//         Choose Quantity
//         <option>--Quantity--</option>
//       </select>
//       <br />
//       <button type="button" id="cart ">Add to Cart</button>
//     </div>
//   )
// };

// export default AddToCart;