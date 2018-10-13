import React from 'react';
import { shallow } from 'enzyme';
import WeatherInfo from './WeatherInfo';

const props = {
  date: '2018-10-13',
  temperature: {
    average: 12.15,
    min: 8.14,
    max: 14.2,
  },
};

describe('WeatherInfo component', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<WeatherInfo {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
