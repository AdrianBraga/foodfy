const Recipe = require('../models/Recipe');

module.exports = {
  index(req, res) {
    Recipe.index((recipe) => {
      return res.render('admin/recipes/index', { recipe })
    })
  },
  create(req, res) {
    return res.render('admin/recipes/create')
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '') return res.send('Erro! Por favor preencha todos os campos')
    };

    Recipe.post(req.body, (recipe) => {
      return res.redirect(`/admin/recipes/${recipe.id}`)
    })
  },
  show(req, res) {
    return;
  },
  delete(req, res) {
    Recipe.delete(req.body.id, () => {
      return res.redirect('/admin/recipes')
    })
  }
}