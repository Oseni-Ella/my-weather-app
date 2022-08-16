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

//feature #2
function search(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#enter-city");
  let value = enterCity.value;
  let city = document.querySelector("#city");
  city.innerHTML = value.toUpperCase().trim();

  let apiKey = "640e2620bb8db2be9b788ec37b4c5e15";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${apiKey}`;

  function displayWeather(response) {
    let temperature = Math.round(response.data.main.temp);
    let temp = document.querySelector("#temp");
    temp.innerHTML = `${temperature}°C`;
  }
  axios.get(apiUrl).then(displayWeather);
}
let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("click", search);

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
    city.innerHTML = "ABUJA";
  }
}
function displayCurrentWeatherData(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", displayCurrentWeatherData);
