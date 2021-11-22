const cityInput = document.querySelector('input');
const cityName = document.querySelector('.city__title');
const icon = document.querySelector('.weather__icon');
const weather = document.querySelector('.weather__info__conditions');
const temperature = document.querySelector('.weather__info__temperature');
const humidity = document.querySelector('.details__humidity-data');
const pressure = document.querySelector('.details__pressure-data');
//const rain = document.querySelector('.chance-of-rain');
const windSpeed = document.querySelector('.details__wind-speed-data');
const windDirection = document.querySelector('.details__wind-speed-data');
const arrow = document.querySelector('.fa-long-arrow-alt-up');
const sunrise = document.querySelector('.sun__sunrise-data');
const sunset = document.querySelector('.sun__sunset-data');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_LANG = '&lang=PL'
const API_KEY = '&appid=68b4cdef59745545e445f304ebbf21c6';
const API_UNITS_METRIC = '&units=metric';
//const API_UNITS_IMPERIAL = '&units=imperial';
const getWeather = () => {
    const city = cityInput.value || 'Warszawa';
    const URL = API_LINK + city + API_LANG + API_KEY + API_UNITS_METRIC;
    axios.get(URL).then(res => {
        console.log(res.data);

        const temperatureData = res.data.main.temp;
        const humidityData = res.data.main.humidity;
        const pressureData = res.data.main.pressure;
        const windSpeedData = res.data.wind.speed;
        const windDirectionData = res.data.wind.deg;
        const sunriseDataUnix = ((res.data.sys.sunrise) * 1000);
        const sunsetDataUnix = ((res.data.sys.sunset) * 1000);

        const sunriseData = moment(new Date(sunriseDataUnix)).format("HH:mm:ss");
        const sunsetData = moment(new Date(sunsetDataUnix)).format("HH:mm:ss");


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

        // wind direction
        // console.log(windDirectionData);

        const degToCompass = () => {
            const val = Math.floor((windDirectionData / 45 + 0.5));
            const arr = ["↓", "↙", "←", "↖", "↑", "↗", "→", "↘"];
            return arr[(val % 8)];

            degToCompass();
        }
        cityName.textContent = res.data.name;
        weather.textContent = `// ${status.main}`;
        temperature.textContent = Number.parseFloat(temperatureData).toFixed(1) + "℃";
        humidity.textContent = `${humidityData}%`;
        pressure.textContent = `${pressureData}hPa`;
        windSpeed.textContent = `${Number.parseFloat(windSpeedData * 3.6).toFixed(0)} km/h ${degToCompass()}`;
        sunrise.textContent = sunriseData;
        sunset.textContent = sunsetData;
        // windDirection.textContent =`Wind direction: ${windDirectionData}%`;

    });
}


const search = () => {

}

const enterCheck = e => {
    if (e.key === 'Enter') {
        getWeather();
    }
}



cityInput.addEventListener('keyup', enterCheck);