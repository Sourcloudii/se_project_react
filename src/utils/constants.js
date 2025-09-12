export const weatherType = [
  {
    day: true,
    condition: "clear",
    url: new URL("../images/day/clear.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../images/day/cloudy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../images/day/fog.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../images/day/rain.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../images/day/snow.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "storm",
    url: new URL("../images/day/storm.svg", import.meta.url).href,
  },

  {
    day: false,
    condition: "clear",
    url: new URL("../images/night/clear.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../images/night/cloudy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../images/night/fog.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../images/night/rain.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../images/night/snow.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "storm",
    url: new URL("../images/night/storm.svg", import.meta.url).href,
  },
];

export const defaultWeatherType = {
  day: {
    url: new URL("../images/day/default.svg", import.meta.url).href,
  },
  night: {
    url: new URL("../images/night/default.svg", import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 42.289551,
  longitude: -89.647018,
};

export const apiKey = "f524a3e83c52ac04be883eda135c7031";
