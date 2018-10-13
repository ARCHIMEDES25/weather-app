import { openWeatherUrlBy, defaultNumberOfDays } from './settings';

const fetchInit = () => ({
  method: 'GET',
  headers: new Headers().append('Content-Type', 'application/json'),
});

export const dateFormatter = date => date.split(' ')[0];
export const take = (items, numberOfItems) => items.slice(0, numberOfItems);

/* eslint-disable no-param-reassign */
export const groupBy = (items, property, propertyFormatter = i => i) =>
  items.reduce((ac, cv) => {
    const key = propertyFormatter(cv[property]);
    (ac[key] = ac[key] || []).push(cv);
    return ac;
  }, {});
/* eslint-enable no-param-reassign */

export const averageTemperature = items =>
  +Number.parseFloat(
    items.map(({ main }) => main.temp).reduce((ac, cv) => ac + cv, 0) /
      items.length,
  ).toFixed(2);
export const lowestMinTemperature = items =>
  Math.min(...items.map(({ main }) => main.temp_min));
export const highestmaxTemperature = items =>
  Math.max(...items.map(({ main }) => main.temp_max));

const groupedForecast = items => groupBy(items, 'dt_txt', dateFormatter);

export const transform = (forecast = []) =>
  take(Object.entries(groupedForecast(forecast)), defaultNumberOfDays).map(
    ([date, entries]) => ({
      date,
      temperature: {
        average: averageTemperature(entries),
        min: lowestMinTemperature(entries),
        max: highestmaxTemperature(entries),
      },
    }),
  );

export const getForecast = async cityName => {
  try {
    const response = await fetch(openWeatherUrlBy(cityName), fetchInit());
    const data = await response.json();
    return transform(data.list);
  } catch (error) {
    /* eslint-disable no-console */
    return console.warn('Failed to retrieve forecast information', error);
    /* eslint-enable no-console */
  }
};
