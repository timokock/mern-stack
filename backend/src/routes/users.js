const { Router } = require('express')
const router = Router()
const userController = require('../controllers/users.controller')


router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser)

router.route('/:id')
    .delete(userController.deleteUser)

module.exports = router