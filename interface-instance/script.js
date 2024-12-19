var _a, _b;
// OpenWeatherMap API Key
var appId = "7a3e82da7b2d667bab335dae7c2622b4";
var lon = 0;
var lat = 0;
// Fetch current weather data
function fetchApiCurrentWeather(lon, lat) {
    try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?appid=".concat(appId, "&lat=").concat(lat, "&lon=").concat(lon, "&units=metric"), false);
        xhr.send();
        if (xhr.status === 200) {
            return JSON.parse(xhr.responseText);
        }
    }
    catch (err) {
        console.error("Error fetching current weather:", err);
    }
}
// Fetch 5-day weather forecast
function fetchApiFiveDaysWeatherForecast(lon, lat) {
    try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.openweathermap.org/data/2.5/forecast?appid=".concat(appId, "&lat=").concat(lat, "&lon=").concat(lon, "&units=metric"), false);
        xhr.send();
        if (xhr.status === 200) {
            return JSON.parse(xhr.responseText);
        }
    }
    catch (err) {
        console.error("Error fetching weather forecast:", err);
    }
}
// Fetch air pollution data
function fetchApiCurrentAirPollution(lon, lat) {
    try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.openweathermap.org/data/2.5/air_pollution?appid=".concat(appId, "&lat=").concat(lat, "&lon=").concat(lon), false);
        xhr.send();
        if (xhr.status === 200) {
            return JSON.parse(xhr.responseText);
        }
    }
    catch (err) {
        console.error("Error fetching air pollution data:", err);
    }
}
// Fetch geocoding data
function fetchApiDirectGeocoding(location) {
    try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.openweathermap.org/geo/1.0/direct?q=".concat(location, "&limit=1&appid=").concat(appId), false);
        xhr.send();
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            if (data.length > 0) {
                return { lon: data[0].lon, lat: data[0].lat }; // Matches Coordinates
            }
        }
        return null;
    }
    catch (err) {
        console.error("Error fetching geocoding data:", err);
        return null;
    }
}
// Display weather data on the UI
function displayWeatherData(lon, lat) {
    var _a, _b, _c, _d;
    try {
        // Fetch current weather
        var currentWeather = fetchApiCurrentWeather(lon, lat);
        if (currentWeather) {
            var temperatureElement = (_a = document.getElementById("temperature")) === null || _a === void 0 ? void 0 : _a.querySelector("span");
            if (temperatureElement) {
                temperatureElement.textContent = currentWeather.main.temp.toString();
            }
            var conditionsElement = (_b = document.getElementById("conditions")) === null || _b === void 0 ? void 0 : _b.querySelector("span");
            if (conditionsElement) {
                conditionsElement.textContent = currentWeather.weather[0].description;
            }
            var locationElement = (_c = document.getElementById("location")) === null || _c === void 0 ? void 0 : _c.querySelector("span");
            if (locationElement) {
                locationElement.textContent = "".concat(currentWeather.name, ", ").concat(currentWeather.sys.country);
            }
        }
        // Fetch air pollution
        var airPollution = fetchApiCurrentAirPollution(lon, lat);
        if (airPollution) {
            var aqiElement = (_d = document.getElementById("aqi")) === null || _d === void 0 ? void 0 : _d.querySelector("span");
            if (aqiElement) {
                aqiElement.textContent = airPollution.list[0].main.aqi.toString();
            }
        }
        // Fetch 5-day weather forecast
        var forecast = fetchApiFiveDaysWeatherForecast(lon, lat);
        if (forecast) {
            var forecastContainer = document.getElementById("forecast-container");
            if (forecastContainer) {
                forecastContainer.innerHTML = "";
                for (var _i = 0, _e = forecast.list.slice(0, 5); _i < _e.length; _i++) {
                    var day = _e[_i];
                    var dayEl = document.createElement("div");
                    dayEl.innerHTML = "\n            <p>".concat(new Date(day.dt * 1000).toLocaleDateString(), "</p>\n            <p>").concat(day.main.temp, "\u00B0C</p>\n            <p>").concat(day.weather[0].description, "</p>\n          ");
                    forecastContainer.appendChild(dayEl);
                }
            }
        }
    }
    catch (err) {
        console.error("Error displaying weather data:", err);
    }
}
// Event handlers
function toggleInputs(type) {
    var locationInput = document.getElementById("locationInput");
    var lonInput = document.getElementById("lon");
    var latInput = document.getElementById("lat");
    if (type === "location") {
        lonInput.disabled = true;
        latInput.disabled = true;
        locationInput.disabled = false;
    }
    else if (type === "coordinates") {
        locationInput.disabled = true;
        lonInput.disabled = false;
        latInput.disabled = false;
    }
}
function resetInputs() {
    document.getElementById("location-input").value = "";
    document.getElementById("lon").value = "";
    document.getElementById("lat").value = "";
    document.getElementById("location-input").disabled = false;
    document.getElementById("lon").disabled = false;
    document.getElementById("lat").disabled = false;
}
// Button event listeners
(_a = document.getElementById("fetch-weather-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    try {
        var location_1 = document.getElementById("location-input").value;
        var lonInput = document.getElementById("lon").value;
        var latInput = document.getElementById("lat").value;
        if (location_1) {
            var coordinates = fetchApiDirectGeocoding(location_1);
            if (coordinates) {
                lon = coordinates.lon;
                lat = coordinates.lat;
                displayWeatherData(lon, lat);
            }
            else {
                alert("Location not found!");
            }
        }
        else if (lonInput && latInput) {
            lon = parseFloat(lonInput);
            lat = parseFloat(latInput);
            displayWeatherData(lon, lat);
        }
        else {
            alert("Please enter either a location or both longitude and latitude values.");
        }
    }
    catch (err) {
        console.error("Error handling fetch-weather-btn click:", err);
    }
});
(_b = document.getElementById("reset-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", resetInputs);
