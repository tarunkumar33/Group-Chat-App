const uuid = require('uuid');
const Group = require('../models/group');
const GroupMember = require('../models/groupmember');
const User = require('../models/user');

exports.addMember = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            const group = await Group.findOne({ where: { id: req.params.groupId } });
            await group.addUser(user, { through: { admin: req.body.admin, groupName:group.groupName} });
            res.json('member added to group');
        }
        else {
            res.json("user not Exists");
        }
    }
    catch (err) {
        console.log('err:', err)
        res.status(500).json(err);
    }
}

exports.makeAdmin = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.body.id } });
        if (user) {
            const member = await GroupMember.findOne({ where: { userId: user.id, groupId: req.params.groupId } });
            member.admin = true;
            await member.save();
            res.json('member is admin Now');
        }
        else {
            res.json("user not Exists");
        }
    }
    catch (err) {
        console.log('err:', err)
        res.status(500).json(err);
    }
}

exports.removeMember = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.body.id } });
        if (user) {
            const member = await GroupMember.findOne({ where: { userId: user.id, groupId: req.params.groupId } });
            await member.destroy();
            res.json('member is Removed');
        }
        else {
            res.json("user not Exists");
        }
    }
    catch (err) {
        console.log('err:', err)
        res.status(500).json(err);
    }
}