var appId = "7a3e82da7b2d667bab335dae7c2622b4";
var lon = 0;
var lat = 0;
var fetchApiCurrentWeather = function (lon, lat) {
    var result = null;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?appid=".concat(appId, "&lat=").concat(lat, "&lon=").concat(lon, "&units=metric"), false);
    xhr.onload = function () {
        if (xhr.status === 200) {
            result = JSON.parse(xhr.responseText);
        }
        else {
            console.error("Failed to fetch current weather");
        }
    };
    xhr.onerror = function () { return console.error("Network error fetching current weather"); };
    xhr.send();
    return result;
};
var fetchApiFiveDaysWeatherForecast = function (lon, lat) {
    var result = null;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.openweathermap.org/data/2.5/forecast?appid=".concat(appId, "&lat=").concat(lat, "&lon=").concat(lon, "&units=metric"), false);
    xhr.onload = function () {
        if (xhr.status === 200) {
            result = JSON.parse(xhr.responseText);
        }
        else {
            console.error("Failed to fetch weather forecast");
        }
    };
    xhr.onerror = function () { return console.error("Network error fetching weather forecast"); };
    xhr.send();
    return result;
};
var fetchApiCurrentAirPollution = function (lon, lat) {
    var result = null;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.openweathermap.org/data/2.5/air_pollution?appid=".concat(appId, "&lat=").concat(lat, "&lon=").concat(lon), false);
    xhr.onload = function () {
        if (xhr.status === 200) {
            result = JSON.parse(xhr.responseText);
        }
        else {
            console.error("Failed to fetch air pollution data");
        }
    };
    xhr.onerror = function () {
        return console.error("Network error fetching air pollution data");
    };
    xhr.send();
    return result;
};
var fetchApiDirectGeocoding = function (location) {
    var result = null;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.openweathermap.org/geo/1.0/direct?q=".concat(location, "&limit=1&appid=").concat(appId), false);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            if (data.length > 0) {
                result = { lon: data[0].lon, lat: data[0].lat };
            }
            else {
                alert("Location not found!");
            }
        }
        else {
            console.error("Failed to fetch geocoding data");
        }
    };
    xhr.onerror = function () { return console.error("Network error fetching geocoding data"); };
    xhr.send();
    return result;
};
var displayWeatherData = function (lon, lat) {
    var currentWeather = fetchApiCurrentWeather(lon, lat);
    if (!currentWeather)
        return;
    document.getElementById("temperature").querySelector("span").textContent =
        currentWeather.main.temp;
    document.getElementById("conditions").querySelector("span").textContent =
        currentWeather.weather[0].description;
    document
        .getElementById("location")
        .querySelector("span").textContent = "".concat(currentWeather.name, ", ").concat(currentWeather.sys.country);
    var airPollution = fetchApiCurrentAirPollution(lon, lat);
    if (airPollution) {
        document.getElementById("aqi").querySelector("span").textContent =
            airPollution.list[0].main.aqi;
    }
    var forecast = fetchApiFiveDaysWeatherForecast(lon, lat);
    if (forecast) {
        var forecastContainer_1 = document.getElementById("forecast-container");
        forecastContainer_1.innerHTML = "";
        forecast.list.slice(0, 5).forEach(function (day) {
            var dayEl = document.createElement("div");
            dayEl.innerHTML = "\n        <p>".concat(new Date(day.dt * 1000).toLocaleDateString(), "</p>\n        <p>").concat(day.main.temp, "\u00B0C</p>\n        <p>").concat(day.weather[0].description, "</p>\n      ");
            forecastContainer_1.appendChild(dayEl);
        });
    }
};
var toggleInputs = function (type) {
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
};
var resetInputs = function () {
    document.getElementById("location-input").value = "";
    document.getElementById("lon").value = "";
    document.getElementById("lat").value = "";
    document.getElementById("location-input").disabled = false;
    document.getElementById("lon").disabled = false;
    document.getElementById("lat").disabled = false;
};
document
    .getElementById("fetch-weather-btn")
    .addEventListener("click", function () {
    var location = document.getElementById("location-input").value;
    var lonInput = document.getElementById("lon").value;
    var latInput = document.getElementById("lat").value;
    if (location) {
        var coordinates = fetchApiDirectGeocoding(location);
        if (coordinates) {
            lon = coordinates.lon;
            lat = coordinates.lat;
            displayWeatherData(lon, lat);
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
});
document.getElementById("reset-btn").addEventListener("click", resetInputs);
