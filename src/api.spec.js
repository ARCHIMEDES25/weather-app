import {
  getForecast,
  dateFormatter,
  take,
  groupBy,
  averageTemperature,
  lowestMinTemperature,
  highestmaxTemperature,
  transform,
} from './api';
import { mondayList, forecast } from './mockData';

global.fetch = jest.fn(() => Promise.resolve({ json: () => forecast }));

global.Headers = jest.fn(() => ({
  append: () => {},
}));

const expectedForecastResult = [
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

describe('api', () => {
  it('dateFormatter should return date in correct format', () => {
    const formattedDate = dateFormatter(mondayList[0].dt_txt);
    expect(formattedDate).toEqual('2018-10-15');
  });

  it('take should return correct number of items from collection', () => {
    const items = [55, 78, 999, 12, 3];
    const itemsTaken = take(items, 3);
    expect(itemsTaken).toEqual([55, 78, 999]);
  });

  it('groupBy should return collection grouped by specified property', () => {
    const people = [
      { name: 'Alice', age: 21 },
      { name: 'Max', age: 20 },
      { name: 'Jane', age: 20 },
      { name: 'Ann', age: 21 },
    ];
    const expectedGroupedByAge = {
      20: [{ name: 'Max', age: 20 }, { name: 'Jane', age: 20 }],
      21: [{ name: 'Alice', age: 21 }, { name: 'Ann', age: 21 }],
    };
    const groupedByAge = groupBy(people, 'age');
    expect(groupedByAge).toEqual(expectedGroupedByAge);
  });

  it('averageTemperature should return correct average value', () => {
    const averageTemp = averageTemperature(mondayList);
    expect(averageTemp).toEqual(7.95);
  });

  it('lowestMinTemperature should return lowest temperature in collection', () => {
    const lowestTemp = lowestMinTemperature(mondayList);
    expect(lowestTemp).toEqual(6.12);
  });

  it('highestmaxTemperature should return lowest temperature in collection', () => {
    const highest = highestmaxTemperature(mondayList);
    expect(highest).toEqual(12.09);
  });

  it('transform should return forecast grouped by date with correct average, lowest and highest temperature values', () => {
    const transformData = transform(forecast.list);
    expect(transformData).toEqual(expectedForecastResult);
  });

  it('getForecast should return fetched data in correct format', async () => {
    const result = await getForecast('Edinburgh');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('Edinburgh'),
      expect.anything(),
    );

    expect(result).toEqual(expectedForecastResult);
  });
});
