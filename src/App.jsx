import React, { Component } from 'react';
import './App.css';

import { cityToSearchFor } from './settings';
import { getForecast } from './api';
import { WeatherInfo } from './components';

class App extends Component {
  state = {
    forecast: [],
    cityName: cityToSearchFor.name,
  };

  componentDidMount = () => this.searchForecast(this.state.cityName);

  searchForecast = city =>
    getForecast(city).then(forecast => this.setState(() => ({ forecast })));

  render() {
    const { forecast, cityName } = this.state;
    return (
      <div className="app">
        <header>
          <h1 className="title">{`${cityName} forecast`}</h1>
        </header>
        <div className="forecast">
          {forecast.map(({ date, temperature }) => (
            <WeatherInfo key={date} {...{ date, temperature }} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
