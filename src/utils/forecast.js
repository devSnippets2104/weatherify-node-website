const request=require('request');
const forecast=(latitude,longitude,cb)=>{
    const forecastURL=`http://api.weatherstack.com/current?access_key=9ca68d1e601a01b42281d372950908b2&query=${latitude},${longitude}&units=m`;
    request({url:forecastURL,json:true},(error,response)=>{
        if(error)
        {
            cb('Unable to connect to the weather service!',undefined)
        }else if(response.body.error)
        {
            cb('Unable to find locations!',undefined);
        }else{
            // const currentTemp=response.body.current.temperature;
            const feelsLike=response.body.current.feelslike;
            const weatherDesc=response.body.current.weather_descriptions[0];
            cb(undefined,`It feels like ${feelsLike}, and i can describe it as ${weatherDesc}.`)
        }

    })
}

module.exports=forecast;