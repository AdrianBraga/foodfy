const { date } = require('../../lib/utils');
const db = require('../../config/db');

module.exports = {
  index(callback) {
    db.query(`SELECT recipes.*, chefs.author AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },

  post(data, callback) {
    const query = `
      INSERT INTO recipes (
        chef_id,
        image,
        title,
        ingredients,
        preparation,
        information,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.chef,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error! ${err}`
      
      callback(results.rows[0])
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

  put(data, callback) {
    const query = `
      UPDATE recipes SET
        chef_id=($1),
        image=($2),
        title=($3),
        ingredients=($4),
        preparation=($5),
        information=($6)
        WHERE id = $7
    `

    const values = [
      data.chef,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id
    ]

    db.query(query, values, (err) => {
      if(err) throw `Database Error! ${err}`

      callback()
    })
  },

  delete(id, callback) {
    db.query(`DELETE FROM recipes WHERE id = $1`, [id], (err) => {
      if(err) throw `Database Error ${err}`

      callback()
    })
  },

  chefSelectedOptions(callback) {
    db.query(`SELECT author, id FROM chefs`, (err, results) => {
      if(err) throw `Database Error ${err}`

      callback(results.rows)
    })
  }
}