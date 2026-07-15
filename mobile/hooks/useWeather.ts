import { useState, useEffect } from 'react';
import { getWeather, WeatherData } from '../services/weather';

export function useWeather(lat?: number, lon?: number) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        if (lat && lon) {
          const data = await getWeather(lat, lon);
          setWeather(data);
        }
      } catch (error) {
        console.error('Weather fetch error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, [lat, lon]);

  return { weather, loading };
}
