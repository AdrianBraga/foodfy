const express = require('express');
const routes = express.Router();

const data = require('./data.json');

routes.get('/', function(req, res) {
  return res.render('index', { recipes: data.recipes })
});

routes.get('/about', function(req, res) {
  return res.render('about')
});

routes.get('/recipes', function(req, res) {
  return res.render('recipes', { recipes: data.recipes })
});

routes.get('/recipe/:id', function(req, res) {
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

  return res.render('recipe', { recipe })
});

module.exports = routes;
