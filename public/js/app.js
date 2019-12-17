

const weatherForm= document.querySelector('form')
const search = document.querySelector('input')
const place= document.querySelector('#location')
const weatherForecast= document.querySelector("#forecast")

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    place.textContent= 'Loading...'
    weatherForecast.textContent=''

    const location = search.value
    const url=  "/weather?address="+location

    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            place.textContent= data.error
            weatherForecast.textContent=''
        }
        else{
            place.textContent= data.location
            weatherForecast.textContent= data.weather
        }
    })
})

})