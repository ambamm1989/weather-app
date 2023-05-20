import { useState, useEffect } from 'react';

const useWeather = (lat, lon) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  // Add these conversion functions
  function convertTempToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(2);
  }

  function convertTempToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // fetch weather data for today
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
        );
        const weatherData = await response.json();
        weatherData.main.temp = convertTempToFahrenheit(weatherData.main.temp); // using Fahrenheit here

        // fetch weather forecast for the next 5 days
        const responseForecast = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
        );
        const forecastData = await responseForecast.json();
        forecastData.list.forEach(item => {
          item.main.temp = convertTempToFahrenheit(item.main.temp); // using Fahrenheit here
        });

        setWeather(weatherData);
        setForecast(forecastData);
      } catch (error) {
        setError(error);
      }
    };

    if (lat && lon) {
      fetchWeather();
    }
  }, [lat, lon]);

  return { weather, forecast, error };
};

export default useWeather;
