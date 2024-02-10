const request=require('request');
const geocode=(address,cb)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaWFtYWRpMjAiLCJhIjoiY2xyMG0ybmE1MGRzMzJscDBxZDA0MTZpcyJ9.VfRVLRySBzXnZVzteQhp4w&limit=1`;
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            cb('Unable to connect to location services!',undefined);
        }else if(response.body.features.length===0)
        {
            cb('Unable to find the location, try another searches!',undefined);
        }
        else
        {
            const latitude=response.body.features[0].center[1];
            const longitude=response.body.features[0].center[0];
            const placeName=response.body.features[0].place_name;
            cb(undefined,{
                latitude,
                longitude,
                placeName
            });
        }
        })
}

module.exports=geocode;