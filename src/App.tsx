import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function App() {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      setSearchedCity(city.trim());
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

        {searchedCity ? (
          <Card className="rounded-2xl border-blue-100 shadow-md">
            <CardHeader>
              <CardTitle className="text-blue-800">{searchedCity}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-600">
                Weather data for {searchedCity} will appear here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center text-blue-400 py-16">
            <p className="text-lg">
              Search for a city to see weather information.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
