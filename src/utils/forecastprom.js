const request = require('postman-request');

const forecast = (lat, lon) => {
    const url = `http://api.weatherstack.com/current?access_key=67f882d005c62ac79c7e1a51a5a52842&query=${lat},${lon}&units=f`;
    return new Promise((resolve, reject) => {
        request({ url, json: true }, (error, { body } = {}) => {
            if (error) {
                reject('Unable to connect to weather service!')
            } else if (body.error) {
                reject('Unable to find location')
            } else {
                resolve({
                    desc: body.current.weather_descriptions[0],
                    current_temp: body.current.temperature,
                    feels_like: body.current.feelslike
                })
            }
        })
    })
}

module.exports = forecast;