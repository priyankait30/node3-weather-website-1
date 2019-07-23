const request = require('request')

const forecast = (latitude,longitude,callback) =>{
    const url = 'https://api.darksky.net/forecast/ca5b718230cb1cf94e24965f6096e538/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)
    console.log(url)
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined);
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,"It is currently "+body.currently.temperature+' .There is 0% chance of rain')
        }
    })
}

module.exports = forecast