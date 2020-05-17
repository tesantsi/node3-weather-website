const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const locationsearch = search.value
    if (!location) {
        message1.textContent = 'Input a location'
    } else {
        message1.textContent = 'loading...'
        message2.textContent = ''
        fetch(`/weather?address=${locationsearch}`)
            .then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        message1.textContent = data.error
                    } else {
                        message1.textContent = data.location
                        message2.textContent = `${data.forecast} and the temperature is ${data.temp} deg F but it feels like ${data.feelslike}.`
                    }
                })
            })
            .catch((error) =>{
                message1.textContent = error
            })
    }

})
