const { date } = require('../../lib/utils');
const db = require('../../config/db');

module.exports = {
  index(callback) {
    db.query(`SELECT * FROM chefs ORDER BY author ASC`, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },
  post(data, callback) {
    const query = `
      INSERT INTO chefs (
        author,
        avatar_url,
        created_at
      ) VALUES ($1, $2, $3)
      RETURNING id
    `

    const values = [
      data.author,
      data.avatar_url,
      date(Date.now()).iso
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error! ${err}`
      
      callback(results.rows[0])
    })
  },
  show(id, callback) {
    db.query(`SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      WHERE chefs.id = $1
      GROUP BY chefs.id`, [id], (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows[0])
    })
  },
  showRecipe(id, callback) {
    db.query(`SELECT recipes.* FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE chefs.id = $1`, [id], (err, results) => {
        if(err) throw `Database Error! ${err}`

        callback(results.rows)
      })
  },
  put(data, callback) {
    const query = `
      UPDATE chefs SET
        author=($1),
        avatar_url=($2)
        WHERE id = $3
    `

    const values = [
      data.author,
      data.avatar_url,
      data.id
    ]

    db.query(query, values, (err) => {
      if(err) throw `Database Error! ${err}`

      callback()
    })
  },
  delete(id, callback) {
    db.query(`DELETE FROM chefs WHERE id = $1`, [id], (err) => {
      if(err) throw `Database Error ${err}`

      callback()
    })
  }
}