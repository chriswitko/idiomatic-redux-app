import React, { Component } from 'react';
import Siema from 'siema';
import Nav from './Nav';

class Home extends Component {
  constructor(props={}) {
    super();
    this.state = props;
  }
  // getInitialState() {
  //   return {data: []};
  // }

  componentDidMount() {
    self.siema = new Siema();
  }

  prev() {
    self.siema.prev()
  };
  
  next() {
    self.siema.next()
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
