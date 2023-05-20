# Weather App

A simple weather application that displays the current weather and 5-day forecast for a given location.

## Features

- Automatically detects the user's location using geolocation.
- Allows manual entry of a location to fetch weather data.
- Displays the current temperature, weather description, and forecast for the next 5 days.
- Temperature is displayed in Fahrenheit.

## Technologies Used

- React: JavaScript library for building user interfaces.
- OpenWeatherMap API: Provides weather data and forecast.
- Nominatim API: Converts location input to latitude and longitude coordinates.

## Getting Started

### Prerequisites

- Node.js: Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository:

  git clone `https://github.com/yourusername/weatherapp.git`

2. Navigate to the project directory:
   
    `cd weather-app`

3. Install the dependencies:

   `npm install`

## Usage

1. Obtain an OpenWeatherMap API key:

   - Visit the OpenWeatherMap website and sign up for an 
     account.

   - Create a new API key in your account dashboard.

2. Set the OpenWeatherMap API key:

   - Create a `.env` file in the root of the project.

   - Add the following line to the `.env` file, replacing 
     `YOUR_OPENWEATHERMAP_API_KEY` with your actual API key: `REACT_APP_OPENWEATHERMAP_API_KEY=YOUR_OPENWEATHERMAP_API_KEY`

3. Start the development server:

   `npm start`

4. Open the app in your browser:

   `http://localhost:3000`

## Deployment 

To deploy the app to a hosting platform, follow the platform-specific deployment instructions for React applications (e.g., Heroku, Netlify, GitHub Pages).

## License

This project is licensed under the MIT License.
