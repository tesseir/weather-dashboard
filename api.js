//051b8e174ef9d8e5193f8360d6bfbf0e

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key} (remember future 5 days are between 3 hours)

const apiKey = '051b8e174ef9d8e5193f8360d6bfbf0e'





async function geocodeCity(city) {
    const httpResult = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`) 
    return (await httpResult.json())[0]
}

async function getForecast(geoInfo) {
    const httpResult = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geoInfo.lat}&lon=${geoInfo.lon}&appid=${apiKey}`) 
    return (await httpResult.json())
}

window.onCityBtnClk = async function () {

    console.log("hello")
}



const test = async ()=>{
    const geoCity = await geocodeCity("cottage grove")
    const forecast = await getForecast(geoCity)

    console.log(forecast)};

test();
