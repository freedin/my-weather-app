const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

interface GeoResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

interface CurrentWeatherResponse {
  name: string;
  main: { temp: number; humidity: number };
  weather: Array<{ description: string; icon: string }>;
  wind: { speed: number };
}

interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: { temp_min: number; temp_max: number };
  weather: Array<{ description: string; icon: string }>;
}

interface ForecastResponse {
  list: ForecastItem[];
}

export interface DayForecast {
  date: string;
  tempMin: number;
  tempMax: number;
  icon: string;
  description: string;
}

export interface WeatherData {
  cityName: string;
  country: string;
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  forecast: DayForecast[];
}

function groupForecastByDay(list: ForecastItem[]): DayForecast[] {
  const today = new Date().toISOString().slice(0, 10);
  const days = new Map<string, ForecastItem[]>();

  for (const item of list) {
    const date = item.dt_txt.slice(0, 10);
    if (date === today) continue;

    const group = days.get(date);
    if (group) {
      group.push(item);
    } else {
      days.set(date, [item]);
    }
  }

  const result: DayForecast[] = [];
  for (const [date, items] of days) {
    const tempMin = Math.round(Math.min(...items.map((i) => i.main.temp_min)));
    const tempMax = Math.round(Math.max(...items.map((i) => i.main.temp_max)));

    // Pick the icon closest to midday
    const midday = items.reduce((closest, item) => {
      const closestHour = Math.abs(
        parseInt(closest.dt_txt.slice(11, 13)) - 12
      );
      const itemHour = Math.abs(parseInt(item.dt_txt.slice(11, 13)) - 12);
      return itemHour < closestHour ? item : closest;
    });

    result.push({
      date,
      tempMin,
      tempMax,
      icon: midday.weather[0].icon,
      description: midday.weather[0].description,
    });
  }

  return result.sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5);
}

async function fetchWeatherByCoords(
  lat: number,
  lon: number,
  cityName: string,
  country: string
): Promise<WeatherData> {
  const [currentRes, forecastRes] = await Promise.all([
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    ),
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    ),
  ]);

  if (!currentRes.ok || !forecastRes.ok) {
    throw new Error("Weather data unavailable");
  }

  const current: CurrentWeatherResponse = await currentRes.json();
  const forecastData: ForecastResponse = await forecastRes.json();

  return {
    cityName,
    country,
    temp: Math.round(current.main.temp),
    description: current.weather[0].description,
    icon: current.weather[0].icon,
    humidity: current.main.humidity,
    windSpeed: current.wind.speed,
    forecast: groupForecastByDay(forecastData.list),
  };
}

export async function fetchWeather(city: string): Promise<WeatherData> {
  const geoRes = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
  );
  if (!geoRes.ok) throw new Error("Weather data unavailable");

  const geoData: GeoResult[] = await geoRes.json();
  if (geoData.length === 0) throw new Error("City not found");

  const { lat, lon, name, country } = geoData[0];
  return fetchWeatherByCoords(lat, lon, name, country);
}

export async function fetchWeatherByLocation(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const geoRes = await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
  );
  if (!geoRes.ok) throw new Error("Weather data unavailable");

  const geoData: GeoResult[] = await geoRes.json();
  if (geoData.length === 0) throw new Error("Could not determine your location");

  const { name, country } = geoData[0];
  return fetchWeatherByCoords(lat, lon, name, country);
}
