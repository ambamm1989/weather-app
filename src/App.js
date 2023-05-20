import React from 'react';
import useGeolocation from './hooks/useGeolocation';
import useWeather from './hooks/useWeather';
import './App.css';

const App = () => {
  const { loaded, coordinates, error } = useGeolocation();

  // Only call useWeather when the coordinates are available
  const { weather, forecast } = loaded ? useWeather(coordinates.lat, coordinates.lon) : { weather: null, forecast: null };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!loaded) {
    return <div>Loading...</div>;
  } 
  const capitalizeFirstLetter = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  const formatForecastDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  console.log('Location data:', { loaded, coordinates, error });
console.log('Weather data:', { weather, forecast });


  const roundTemperature = (temp) => Math.ceil(temp);

  return (
    <div className="container background">
      <div className="weather-container">
        <h2 className="weather-title">Today's Weather</h2>
        {weather && (
          <div className="current-weather">
            <h3 className="weather-temp">{roundTemperature(weather.main.temp)}°F</h3>
            <p className="weather-description">{capitalizeFirstLetter(weather.weather[0]?.description)}</p>
          </div>
        )}
      </div>
      <div className="forecast-container">
        {forecast &&
          forecast.list
            .filter((_, i) => i % 8 === 0)
            .map((weather, i) => (
              <div key={i} className="forecast-item">
                <div className="forecast-date">{formatForecastDate(weather.dt_txt)}</div>
                <div className="forecast-temp">{roundTemperature(weather.main.temp)}°F</div>
                <div className="forecast-description">{capitalizeFirstLetter(weather.weather[0]?.description)}</div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default App;
