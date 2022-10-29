require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const groupRoutes = require('./routes/group');
const cron = require("node-cron");

const User = require('./models/user');
const Message = require('./models/message');
const Group = require('./models/group');
const GroupMember = require('./models/groupmember');
const GroupMessage = require('./models/groupmessage');
const ArchivedChat = require('./models/archivedchat');

const app = express();
app.use(cors({ origin: ['http://127.0.0.1:5500'] }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(userRoutes);
app.use(messageRoutes);
app.use(groupRoutes);

cron.schedule("*/10 * * * * *", function () {
    cronJob();
    console.log("running a task every 10 second");
});

async function cronJob() {
    try {
        const result = await GroupMessage.findAll();
        
        console.log('result:', result);
        for (let msg of result) {
            console.log('msg:', msg);
            await ArchivedChat.create({id:msg.id,msg:msg.msg,userId:msg.userId,groupId:msg.groupId,createdAt:msg.createdAt,updatedAt:msg.updatedAt});
        }
        await GroupMessage.truncate();
    }
    catch (err) {
        console.log(err);
    }

}

User.hasMany(Message);
Message.belongsTo(User);

User.hasMany(Group);
Group.belongsToMany(User, { through: GroupMember });

User.hasMany(GroupMessage);
GroupMessage.belongsTo(User);

Group.hasMany(GroupMessage);
GroupMessage.belongsTo(Group);

sequelize
    // .sync({force:true})
    .sync()
    .then(result => app.listen(3000))
    .catch(err => console.log("DB error", err));


