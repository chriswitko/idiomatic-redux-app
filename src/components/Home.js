import React, { Component } from 'react';
import Siema from 'siema';
import Nav from './Nav';

class Home extends Component {
  constructor(props={}) {
    super();

    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)

    this.state = props;
  }
  // getInitialState() {
  //   return {data: []};
  // }

  componentDidMount() {
    this.siema = new Siema();
  }

  prev() {
    this.siema.prev()
  };
  
  next() {
    this.siema.next()
  };  

  render() {
    return (
      <div>
        <Nav />
        <div className="siema">
          <div><img src="https://pawelgrzybek.com/siema/assets/siema--pink.svg" alt="Siema image" /></div>
          <div><img src="https://pawelgrzybek.com/siema/assets/siema--yellow.svg" alt="Siema image" /></div>
          <div><img src="https://pawelgrzybek.com/siema/assets/siema--pink.svg" alt="Siema image" /></div>
          <div><img src="https://pawelgrzybek.com/siema/assets/siema--yellow.svg" alt="Siema image" /></div>
        </div>
        <button onClick={this.prev}>Prev</button>
        <button onClick={this.next}>Next</button>
      </div>
    );
  }  
}

export default Home;
