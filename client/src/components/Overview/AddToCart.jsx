import React from 'react';
// import axios from 'axios';
import Select from 'react-select';
import ReactModal from 'react-modal';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'Select Size',
      quantity: 0,
      skus: [],
      selectedQ: 0,
      showError: false,
      showModal: false,
    };
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.selectedSizeMode = this.selectedSizeMode.bind(this);
    this.onAddToCartClick = this.onAddToCartClick.bind(this);
    // this.changedSkuMode = this.changedSkuMode.bind(this);
  }

  handleSizeChange(e) {
    if (!e) {
      this.setState({
        size: 'Select Size',
        quantity: 0,
      });
    } else {
      this.setState({
        size: e.value,
        quantity: e.key,
        showError: false,
      });
    }
  }

  handleQuantityChange(e) {
    this.setState({
      selectedQ: e.value,
    });
  }

  handleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  onAddToCartClick() {
    console.log('clicked!')
    if (this.state.size === 'Select Size') {
      this.setState({
        showError: true,
      });
    } else {
      this.setState({
        showModal: true,
      });
    }
  }

  selectedSizeMode() {
    const numbers = [...Array(16).keys()];
    numbers.shift();
    if (this.state.size !== 'Select Size') {
      if (this.state.quantity < 15) {
        numbers = [...Array(this.state.quantity + 1).keys()];
        numbers.shift();
      }
      const quantities = numbers.map((quantity) => (
        { value: quantity, label: quantity }
      ));
      return (
        <Select
          options={quantities}
          // defaultValue={quantities[0]}
          onChange={this.handleQuantityChange}
        />
      );
    }
    return (
      <Select isDisabled placeholder="-" />
    );
  }

  // changedSkuMode(prevProps) {
  //   if (this.props.skus !== prevProps) {
  //     this.setState({
  //       size: 'Select Size',
  //     })
  //   }
  // }

  // cartMode() {
  //   if (this.state.size === 'Select Size') {
  //     return (

  //     )
  //   }
  // }

  render() {
    const sizes = Object.keys(this.props.skus).map((sku, index) => (
      { value: this.props.skus[sku].size, label: this.props.skus[sku].size, key: this.props.skus[sku].quantity }
    ));
    return (
      <div>
        <br />
        {this.state.showError && <span style={{ color: 'red' }}>Please select size</span>}
        <Select
          options={sizes}
          placeholder="Select Size"
          onChange={this.handleSizeChange}
          style={{ width: '50%' }}
        />
        {this.selectedSizeMode()}
        <br />
        <button type="button" id="cart" onClick={this.onAddToCartClick}>Add to Cart</button>
        {this.state.showModal
        && (
        <ReactModal isOpen contentLabel="test" style={modalStyle} ariaHideApp={false} onRequestClose={this.handleModal}>
          <p>
            <b><u>Added to cart!</u></b>
            <br />
            <br />
            Style:
            {' '}
            {this.props.currentStyle.name}
            <br />
            Size:
            {' '}
            {this.state.size}
            <br />
            Quantity:
            {' '}
            {this.state.selectedQ}
          </p>
          <button onClick={this.handleModal}>Close</button>
        </ReactModal>
        )}
      </div>
    );
    // return (
    //   <div>
    //     <br />
    //     <Select onChange={this.handleSizeChange}>
    //       <option value={this.value}>Select Size</option>
    //       {Object.keys(this.props.skus).map((sku, index) => (
    //         {value:{sku.size}, label: {sku,size}}
    //         // <option name={sku} key={index}>
    //         //   {this.props.skus[sku].size}
    //         // </option>
    //       ))}
    //     </Select>
    //     {this.selectedSizeMode()}
    //     <br />
    //     <button type="button" id="cart">Add to Cart</button>
    //   </div>
    // )
  }
}
