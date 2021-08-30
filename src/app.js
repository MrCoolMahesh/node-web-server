const path=require('path');
const forecast=require('./utils/forecast');
const geocode=require('./utils/geocode');
const express=require('express');
const hbs=require('hbs');

//initiate express server
const app=express();

//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');

//Set up handlebars engine and view locations
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath)
//express to serve static files
app.use(express.static(publicDirectoryPath));

app.get('/',(req,res)=>{
    res.render('index',{title:"Weather"})
});

app.get('/about',(req,res)=>{
    console.log('about start')
    res.render('about',{title:"About me",name:"Maahesh"})
    console.log('about end')
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:"You must provide address"})
    }
    geocode(req.query.address,(error,{latitide,longitude,location}={})=>{
        if(error){
            return res.send({error:error});
        }

        forecast(req.query.address,(error,data)=>{
            if(error){
                return res.send({error:error});
            }

            res.send({forecast:data,location,address:req.query.address});
        })
    })
    //res.send({forecast:"partly cloud",location:"india",address:req.query.address})
})

app.get('/help',(req,res)=>{
    res.render('help',{title:"Help"})
})

app.get('/help/*',(req,res)=>{
    res.render('404',{title:"Error Page",errorMessage:"Help page is not found"})
})

app.get('*',(req,res)=>{
    res.render('404',{title:"Error Page",errorMessage:"Page Not Found"})
})
//start the server up and run on port

app.listen(3000,()=>console.log('server is running on port 3000...'))