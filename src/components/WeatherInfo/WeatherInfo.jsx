import React from 'react';
import PropTypes from 'prop-types';
import './WeatherInfo.css';

export default function WeatherInfo({
  date,
  temperature: { average, max, min },
}) {
  return (
    <div className="weather-info">
      <h2 className="date">{date}</h2>
      <div className="temperature-info">
        <span>average: {average}</span>
        <span>max: {max}</span>
        <span>min: {min}</span>
      </div>
    </div>
  );
}

WeatherInfo.propTypes = {
  date: PropTypes.string,
  temperature: PropTypes.shape({
    average: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
  }),
};

WeatherInfo.defaultProps = {
  date: 'today',
  temperature: {
    average: 0,
    min: 0,
    max: 0,
  },
};
