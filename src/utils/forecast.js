const request = require('request')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


const forecast = (latitude,longitude,callback) => {
const url = 'https://api.weatherstack.com/current?access_key=1ad46aa32b45a25a4a00a42e80bc411f&query='+ encodeURIComponent(latitude) +','+ encodeURIComponent(longitude)+'&units=f';

request({url,json:true},(error,{body}) => {
 const{error:responseError,current} = body
 console.log('forecast errror:'+ error);
 console.log('forecast content:' + current)

  if(error){
    callback('Unable to connect to the server', undefined)
  } else if (responseError){
    callback('Please provide a valid input',undefined)
  }else {
    callback(undefined,`${current.weather_descriptions[0]}the weather is ${current.temperature} degree and it feels like ${current.feelslike} degree`)
  }
})

}










module.exports = forecast