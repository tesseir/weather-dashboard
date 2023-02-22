const apiKey = '051b8e174ef9d8e5193f8360d6bfbf0e'

async function geocodeCity(city) {
    const httpResult = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
    return (await httpResult.json())[0]
}

async function getCurrent(geoInfo) {
    const httpResult = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoInfo.lat}&lon=${geoInfo.lon}&appid=${apiKey}`)
    return (await httpResult.json())
}

async function getForecast(geoInfo) {
    const httpResult = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geoInfo.lat}&lon=${geoInfo.lon}&appid=${apiKey}`)
    return (await httpResult.json())
}

window.onCityBtnClk = async function (cityName = '') {
    

    const cityInputEl = document.getElementById('city-input')
    if (cityName === '') {

        cityName = cityInputEl.value;
    }
    console.log(cityName)
    const cityEl = document.getElementById('city');
    cityEl.innerText=cityName;

    const weatherEl = document.getElementById('weather')
    const dateEl = document.getElementById('date')
    const tempEl = document.getElementById('temperature')
    const windEl = document.getElementById('wind')
    const humEL = document.getElementById('humidity')
    const uvEl = document.getElementById('uv-index')


    function saveSearch() {
        if (localStorage.getItem('cities') == null) {
            localStorage.setItem('cities', JSON.stringify([]))
        }
        const currentCities = JSON.parse(localStorage.getItem('cities'));
        console.log(currentCities);
        localStorage.setItem('cities', JSON.stringify([cityName, ...currentCities]))
    }

    function w(weatherDay, weather) {
        document.getElementById(`t${weatherDay + 1}`).innerText = weather
    }

    function t(temperatureDay, temp) {
        document.getElementById(`t${temperatureDay + 1}`).innerText = temp
    }

    function h(humidityDay, humidity) {
        return document.getElementById(`h${humidityDay + 1}`).innerText = humidity
    }

    function kf(k) {
        return (k - 273.15) * 9 / 5 + 32
    }

    // todo:
    // 1 - geocode the city

    const geoCity = await geocodeCity(cityName);

    // 2 - get the weather right now

    const curWeather = await getCurrent(geoCity);

    // 3 - get the forecast for next 5 days

    const forecast = await getForecast(geoCity);

    console.log('forcast', forecast);


    // 4 - display current weather
    //curWeather.main.temp
    weatherEl.innerText = (curWeather.weather[0].description)
    tempEl.innerText = kf(curWeather.main.temp)
    windEl.innerText = curWeather.wind.speed
    humEL.innerText = curWeather.main.humidity

    // 5 - display next 5 days

    for (let i = 0; i < 5; i++) {
        w(i, (forecast.list[i].weather[0].description))    
        t(i, kf(forecast.list[i].main.temp))
        h(i, (forecast.list[i].main.humidity))
    }

    // 6 - save searchess
    saveSearch()
    showSaves()
}

function showSaves() {
    const saves = JSON.parse(localStorage.getItem("cities") || [])
    console.log(saves)
    const citybtnEL = document.getElementById('city-buttons')

    const citybtnhtml = saves.map(save => {
        return `<li><button class="btn btn-primary mb-2 align-text-bottom" onclick="window.onCityBtnClk('${save}')">${save}</button></li>`
    })
    citybtnEL.innerHTML = citybtnhtml.join('')

}

showSaves()

