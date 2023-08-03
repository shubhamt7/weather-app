const request= require('request')

const api_key = "1fdb1a35da62119aff5bd2ce4d4d301e"

const fahrenheitToCelsius = (temp) => {
    const celsius = temp - 273.15;
    return celsius.toFixed(1) + ' °C'
}

const getWeatherType = (weather) => {
    if(weather.includes('snow'))
        return 'snowy';
    if(weather.includes('cloud'))
        return 'cloudy';
    if(weather.includes('rain'))
        return 'rainy';
    if(weather.includes('sun'))
        return 'sunny'
    
    return 'clear';
}

const forecast=(lat,long,callback)=>{
    console.log(lat, long, callback);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`

    request({url, json: true},(error, {body} )=>{
        if(error){
            callback("Unable to connect to weather services", undefined, undefined)
        }else if(body.error){
            callback("Unable to find location", undefined, undefined)
        }else{
            const weather = body.weather[0].description;
            console.log(weather)
            const temperatureActual = fahrenheitToCelsius(body.main.temp);
            const humidity = body.main.humidity;
            let weatherType = getWeatherType(weather.toLowerCase());
            weatherType = weatherType.charAt(0).toUpperCase() + weatherType.slice(1);
            
            const summary = `Summary - ${weatherType}, Temp : ${temperatureActual}, Humidity : ${humidity}`;
            callback(undefined, summary, weatherType)
        }
    })

}
module.exports= forecast