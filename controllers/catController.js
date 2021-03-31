'use strict';

const catModel = require('../models/catModel');

const cats = catModel.cats;

const cat_list_get = async (req, res) => {
  console.log('get all cats from controllers', req.query);
  if (req.query.sort === 'age') {
    const cats = await catModel.getAllCatsSort()
    res.json(cats);
    return;
  }
  const cats = await catModel.getAllCats()
  res.json(cats);
};

const cat_get_by_id = (req, res) => {
  console.log('get one cat by id', req.params);
  res.json(cats.find(cat => cat.id === req.params.id));
};

const cat_add = (req, res) => {
  console.log('Adding a cat', req.body);

  res.send(`post cat ${req.body.name}`)
}

module.exports = {
  cat_list_get,
  cat_get_by_id,
  cat_add,
};
