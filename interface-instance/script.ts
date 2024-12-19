// OpenWeatherMap API Key
const appId = "7a3e82da7b2d667bab335dae7c2622b4";
let lon: number = 0;
let lat: number = 0;

// Interfaces for API responses
interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
  name: string;
  sys: {
    country: string;
  };
}

interface AirPollutionData {
  list: {
    main: {
      aqi: number;
    };
  }[];
}

interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
    };
    weather: {
      description: string;
    }[];
  }[];
}

interface Coordinates {
  lon: number;
  lat: number;
}

// Fetch current weather data
function fetchApiCurrentWeather(lon: number, lat: number): WeatherData | undefined {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?appid=${appId}&lat=${lat}&lon=${lon}&units=metric`, false);
    xhr.send();
    if (xhr.status === 200) {
      return JSON.parse(xhr.responseText);
    }
  } catch (err) {
    console.error("Error fetching current weather:", err);
  }
}

// Fetch 5-day weather forecast
function fetchApiFiveDaysWeatherForecast(lon: number, lat: number): ForecastData | undefined {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.openweathermap.org/data/2.5/forecast?appid=${appId}&lat=${lat}&lon=${lon}&units=metric`, false);
    xhr.send();
    if (xhr.status === 200) {
      return JSON.parse(xhr.responseText);
    }
  } catch (err) {
    console.error("Error fetching weather forecast:", err);
  }
}

// Fetch air pollution data
function fetchApiCurrentAirPollution(lon: number, lat: number): AirPollutionData | undefined {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.openweathermap.org/data/2.5/air_pollution?appid=${appId}&lat=${lat}&lon=${lon}`, false);
    xhr.send();
    if (xhr.status === 200) {
      return JSON.parse(xhr.responseText);
    }
  } catch (err) {
    console.error("Error fetching air pollution data:", err);
  }
}

// Fetch geocoding data
function fetchApiDirectGeocoding(location: string): Coordinates | null {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${appId}`,
      false
    );
    xhr.send();
    if (xhr.status === 200) {
      const data: { lon: number; lat: number }[] = JSON.parse(xhr.responseText);
      if (data.length > 0) {
        return { lon: data[0].lon, lat: data[0].lat }; // Matches Coordinates
      }
    }
    return null;
  } catch (err) {
    console.error("Error fetching geocoding data:", err);
    return null;
  }
}


// Display weather data on the UI
function displayWeatherData(lon: number, lat: number): void {
  try {
    // Fetch current weather
    const currentWeather = fetchApiCurrentWeather(lon, lat);
    if (currentWeather) {
      const temperatureElement = document.getElementById("temperature")?.querySelector("span");
      if (temperatureElement) {
        temperatureElement.textContent = currentWeather.main.temp.toString();
      }

      const conditionsElement = document.getElementById("conditions")?.querySelector("span");
      if (conditionsElement) {
        conditionsElement.textContent = currentWeather.weather[0].description;
      }

      const locationElement = document.getElementById("location")?.querySelector("span");
      if (locationElement) {
        locationElement.textContent = `${currentWeather.name}, ${currentWeather.sys.country}`;
      }
    }

    // Fetch air pollution
    const airPollution = fetchApiCurrentAirPollution(lon, lat);
    if (airPollution) {
      const aqiElement = document.getElementById("aqi")?.querySelector("span");
      if (aqiElement) {
        aqiElement.textContent = airPollution.list[0].main.aqi.toString();
      }
    }

    // Fetch 5-day weather forecast
    const forecast = fetchApiFiveDaysWeatherForecast(lon, lat);
    if (forecast) {
      const forecastContainer = document.getElementById("forecast-container");
      if (forecastContainer) {
        forecastContainer.innerHTML = "";
        for (const day of forecast.list.slice(0, 5)) {
          const dayEl = document.createElement("div");
          dayEl.innerHTML = `
            <p>${new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>${day.main.temp}°C</p>
            <p>${day.weather[0].description}</p>
          `;
          forecastContainer.appendChild(dayEl);
        }
      }
    }
  } catch (err) {
    console.error("Error displaying weather data:", err);
  }
}

// Event handlers
function toggleInputs(type: "location" | "coordinates"): void {
  const locationInput = document.getElementById("locationInput") as HTMLInputElement;
  const lonInput = document.getElementById("lon") as HTMLInputElement;
  const latInput = document.getElementById("lat") as HTMLInputElement;

  if (type === "location") {
    lonInput.disabled = true;
    latInput.disabled = true;
    locationInput.disabled = false;
  } else if (type === "coordinates") {
    locationInput.disabled = true;
    lonInput.disabled = false;
    latInput.disabled = false;
  }
}

function resetInputs(): void {
  (document.getElementById("location-input") as HTMLInputElement).value = "";
  (document.getElementById("lon") as HTMLInputElement).value = "";
  (document.getElementById("lat") as HTMLInputElement).value = "";
  (document.getElementById("location-input") as HTMLInputElement).disabled = false;
  (document.getElementById("lon") as HTMLInputElement).disabled = false;
  (document.getElementById("lat") as HTMLInputElement).disabled = false;
}

// Button event listeners
document.getElementById("fetch-weather-btn")?.addEventListener("click", () => {
  try {
    const location = (document.getElementById("location-input") as HTMLInputElement).value;
    const lonInput = (document.getElementById("lon") as HTMLInputElement).value;
    const latInput = (document.getElementById("lat") as HTMLInputElement).value;

    if (location) {
      const coordinates = fetchApiDirectGeocoding(location);
      if (coordinates) {
        lon = coordinates.lon;
        lat = coordinates.lat;
        displayWeatherData(lon, lat);
      } else {
        alert("Location not found!");
      }
    } else if (lonInput && latInput) {
      lon = parseFloat(lonInput);
      lat = parseFloat(latInput);
      displayWeatherData(lon, lat);
    } else {
      alert("Please enter either a location or both longitude and latitude values.");
    }
  } catch (err) {
    console.error("Error handling fetch-weather-btn click:", err);
  }
});

document.getElementById("reset-btn")?.addEventListener("click", resetInputs);
