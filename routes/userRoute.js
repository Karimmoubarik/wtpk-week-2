'use strict';
// userRoute
const express = require('express');
const userController = require('../controllers/userController');
const {body, validationResult} = require('express-validator')
const router = express.Router();

router.get('/', userController.user_list_get);
router.post('/', body('name').isLength({min: 3}).notEmpty().trim().escape(),
    body('email').isEmail().trim().escape(),
    body('password').isLength({min: 8}).matches('(?=.*[A-Z])').trim().escape(),
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return res.status(400).json({errors: errors.array()})
        }
        userController.user_create(req, res);
    });

router.get('/:id', userController.user_get_by_id);
router.put('/:id', userController.user_update);
router.delete('/:id', userController.user_delete);

module.exports = router;