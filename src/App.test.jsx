import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

import { forecast } from './mockData';

global.fetch = jest.fn(() => Promise.resolve({ json: () => forecast }));
global.Headers = jest.fn(() => ({ append: () => {} }));

const forecastData = [
  {
    date: '2018-10-15',
    temperature: {
      average: 7.95,
      min: 6.12,
      max: 12.09,
    },
  },
  {
    date: '2018-10-16',
    temperature: {
      average: 7.95,
      min: 5.01,
      max: 25.14,
    },
  },
];

const props = {
  state: {
    forecast: [],
    cityName: 'Edinburgh',
  },
};

describe('App component', () => {
  it('should load forecast data into state with correct shape', async done => {
    const wrapper = shallow(<App />);
    expect(wrapper.instance().state).toEqual(props.state);
    setImmediate(() => {
      expect(wrapper.instance().state.forecast).toEqual(forecastData);
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});
