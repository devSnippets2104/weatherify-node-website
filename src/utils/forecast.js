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
            // console.log('TESTAPI',response.body.current);
            const feelsLike=response.body.current.feelslike;
            const weatherDesc=response.body.current.weather_descriptions[0];
            const windDirection=response.body.current.wind_dir;
            const weatherIcon=response.body.current.weather_icons;
            const weatherDetailsObj={
                "status":`The weather outside is ${weatherDesc} and the it feels like ${feelsLike}. The wind is flowing from ${windDirection}`,
                "icon":weatherIcon
            }
            cb(undefined,weatherDetailsObj)
        }

    })
}


module.exports=forecast;