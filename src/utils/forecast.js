const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url ='http://api.weatherstack.com/current?access_key=b9e15c3b2b24d086e5a0700c02fbe980&query=' + latitude + ',' + longitude + '&units=f'

  request({ url, json: true }, (error, { body }) => {
      if (error) {
          callback('Unable to connect to weather service!', undefined)
      } else if (body.error) {
          callback('Unable to find location. Try another location', undefined)
      } else {
          callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out.There is " + body.current.precip + "% chance of rain. The humidity feels like " + body.current.feelslike)
      }
  })
}

module.exports = forecast