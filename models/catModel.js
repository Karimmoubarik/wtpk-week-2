'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query('SELECT wop_cat.*, wop_user.name AS ownername FROM `wop_cat` INNER JOIN wop_user ON wop_cat.owner = wop_user.id');
    return rows;
  } catch (e) {
    console.error('catModel:', e.message);
  }
};

const getCat = async (id) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    console.log('catModel getCat', id);
    const [rows] = await promisePool.query('SELECT * FROM wop_cat WHERE id = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error('catModel:', e.message);
  }
};

const insertCat = async (req) => {
  try {
    const [rows] = await promisePool.query('INSERT INTO wop_cat (name, age, weight, owner, filename) VALUES (?, ?, ?, ?, ?);',
        [req.body.name, req.body.age, req.body.weight, req.body.owner, req.file.filename]);
    console.log('catModel insert:', rows);
    return rows.insertId;
  } catch (e) {
    console.error('catModel insertCat:', e);
    return 0;
  }
};

const updateCat = async (id, req) => {
  try {
    const [rows] = await promisePool.query('UPDATE wop_cat SET name = ?, age = ?, weight = ?, owner = ? WHERE id = ?;',
        [req.body.name, req.body.age, req.body.weight, req.body.owner, id]);
    console.log('catModel update:', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    return false;
  }
};

//TODO: delete function. Consider no return needed? just best effort...

module.exports = {
  getAllCats,
  getCat,
  insertCat,
  updateCat
};