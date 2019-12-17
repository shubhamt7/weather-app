const express= require("express")
const path= require("path")
const app= express()
const hbs= require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')

//Defining paths for express configuration
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsPath= path.join(__dirname, '../templates/views')
const partialsPath= path.join(__dirname, '../templates/partials')
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setup views location
app.set('views',viewsPath)

//setup handlebars
app.set('view engine', 'hbs')

hbs.registerPartials(partialsPath)
//setting up partials


app.get('', (req,res)=>{
    res.render('index',{
        title:"KnoWeather",
        name: "Shubham Thind"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About Me",
        name: "Shubham Thind"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Need Help?",
        name: "Shubham Thind"
    })
})

app.get('/weather', (req,res)=>{
    const address= req.query.address

    if(!address){
        return res.send({
            error: "No address provided"
        })
    }
    geocode(address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error: "Unable to find location. Please provide another address"
            })
        }

        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                
                return res.send({
                    error: "Invalid lat and long"
                })
            }

            res.send({
                address: address,
                location,
                weather: forecastData
            })
        })
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        info:"Help article not found",
        name: "Shubham Thind"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        info: "Page not found",
        name: "Shubham Thind"
    })
})

const port= process.env.PORT || 3000 

app.listen(port , ()=>{
    console.log("The server is listening on port "+port)
})