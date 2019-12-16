const request= require('request')


const forecast=(lat,long,callback)=>{
    const url="https://api.darksky.net/forecast/14b0c5aa4a381a623d31665628a4b5b7/"+lat+","+long

    request({url, json: true},(error, {body} )=>{
        if(error){
            callback("Unable to connect to weather services", undefined)
        }else if(body.error){
            callback("Unable to find location", undefined)
        }else{
            callback(undefined, body.daily.data[0].summary)
        }
    })

}
module.exports= forecast