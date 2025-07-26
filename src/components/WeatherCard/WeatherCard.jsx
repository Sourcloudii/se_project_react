import "./WeatherCard.css";
import { weatherType, defaultWeatherType } from "../../utils/constants";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredWeather = weatherType.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherFilter;

  if (filteredWeather.length === 0) {
    weatherFilter = defaultWeatherType[weatherData.isDay ? "day" : "night"];
  } else {
    weatherFilter = filteredWeather[0];
  }
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {" "}
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}
        &deg;{currentTemperatureUnit}
      </p>
      <img
        src={weatherFilter?.url}
        alt={weatherFilter?.condition}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
