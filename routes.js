const express = require('express');
const routes = express.Router();

const main = require('./src/controllers/main');
const recipes = require('./src/controllers/recipes');

// Routes MAIN
routes.get('/', main.index);
routes.get('/about', main.about);
routes.get('/recipes', main.recipes);
routes.get('/recipe/:id', main.recipe);

// Routes ADMIN - RECIPES
routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

// Routes ADMIN - RECIPES - EDITION AND DELETE
routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

module.exports = routes;