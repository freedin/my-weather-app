Connect the app to the OpenWeatherMap API for real weather data. The API key
is stored in the environment variable VITE_WEATHER_API_KEY (in the .env
file). Use import.meta.env.VITE_WEATHER_API_KEY to access it. Never
hard-code the API key.

We need to use a two-step process to fetch the data:
1. Use the Direct Geocoding API to convert the searched city name into
   coordinates (latitude and longitude).
2. Use the Current Weather Data API with those coordinates to get the
   current weather, and the appropriate 5-day forecast API to get the forecast.

When a user searches for a city:
- Display current temperature (in Celsius), weather condition, humidity,
  wind speed, and a weather icon
- Show a 5-day forecast with daily high/low temperatures

Show a friendly error message if the city is not found or if the API
request fails.
