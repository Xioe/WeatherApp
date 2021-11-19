const cityInput = document.querySelector('input');
const cityName = document.querySelector('.city-name');
const icon = document.querySelector('.weather-icon');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity-data');
const pressure = document.querySelector('.pressure-data');
const rain = document.querySelector('.chance-of-rain');
const windSpeed = document.querySelector('.wind-speed-data');
const windDirection = document.querySelector('.wind-direction');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_LANG = '&lang=PL'
const API_KEY = '&appid=68b4cdef59745545e445f304ebbf21c6';
const API_UNITS_METRIC = '&units=metric';
//const API_UNITS_IMPERIAL = '&units=imperial';
const getWeather = () => {
    const city = cityInput.value || 'Warszawa';
    const URL = API_LINK + city + API_LANG + API_KEY + API_UNITS_METRIC;
    axios.get(URL).then(res => {
        //console.log(res.data);

        const temperatureData = res.data.main.temp;
        const humidityData = res.data.main.humidity;
        const pressureData = res.data.main.pressure;
        const windSpeedData = res.data.wind.speed;
        const windDirectionData = res.data.wind.deg;

        const status = Object.assign({}, ...res.data.weather);

        cityInput.value = "";

        if (status.id >= 200 && status.id <= 232) {
            icon.setAttribute('src', './assets/img/thunderstorm.png');
        } else if (status.id >= 300 && status.id <= 321) {
            icon.setAttribute('src', './assets/img/drizzle.png')
        } else if (status.id >= 500 && status.id <= 531) {
            icon.setAttribute('src', './assets/img/rain.png')
        } else if (status.id >= 600 && status.id <= 622) {
            icon.setAttribute('src', './assets/img/snow.png')
        } else if (status.id == 800) {
            icon.setAttribute('src', './assets/img/sun.png')
        } else if (status.id >= 801 && status.id <= 804) {
            icon.setAttribute('src', './assets/img/cloudy.png')
        } else if (status.id == 741) {
            icon.setAttribute('src', './assets/img/fog.png')
        } else {
            icon.setAttribute('src', './assets/img/unknown.png')
        }

        cityName.textContent = res.data.name;
        weather.textContent = `// ${status.main}`;
        temperature.textContent = Number.parseFloat(temperatureData).toFixed(1) + "℃";
        humidity.textContent =`${humidityData}%`;
        pressure.textContent =`${pressureData}hPa`;
        windSpeed.textContent =`${windSpeedData}m/s`;
       // windDirection.textContent =`Wind direction: ${windDirectionData}%`;
    });
}

const enterCheck = e => {
    if (e.key === 'Enter') {
        getWeather();
    }
}


cityInput.addEventListener('keyup', enterCheck)