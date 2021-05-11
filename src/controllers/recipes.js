const data = require('../../data.json');

// INDEX
exports.index = function(req, res) {
  return res.render('admin/recipes/index', { recipes: data.recipes });
}