'use strict';
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const {body, validationResult} = require('express-validator')

router.post('/login', authController.login);
router.post('/register', body('name').isLength({min: 3}).notEmpty().trim().escape(),
    body('username').isEmail().trim().escape(),
    body('password').isLength({min: 8}).matches('(?=.*[A-Z])').trim().escape(),
    (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
      }
      userController.user_create(req, res);
    });

module.exports = router;