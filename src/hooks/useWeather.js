import { useState, useEffect } from 'react';

const useWeather = (lat, lon, apiKey) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  // Helper function to convert temperature from Kelvin to Fahrenheit
  const convertKelvinToFahrenheit = (kelvin) => {
    return Math.round((kelvin - 273.15) * 9/5 + 32);
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Fetch weather data
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        const weatherData = await weatherResponse.json();

        // Convert temperature to Fahrenheit
        weatherData.main.temp = convertKelvinToFahrenheit(weatherData.main.temp);

        // Fetch weather forecast
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        const forecastData = await forecastResponse.json();

        // Convert forecast temperatures to Fahrenheit
        forecastData.list.forEach((item) => {
          item.main.temp = convertKelvinToFahrenheit(item.main.temp);
        });

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
