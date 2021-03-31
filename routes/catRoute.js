'use strict';
// catRoute
const express = require('express');
const multer  = require('multer');
const catController = require('../controllers/catController');
const router = express.Router();
const upload = multer({ dest: 'uploads' });
const {body, validationResult} = require('express-validator');

router.get('/', catController.cat_list_get);
router.post('/', upload.single('cat'),  body('name').notEmpty().trim().escape(),
    body('age').notEmpty().isNumeric().trim().escape(),
    body('weight').notEmpty().isNumeric().trim().escape(),
    body('owner').notEmpty(),
    body('cat').custom((value, {req}) => {
      console.log(req.file.mimetype.startsWith("image/"));
      if(req.file.mimetype.startsWith("image/")){
        return "image/*";
      } else {
        return false;
      }
    }),
    (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
      }
      catController.cat_create(req, res);
});

router.get('/:id', catController.cat_get_by_id);
router.put('/:id', body('name').notEmpty().trim().escape(),
    body('age').notEmpty().isNumeric().trim().escape(),
    body('weight').notEmpty().isNumeric().trim().escape(),
    body('owner').notEmpty(),
    (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
      }
      console.log(req.body.owner);
      catController.cat_update(req, res);
    });
router.delete('/:id', catController.cat_delete);

module.exports = router;