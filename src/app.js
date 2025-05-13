const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js')
const request = require('request')


console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express();

// setup static directory to serve
 app.use(express.static(path.join(__dirname,'../public')))
//app.com
//app.com/help
//app.com/about

//define paths for express config
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(partialsPath)

//set
// app.get('',(req,res)=>{
//     res.render(path.join(__dirname,'../views/index.hbs'),{title:'Weather App!',name:'manoj baskar'})
// })
// app.get('/about',(req,res) =>{
//     res.render(path.join(__dirname,'../views/about.hbs'),{title:'About Page!'})
// })

app.get('',(req,res)=>{
    res.render('index',{title:'Weather App!',name:'manoj baskar'})
})

app.get('/about',(req,res) =>{
    res.render('about',{title:'About Page!',name:'manoj baskar'})
})

console.log(path.join(__dirname,'../views/index.hbs'));

app.get('/help',(req,res) =>{
    res.render('help',{title:'help page',name:'manoj baskar'})
})

// app.get('/help/:article*', (req, res) => {
//     res.send(`<h1>Help content: ${req.params.article}</h1>`);
// });

app.get('/manoj',(req,res) => {
    res.render('manoj',{title:'manoj',name:'manoj baskar'})
})

// app.use(express.static('/Node-course/web-server/public'))
app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'the address is not provided'
        })
    }

    console.log('the addrees;'+ req.query.address)
    // res.send({forecast:'hot',location:'panruti',address:req.query.address})
    geocode(req.query.address,(error,{longitude ,latitude ,location } = {}) =>{

       
        if(error){
            res.send({error:error})
        } 
            forecast(latitude,longitude,(forecastError,forecastData)=>{
                if(forecastError){
                    return res.send({error:forecastError})
                }
                res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
                })
            })
        
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
return res.send({
    error:'you must provide a search term'
})
    }
    console.log(req.query.search)
res.send({
    products:[]
})
})
// app.get('*',(req,res) =>{
// res.send('my 404 page buddy')
// })



// for 404 error
app.use((req,res,next) =>{
    res.status(404).render('error',{title:'Error Page',name:'manoj baskar'})
})



app.listen(3000,()=>{
    console.log('the servers is running in 3000')
})