const apiKey = '66f7ad5a045c4d272430113c7ce497a1';
export const cityToSearchFor = {
  id: 3333229,
  name: 'Edinburgh',
  country: 'GB',
  coord: {
    lon: -3.19333,
    lat: 55.94973,
  },
};
export const defaultNumberOfDays = 5;
export const openWeatherUrlBy = cityName =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${apiKey}`;
