const User = require('../models/user');

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save()
        res.status(201).send(user)
    }catch (err) {
        res.status(400).send(err);
    }
}

exports.GetAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).send({message: 'User not found'})

        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err);


    }
}
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
        if (!user){
            res.status(404).send({message: 'User not found'})
        }
        res.status(200).send(user)
    }catch (err) {
        res.status(500).send(err)
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            res.status(404).send({message: 'User not Found'})
        }
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
}