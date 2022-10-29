require('dotenv').config();

const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const sequelize=require('./utils/database');
const userRoutes=require('./routes/user');
const messageRoutes=require('./routes/message');
const groupRoutes=require('./routes/group');

const User=require('./models/user');
const Message=require('./models/message');
const Group=require('./models/group');
const GroupMember=require('./models/groupmember');
const GroupMessage=require('./models/groupmessage');

const app=express();
app.use(cors({origin:['http://127.0.0.1:5500']}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(userRoutes);
app.use(messageRoutes);
app.use(groupRoutes);

User.hasMany(Message);
Message.belongsTo(User);

User.hasMany(Group);
Group.belongsToMany(User,{through:GroupMember});

User.hasMany(GroupMessage);
GroupMessage.belongsTo(User);

Group.hasMany(GroupMessage);
GroupMessage.belongsTo(Group);

sequelize
    // .sync({force:true})
    .sync()
    .then(result=>app.listen(3000))
    .catch(err=>console.log("DB error",err));


