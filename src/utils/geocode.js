const request = require('request');

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+ encodeURIComponent(address) + '&access_token=pk.eyJ1IjoibWFub2phYmEiLCJhIjoiY21hZHdrYjdqMDFqbjJxczgwNG80NmU0cyJ9.xstLA3ALOLeMv62TEE6Ztw&limit=1'
    request({url:url,json:true}, (error,{body}={}) =>{
        const{features} = body;
        
        // const {longitude,latitude} = features[0].properties.coordinates
        
       
        if(error){
           callback('Unable to connect to location services',undefined) 
        }else if (features.length === 0){
            callback('unable to find location, try another search',undefined)
        } else {
            callback(undefined, {
                 longitude:features[0].properties.coordinates.longitude ,
         latitude:features[0].properties.coordinates.latitude ,
         location:features[0].properties.name

            })
        }
    })
}


// geocode('panruti',(a,b) =>{
//     console.log(a,b)
// })


module.exports = geocode;