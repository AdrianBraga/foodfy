const data = require('../../data.json');

// INDEX
exports.index = function(req, res) {
  return res.render('main/index', { recipes: data.recipes })
}
// ABOUT
exports.about = function(req, res) {
  return res.render('main/about')
}
// RECIPES
exports.recipes = function(req, res) {
  return res.render('main/recipes', { recipes: data.recipes })
}
// RECIPE
exports.recipe = function(req, res) {
  const { id } = req.params;

  const foundId = data.recipes.find((recipes) => {
    return recipes.id == id
  })

  if(!foundId) {
    return res.send('Receita não encontrada!')
  }

  const recipe = {
    ...foundId,
    id: foundId
  }

  return res.render('main/recipe', { recipe })
}