import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchWeather, type WeatherData } from "@/lib/weather";

function App() {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (!trimmed) return;

    setSearchedCity(trimmed);
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const data = await fetchWeather(trimmed);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center gap-4">
          <h1 className="text-2xl font-bold text-blue-600 shrink-0">
            weather-weather
          </h1>
          <form
            onSubmit={handleSearch}
            className="flex w-full sm:w-auto sm:flex-1 gap-2"
            role="search"
            aria-label="Search for a city"
          >
            <label htmlFor="city-search" className="sr-only">
              City name
            </label>
            <Input
              id="city-search"
              type="search"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1 rounded-full"
              aria-describedby="search-hint"
            />
            <Button
              type="submit"
              className="rounded-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              Search
            </Button>
          </form>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <p id="search-hint" className="sr-only">
          Type a city name and press Search to see weather information.
        </p>

        {!searchedCity && (
          <div className="text-center text-blue-400 py-16">
            <p className="text-lg">
              Search for a city to see weather information.
            </p>
          </div>
        )}

        {loading && (
          <div role="status" aria-live="polite" className="text-center py-16">
            <p className="text-blue-500 text-lg animate-pulse">
              Loading weather data...
            </p>
          </div>
        )}

        {error && (
          <Card className="rounded-2xl border-red-200 shadow-md" role="alert">
            <CardContent className="pt-6">
              <p className="text-red-600 text-center">{error}</p>
            </CardContent>
          </Card>
        )}

        {weather && (
          <div className="space-y-6">
            <Card className="rounded-2xl border-blue-100 shadow-md">
              <CardHeader>
                <CardTitle className="text-blue-800">
                  {weather.cityName}, {weather.country}
                </CardTitle>
                <CardDescription className="capitalize">
                  {weather.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                      alt={weather.description}
                      width={64}
                      height={64}
                    />
                    <span
                      className="text-4xl font-bold text-blue-700"
                      aria-label={`${weather.temp} degrees Celsius`}
                    >
                      {weather.temp}°C
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 text-blue-600">
                    <span>Humidity: {weather.humidity}%</span>
                    <span>Wind: {weather.windSpeed} m/s</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {weather.forecast.length > 0 && (
              <section aria-labelledby="forecast-heading">
                <h2
                  id="forecast-heading"
                  className="text-lg font-semibold text-blue-800 mb-3"
                >
                  5-Day Forecast
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {weather.forecast.map((day) => (
                    <Card
                      key={day.date}
                      size="sm"
                      className="rounded-xl border-blue-100 text-center"
                    >
                      <CardHeader>
                        <CardTitle>
                          {new Date(day.date + "T12:00:00").toLocaleDateString(
                            "en-US",
                            { weekday: "short" }
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center gap-1">
                        <img
                          src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                          alt={day.description}
                          width={48}
                          height={48}
                        />
                        <p className="text-sm text-blue-700">
                          <span aria-label={`High ${day.tempMax} degrees`}>
                            H: {day.tempMax}°
                          </span>
                          {"  "}
                          <span aria-label={`Low ${day.tempMin} degrees`}>
                            L: {day.tempMin}°
                          </span>
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
