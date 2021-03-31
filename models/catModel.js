'use strict';
'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query('SELECT * FROM wop_cat');
    console.log(rows)
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getAllCatsSort = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query('SELECT * FROM wop_cat ORDER BY age');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const addCat = async () => {
  const [rows] = await promisePool.query("INSERT INTO wop_cat WHERE name=?, age=?")
}

module.exports = {
  getAllCats,
  getAllCatsSort,
};
