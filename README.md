# weather-weather

A clean, responsive weather app built with React and TypeScript. Search for any city to see current conditions and a 5-day forecast powered by the OpenWeatherMap API.

## Features

- **Current weather** — temperature, condition, humidity, wind speed, and weather icon
- **5-day forecast** — daily high/low temperatures with condition icons
- **Geolocation** — optionally detect your location on first visit to show local weather
- **Recent searches** — last 5 cities saved for quick access
- **Dark mode** — toggle between light and dark themes, with system preference detection
- **Responsive design** — works on mobile, tablet, and desktop
- **Accessible** — WCAG-compliant with proper ARIA labels, roles, and keyboard navigation

## Tech Stack

- [React](https://react.dev) 18 + TypeScript
- [Vite](https://vite.dev) 5
- [Tailwind CSS](https://tailwindcss.com) v4
- [shadcn/ui](https://ui.shadcn.com) components
- [OpenWeatherMap API](https://openweathermap.org/api)

## Getting Started

### Prerequisites

- Node.js 20 or later
- An [OpenWeatherMap API key](https://openweathermap.org/appid) (free tier works)

### Setup

```bash
git clone https://github.com/freedin/my-weather-app.git
cd my-weather-app
npm install
```

Create a `.env` file in the project root:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

### Development

```bash
npm run dev
```

Opens the app at [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
```

Output is in the `dist/` folder.

## Deployment

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages on push to `main`.

To set it up:

1. Add `VITE_WEATHER_API_KEY` as a repository secret in **Settings > Secrets and variables > Actions**
2. Enable GitHub Pages with **GitHub Actions** as the source in **Settings > Pages**

## License

MIT
