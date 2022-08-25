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
function displayWeather(response) {
  let city = document.querySelector("#city");
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");

  city.innerHTML = response.data.name.toUpperCase();
  temp.innerHTML = `${temperature}°C`;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "640e2620bb8db2be9b788ec37b4c5e15";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#enter-city");
  search(enterCity.value);
}
let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("click", search);

search("Abuja");

//bonus
function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "640e2620bb8db2be9b788ec37b4c5e15";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCurrentWeather);

  function displayCurrentWeather(response) {
    let currentTemperature = Math.round(response.data.main.temp);
    let currentTemp = document.querySelector("#temp");
    currentTemp.innerHTML = `${currentTemperature}°C`;
    let city = document.querySelector("#city");
    city.innerHTML = response.data.name;
  }
}
function displayCurrentWeatherData(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
//let currentButton = document.querySelector("#current");
//currentButton.addEventListener("click", displayCurrentWeatherData);
