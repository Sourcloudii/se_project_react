import "./WeatherCard.css";
import { weatherType, defualtWeatherType } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredWeather = weatherType.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherFilter;

  if (filteredWeather.length === 0) {
    weatherFilter = defualtWeatherType[weatherData.isDay ? "day" : "night"];
  } else {
    weatherFilter = filteredWeather[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp"> {weatherData.temp.F}&deg; F</p>
      <img
        src={weatherFilter?.url}
        alt={weatherFilter?.condition}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
