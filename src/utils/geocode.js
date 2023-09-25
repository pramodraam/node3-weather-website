const request = require('request')

const geocode = (address, callback) => {
  const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicHJhbW9kcmFhbSIsImEiOiJjbG1vbnRzY3AxYTR3MmtzN3ZpcHZlbjhuIn0.9In5nO7tJ09jdTagispWxQ'
  request({url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode