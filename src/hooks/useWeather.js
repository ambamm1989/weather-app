import { useState, useEffect } from 'react';

const useWeather = (lat, lon, apiKey) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Fetch weather data
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        const weatherData = await weatherResponse.json();

        // Fetch weather forecast
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        const forecastData = await forecastResponse.json();

        setWeather(weatherData);
        setForecast(forecastData);
      } catch (error) {
        setError(error);
      }
    };

    if (lat && lon && apiKey) {
      fetchWeather();
    }
  }, [lat, lon, apiKey]);

  return { weather, forecast, setWeather, setForecast, error };
};

export default useWeather;
