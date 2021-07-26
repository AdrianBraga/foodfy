const { date } = require('../../lib/utils');

const Chef = require('../models/Chef');

module.exports = {
  index(req, res) {
   Chef.index((chefs) => {
    return res.render('admin/chefs/index', { chefs })
   })
  },
  create(req, res) {
    return res.render('admin/chefs/create')
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '') return res.send('Erro! Por favor preencha todos os campos')
    };

    Chef.post(req.body, () => {
      return res.redirect(`/admin/chefs`)
    })
  },
  show(req, res) {
    Chef.show(req.params.id, (chef) => {
      Chef.showRecipe(req.params.id, (recipes) => {
        if(!chef) return res.send('Chef não encontrado!!!')
        
        return res.render(`admin/chefs/show`, { chef, recipes })
      })
    })
  },
  edit(req, res) {
    Chef.show(req.params.id, (chef) => {
      if(!chef) return res.send('Chef não encontrado!!!')

      chef.created_at = date(chef.created_at).format

      return res.render(`admin/chefs/edit`, { chef })
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
      if(req.body[key] == '') return res.send('Erro! Por favor preencha todos os campos')
    };

    Chef.put(req.body, () => {
      return res.redirect(`/admin/chefs/${req.body.id}`)
    })
  },
  delete(req, res) {
    Chef.delete(req.body.id, () => {
      return res.redirect('/admin/chefs')
    })
  }
}