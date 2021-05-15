const fs = require('fs');

const data = require('../../data.json');

// INDEX
exports.index = function(req, res) {
  return res.render('admin/recipes/index', { recipes: data.recipes });
}

// CREATE
exports.create = function(req, res) {
  return res.render('admin/recipes/create')
}

// POST
exports.post = function(req, res) {
  const keys = Object.keys(req.body);

  for(key of keys) {
    if(req.body[key] == '') return res.send('Erro, por favor preencha todos os campos!')
  }

  let { author, title, image, ingredients, preparation, information } = req.body;

  const id = Number(data.recipes.length + 1);

  data.recipes.push({
    id,
    author,
    title, 
    image, 
    ingredients, 
    preparation, 
    information
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Error, Falha na escrita dos dados!');

    return res.redirect('/admin/recipes');
  })
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
    ...foundId
  }

  return res.render('admin/recipes/show', { recipe })
}

// EDIT
exports.edit = function(req, res) {
  const { id } = req.params;

  const foundId = data.recipes.find((recipes) => {
    return recipes.id == id;
  });

  if(!foundId) {
    return res.send('Receita não encontrada!')
  }

  const recipe = {
    ...foundId
  }

  return res.render('admin/recipes/edit', { recipe })
}

// PUT
exports.put = function(req, res) {
  const { id } = req.body;

  let index = 0;

  const foundRecipe = data.recipes.find((recipe, foundIndex) => {
    if(id == recipe.id) {
      index = foundIndex
      return true;
    }
  });

  if(!foundRecipe) {
    return res.send('Receita não encontrada!')
  }

  const recipe = {
    ...foundRecipe,
    ...req.body
  }

  data.recipes[index] = recipe;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Error, Falha na escrita dos dados!');

    return res.redirect(`/admin/recipes/${id}`)
  })
}

// DELETE
exports.delete = function(req, res) {
  const { id } = req.body;

  const filterRecipes = data.recipes.filter((recipe) => {
    return recipe.id != id;
  });

  data.recipes = filterRecipes;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send('write Error!')

    return res.redirect('/admin/recipes')
  })
}