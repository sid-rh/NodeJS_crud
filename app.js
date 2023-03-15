const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const appRoutes = require('./routes/appRoute');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const methodOverride=require('method-override');

dotenv.config();

const PORT=process.env.PORT||8000;
const mongoUrl=process.env.MONGO_URL;

const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.set('view engine','ejs');

app.use(express.static('uploads'));




mongoose.connect(mongoUrl).then(()=>
{
    console.log("Connected to the db");
});

app.get('/hi',(req,res)=>
{
    res.json("hi");
});
app.get('/add',(req,res)=>
{
    // res.json("add");
    res.render('addData',{ title: 'Add Data'});
});


app.use('/',appRoutes);




app.listen(PORT,(req,res)=>
{
    console.log(`connected to the port ${PORT}`);
})
