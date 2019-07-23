const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define the dynamic path 
const publicDirectoryPath = path.join(__dirname,'../public')
const viewDirectoryPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()

//Setup the dynamic path
app.set('view engine','hbs')
app.set('views',viewDirectoryPath)
hbs.registerPartials(partialsPath)

//Setup the static path
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather APP',
        name : 'Priyanka Gangwar'
    })
})

app.get('/about',(req,res)=>{
    res.render(('about'),{
        title : 'About Me',
        name : 'Priyanka Gangwar'
    })
})

app.get('/help',(req,res)=>{
    res.render(('help'),{
        helpText: 'This is help page',
        title : 'This is helpful text',
        name : 'Priyanka'
    })
})



//! Load the Help and About Page using app.get
// app.get('/help',(req,res)=>{
//     res.send({
//         name : 'Priyanka',
//         age: 30
//     })
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About Page !</h1>')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            errorMessage : 'No address provided'
        
        })
    }
    let address = req.query.address
    geocode(address,(error,{latitude,longitude,location})=>{
        if(error){
            return res.send(error)
        }
        forecast(latitude,longitude,(error,forecastData) =>{
           if(error){
               return res.send(error)
           }
           res.send({
            forecast : forecastData,
            location,
            address
        })
        })
       })
})



app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            errorMessage : 'You must provide a search term'
        })
    }
    
    res.send({
    products :[]
    })
    
})

app.get('/help/*',(req,res)=>{
    res.send('Help Article Not Found!')
})

//This needs to come last for 404 Page
app.get('*',(req,res)=>{
    res.render('404',{
        title : '404 Page',
        name : 'Priyanka',
        errorMessage : 'Page Not Found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000!')
})