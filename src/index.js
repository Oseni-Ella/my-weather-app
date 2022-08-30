let now = new Date();

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Saturday"];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let day = days[now.getDay()];
let month = months[now.getMonth()];
let currentDate = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();

let date = document.querySelector("#date");
date.innerHTML = `${day}, ${currentDate} ${month}`;
let time = document.querySelector("#time");
if (hour < 10 && minute < 10) {
  time.innerHTML = `0${hour}:0${minute}`;
} else {
  time.innerHTML = `${hour}:${minute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5)
      forecastHTML =
        forecastHTML +
        `<div class="col">
        <strong>${formatDay(
          forecastDay.dt
        )}</strong> <br /><img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt=""/><div id="max-temp"><strong>${Math.round(
          forecastDay.temp.max
        )}°C</strong></div> <div id="min-temp">${Math.round(
          forecastDay.temp.min
        )}°C</div>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = `640e2620bb8db2be9b788ec37b4c5e15`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  console.log(response);
  let city = document.querySelector("#city");
  let temp = document.querySelector("#temp");
  let feelsLike = document.querySelector("#feels-like");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let pressure = document.querySelector("#pressure");
  let icon = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;
  celsiusFeelsLike = response.data.main.feels_like;

  city.innerHTML = response.data.name.toUpperCase();
  temp.innerHTML = Math.round(celsiusTemp);
  feelsLike.innerHTML = `Feels like: ${Math.round(celsiusFeelsLike)}°C`;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  pressure.innerHTML = `${response.data.main.pressure}mb`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = `640e2620bb8db2be9b788ec37b4c5e15`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#enter-city");
  search(enterCity.value);
}
let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", handleSearch);

let celsiusTemp = null;
let celsiusFeelsLike = null;

function showFarenheitTemp(event) {
  event.preventDefault();
  let displayFarenheit = document.querySelector("#temp");
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
  displayFarenheit.innerHTML = Math.round(farenheitTemp);
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitFeelsLike = (celsiusFeelsLike * 9) / 5 + 32;
  let displayFarenheitFeelsLike = document.querySelector("#feels-like");
  displayFarenheitFeelsLike.innerHTML = `Feels like: ${Math.round(
    farenheitFeelsLike
  )}°F`;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let displayCelsius = document.querySelector("#temp");
  displayCelsius.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Abuja");
