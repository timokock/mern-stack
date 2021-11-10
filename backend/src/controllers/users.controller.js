const userCtrl = {}

const User = require('../models/User')

userCtrl.getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
}

userCtrl.createUser = async (req, res) => {
    const { username } = req.body
    const newUser = new User({
        username
    })
    await newUser.save()
    res.json('User created')
}

userCtrl.deleteUser = async (req, res) => {
    const userId = req.params.id
    await User.findByIdAndDelete(userId)
    res.json('User deleted')
}

module.exports = userCtrl