import React, { useState } from 'react';
import useGeolocation from './hooks/useGeolocation';
import useWeather from './hooks/useWeather';
import './App.css';

const App = () => {
  const [locationInput, setLocationInput] = useState("");
  const [manualCoordinates, setManualCoordinates] = useState(null);
  const { loaded, coordinates, error } = useGeolocation();
  const openWeatherMapApiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY; // Replace with your actual OpenWeatherMap API key
  const { weather, forecast, setWeather, setForecast } = useWeather(
    manualCoordinates ? manualCoordinates.lat : coordinates?.lat,
    manualCoordinates ? manualCoordinates.lon : coordinates?.lon,
    openWeatherMapApiKey
  );

  const capitalizeFirstLetter = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  const formatForecastDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const roundTemperature = (temp) => Math.ceil(temp);

  const handleInputChange = (event) => {
    setLocationInput(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Fetch the coordinates for the inputted location using Nominatim API
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${locationInput}`);
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];

        // Store the manual coordinates
        setManualCoordinates({ lat: parseFloat(lat), lon: parseFloat(lon) });

        // Fetch the weather data and forecast for the coordinates using OpenWeatherMap API
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherMapApiKey}`
        );
        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${openWeatherMapApiKey}`
        );
        const forecastData = await forecastResponse.json();

        // Set the weather and forecast data in the state
        setWeather(weatherData);
        setForecast(forecastData);
      } else {
        console.error("No results found for the inputted location");
      }
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }

    // Clear the input field
    setLocationInput("");
  };

  return (
    <div className="container background">
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Enter your location" value={locationInput} onChange={handleInputChange} required />
        <button type="submit">Submit</button>
      </form>
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
