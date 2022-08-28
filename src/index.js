//feature #1
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
if (hour < 12) {
  time.innerHTML = `0${hour}:${minute}`;
} else {
  time.innerHTML = `${hour}:${minute}`;
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
        <strong>${forecastDay.dt}</strong> <br /><img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt=""<div id="max-temp"><strong>${forecastDay.temp.max}°C</div></strong> <div id="min-temp">${forecastDay.temp.min}°C</div>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `640e2620bb8db2be9b788ec37b4c5e15`;
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let city = document.querySelector("#city");
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  city.innerHTML = response.data.name.toUpperCase();
  temp.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
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

function showFarenheitTemp(event) {
  event.preventDefault();
  let displayFarenheit = document.querySelector("#temp");
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
  displayFarenheit.innerHTML = Math.round(farenheitTemp);
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
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

displayForecast();
search("Abuja");
