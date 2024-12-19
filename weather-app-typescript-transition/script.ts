const appId: string = "7a3e82da7b2d667bab335dae7c2622b4";
let lon: number = 0;
let lat: number = 0;

const fetchApiCurrentWeather = (lon: number, lat: number) => {
  let result: any = null;
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?appid=${appId}&lat=${lat}&lon=${lon}&units=metric`,
    false
  );
  xhr.onload = () => {
    if (xhr.status === 200) {
      result = JSON.parse(xhr.responseText);
    } else {
      console.error("Failed to fetch current weather");
    }
  };
  xhr.onerror = () => console.error("Network error fetching current weather");
  xhr.send();
  return result;
};

const fetchApiFiveDaysWeatherForecast = (lon: number, lat: number) => {
  let result: any = null;
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/forecast?appid=${appId}&lat=${lat}&lon=${lon}&units=metric`,
    false
  );
  xhr.onload = () => {
    if (xhr.status === 200) {
      result = JSON.parse(xhr.responseText);
    } else {
      console.error("Failed to fetch weather forecast");
    }
  };
  xhr.onerror = () => console.error("Network error fetching weather forecast");
  xhr.send();
  return result;
};

const fetchApiCurrentAirPollution = (lon: number, lat: number) => {
  let result: any = null;
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/air_pollution?appid=${appId}&lat=${lat}&lon=${lon}`,
    false
  );
  xhr.onload = () => {
    if (xhr.status === 200) {
      result = JSON.parse(xhr.responseText);
    } else {
      console.error("Failed to fetch air pollution data");
    }
  };
  xhr.onerror = () =>
    console.error("Network error fetching air pollution data");
  xhr.send();
  return result;
};

const fetchApiDirectGeocoding = (location: string) => {
  let result: any = null;
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${appId}`,
    false
  );
  xhr.onload = () => {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      if (data.length > 0) {
        result = { lon: data[0].lon, lat: data[0].lat };
      } else {
        alert("Location not found!");
      }
    } else {
      console.error("Failed to fetch geocoding data");
    }
  };
  xhr.onerror = () => console.error("Network error fetching geocoding data");
  xhr.send();
  return result;
};

const displayWeatherData = (lon: number, lat: number): void => {
  const currentWeather = fetchApiCurrentWeather(lon, lat);
  if (!currentWeather) return;

  document.getElementById("temperature")!.querySelector("span")!.textContent =
    currentWeather.main.temp;
  document.getElementById("conditions")!.querySelector("span")!.textContent =
    currentWeather.weather[0].description;
  document
    .getElementById("location")!
    .querySelector(
      "span"
    )!.textContent = `${currentWeather.name}, ${currentWeather.sys.country}`;

  const airPollution = fetchApiCurrentAirPollution(lon, lat);
  if (airPollution) {
    document.getElementById("aqi")!.querySelector("span")!.textContent =
      airPollution.list[0].main.aqi;
  }

  const forecast = fetchApiFiveDaysWeatherForecast(lon, lat);
  if (forecast) {
    const forecastContainer = document.getElementById(
      "forecast-container"
    ) as HTMLElement;
    forecastContainer.innerHTML = "";
    forecast.list.slice(0, 5).forEach((day: any) => {
      const dayEl = document.createElement("div");
      dayEl.innerHTML = `
        <p>${new Date(day.dt * 1000).toLocaleDateString()}</p>
        <p>${day.main.temp}°C</p>
        <p>${day.weather[0].description}</p>
      `;
      forecastContainer.appendChild(dayEl);
    });
  }
};

const toggleInputs = (type: string): void => {
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
};

const resetInputs = (): void => {
  (document.getElementById("location-input") as HTMLInputElement).value = "";
  (document.getElementById("lon") as HTMLInputElement).value = "";
  (document.getElementById("lat") as HTMLInputElement).value = "";
  (document.getElementById("location-input") as HTMLInputElement).disabled = false;
  (document.getElementById("lon") as HTMLInputElement).disabled = false;
  (document.getElementById("lat") as HTMLInputElement).disabled = false;
};

document
  .getElementById("fetch-weather-btn")!
  .addEventListener("click", () => {
    const location = (document.getElementById("location-input") as HTMLInputElement).value;
    const lonInput = (document.getElementById("lon") as HTMLInputElement).value;
    const latInput = (document.getElementById("lat") as HTMLInputElement).value;

    if (location) {
      const coordinates = fetchApiDirectGeocoding(location);
      if (coordinates) {
        lon = coordinates.lon;
        lat = coordinates.lat;
        displayWeatherData(lon, lat);
      }
    } else if (lonInput && latInput) {
      lon = parseFloat(lonInput);
      lat = parseFloat(latInput);
      displayWeatherData(lon, lat);
    } else {
      alert(
        "Please enter either a location or both longitude and latitude values."
      );
    }
  });

document.getElementById("reset-btn")!.addEventListener("click", resetInputs);
