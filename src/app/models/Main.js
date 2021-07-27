const db = require('../../config/db');

module.exports = {
  recipes(callback) {
    db.query(`SELECT recipes.*, chefs.author AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },
  show(id, callback) {
    db.query(`SELECT recipes.*, chefs.author AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.id = $1`, [id], (err, results) => {
        if(err) throw `Database Error! ${err}`

        callback(results.rows[0])
      })
  },

  findBy(filter, callback) {
    db.query(`SELECT recipes.*, chefs.author AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE title ILIKE '%${filter}%'`, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },
}