import Home from '../src/components/Home';
// import React from 'react';

describe('Home', () => {
  it('should render a Home component', () => {
      const wrapper = shallow(
          <Home />
      );
      expect(wrapper).toMatchSnapshot();
  });

  it('should render a small label', () => {
      const wrapper = shallow(
          <Label small>Hello Jest!</Label>
      );
      expect(wrapper).toMatchSnapshot();
  });

  it('should render a grayish label', () => {
      const wrapper = shallow(
          <Label light>Hello Jest!</Label>
      );
      expect(wrapper).toMatchSnapshot();
  });
})

