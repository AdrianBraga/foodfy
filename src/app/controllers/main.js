const Main = require('../models/Main');

module.exports = {
  index(req, res) {
    Main.recipes((recipes) => {
      return res.render('main/index', { recipes })
    })
  },
  about(req, res) {
    return res.render('main/about')
  },
  recipes(req, res) {
    Main.recipes((recipes) => {
      return res.render('main/recipes', { recipes })
    })
  },
  show(req, res) {
    Main.show(req.params.id, (recipe) => {
      if(!recipe) return res.send('Receita não encontrada!!!')

      return res.render(`main/recipe`, { recipe })
    })
  }
}