const path=require('path');
const express=require('express');
const app=express();
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');


// Define paths for express config
const staticPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
app.use(express.static(staticPath));

const partialsPath=path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location.
app.set('views',path.join(__dirname,'../views'));
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.get('',(req,res)=>{
    res.render('index.hbs',{
        title:'Weatherify',
        name:'Aditya'
    });
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:'About me',
        name:'Aditya'
    })
})
// console.log(path.join(__dirname,'../public'));

app.get('/help',(req,res)=>{
    res.render('help.hbs',{
        title:'Help & Support',
        name:'Aditya',
        issue:'Weather'
    })
})

// app.com


app.get('/weather',(req,res)=>{
    const address=req.query.address;
    if(!address)
    {
        return res.send({
            'error':'Address must be provided at all times'
        })
    }
    geocode(address,(error,data)=>{
        if(error)
        {
            return res.send({
                error
            });
        }            
    forecast(data.latitude,data.longitude,(error,forecastdata)=>{
            if (error)
            {
                return res.send({
                    error
                });
            }

            res.send({
                forecast:forecastdata,
                location:data.placeName,
                address:address
            });
        })
    });

    

})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
       return res.send({
            error:'You must provide a search term!'
        })
    }
    // console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.send('Help article not found!')

})

// app.get('*',(req,res)=>{
//     res.send({
//         error:'Sorry page not found!'
//     });
//     // res.render('404-page.hbs',{
//     //     name:'Aditya'
//     // })

// })

app.listen(3000,()=>{
    console.log('Server is running on! 3000');
}); 