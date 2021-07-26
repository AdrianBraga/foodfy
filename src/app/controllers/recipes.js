const { date } = require('../../lib/utils');

const Recipe = require('../models/Recipe');

module.exports = {
  index(req, res) {
    Recipe.index((recipes) => {
      return res.render('admin/recipes/index', { recipes })
    })
  },
  create(req, res) {
    Recipe.chefSelectedOptions((options) => {
      return res.render('admin/recipes/create', { chefOptions: options })
    })
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
    Recipe.show(req.params.id, (recipe) => {
      if(!recipe) return res.send('Receita não encontrada!!!')

      return res.render(`admin/recipes/show`, { recipe })
    })
  },
  edit(req, res) {
    Recipe.show(req.params.id, (recipe) => {
      Recipe.chefSelectedOptions((options) => {
        if(!recipe) return res.send('Receita não encontrada!!!')

        return res.render(`admin/recipes/edit`, { recipe, chefOptions: options })
      })
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '') return res.send('Erro! Por favor preencha todos os campos')
    };

    Recipe.put(req.body, () => {
      return res.redirect(`/admin/recipes/${req.body.id}`)
    })
  },
  delete(req, res) {
    Recipe.delete(req.body.id, () => {
      return res.redirect('/admin/recipes')
    })
  }
}