import React from 'react';

const WeatherForecast = ({ forecast }) => {
  if (!forecast) {
    return null;
  }

  return (
    <div className="forecast-container">
      {forecast.list.filter((_, i) => i % 8 === 0).map((weather, i) => (
        <div key={i} className="forecast-card">
          <h3 className="date">{new Date(weather.dt_txt).toLocaleDateString()}</h3>
          <p className="temperature">{Math.round(weather.main.temp - 273.15)}°C</p>
          <p className="description">{weather.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
