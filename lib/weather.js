import data from '../data/data';

export function getWeatherData() {
  return data.map(item => {
    const { station_id, datetime } = item;
    return {
      id: `${station_id}${datetime}`,
      ...item
    }
  });
}