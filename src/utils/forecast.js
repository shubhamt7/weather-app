const request= require('request')


const forecast=(lat,long,callback)=>{
    const url="https://api.darksky.net/forecast/14b0c5aa4a381a623d31665628a4b5b7/"+lat+","+long+"?units=si"

    request({url, json: true},(error, {body} )=>{
        if(error){
            callback("Unable to connect to weather services", undefined)
        }else if(body.error){
            callback("Unable to find location", undefined)
        }else{
            const summary= body.daily.data[0].summary
            const temp= body.hourly.data[0].temperature
            const rainProbability= body.daily.data[0].precipProbability*100
            const forecastResult= summary + " It is currently "+ temp +" degrees temperature out there. There is "+ rainProbability+"% chance of rain."
            callback(undefined, forecastResult)
        }
    })

}
module.exports= forecast