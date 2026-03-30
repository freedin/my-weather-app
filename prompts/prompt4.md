Add two more features:

1. Geolocation: When the app loads for the first time, offer to detect the
   user's location and show their local weather automatically.
   - Use the browser's Geolocation API to get the user's coordinates.
   - Use the OpenWeatherMap Reverse Geocoding API
     (https://openweathermap.org/api/geocoding-api?collection=other#reverse)
     to convert those coordinates into a city name.
   - Show a friendly message if the user declines or if geolocation is not available.

2. Recent searches: Save the last 5 searched cities to localStorage so they
   appear as quick-access buttons below the search bar. Clicking a recent
   city should load its weather.