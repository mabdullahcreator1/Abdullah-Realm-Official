import { useState } from 'react';

const WeatherDashboard = () => {
  const [city, setCity] = useState('Islamabad');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'a62f196b5dcf82dffb632da7b1877bbe';

  const fetchWeather = async (searchCity) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data);
      setCity(searchCity);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeather(city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-2 text-center">🌤️ Weather Dashboard</h1>
        <p className="text-gray-300 text-center mb-8">Abdullah Realm Official</p>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="flex-1 px-6 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Search
            </button>
          </div>
        </form>

        {loading && <p className="text-center text-blue-300 text-lg">Loading...</p>}

        {error && <p className="text-center text-red-400 text-lg">❌ {error}</p>}

        {weather && (
          <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-white">
                <h2 className="text-4xl font-bold mb-2">{weather.name}, {weather.sys.country}</h2>
                <p className="text-6xl font-bold mb-4">{Math.round(weather.main.temp)}°C</p>
                <p className="text-2xl capitalize text-blue-200 mb-6">{weather.weather[0].description}</p>
                <div className="space-y-3 text-lg">
                  <p>💧 Humidity: <span className="font-semibold">{weather.main.humidity}%</span></p>
                  <p>💨 Wind Speed: <span className="font-semibold">{weather.wind.speed} m/s</span></p>
                  <p>🌡️ Feels Like: <span className="font-semibold">{Math.round(weather.main.feels_like)}°C</span></p>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 text-white">
                <h3 className="text-2xl font-bold mb-4">📊 Details</h3>
                <div className="space-y-3 text-lg">
                  <p>🔺 Max Temp: <span className="font-semibold">{Math.round(weather.main.temp_max)}°C</span></p>
                  <p>🔻 Min Temp: <span className="font-semibold">{Math.round(weather.main.temp_min)}°C</span></p>
                  <p>⚡ Pressure: <span className="font-semibold">{weather.main.pressure} hPa</span></p>
                  <p>👁️ Visibility: <span className="font-semibold">{(weather.visibility / 1000).toFixed(1)} km</span></p>
                  <p>☁️ Cloudiness: <span className="font-semibold">{weather.clouds.all}%</span></p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!weather && !loading && !error && (
          <div className="text-center text-gray-300 mt-12">
            <p className="text-xl">🔍 Search for a city to see the weather</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
