const data = require('../../data.json');

// INDEX
exports.index = function(req, res) {
  return res.render('admin/recipes/index', { recipes: data.recipes });
}

// SHOW
exports.show = function(req, res) {
  const { id } = req.params;

  const foundId = data.recipes.find((recipes) => {
    return recipes.id == id;
  });

  if(!foundId) {
    return res.send('Receita não encontrada!')
  }

  const recipe = {
    ...foundId,
    id: foundId
  }

  return res.render('admin/recipes/show', { recipe })
}