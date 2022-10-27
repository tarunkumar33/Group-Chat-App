require('dotenv').config();

const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const sequelize=require('./utils/database');
const userRoutes=require('./routes/user');


const app=express();
app.use(cors({origin:['http://127.0.0.1:5500']}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use('/user',userRoutes);


sequelize
    // .sync({force:true})
    .sync()
    .then(result=>app.listen(3000))
    .catch(err=>console.log("DB error",err));


