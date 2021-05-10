// CONTROLE DO BOTAO SHOW/HIDDEN
const recipesHiddens = document.querySelectorAll('.recipe-wrapper');

for(let recipeHidden of recipesHiddens) {
  const buttonHidden = recipeHidden.querySelector('.hidden');

  buttonHidden.addEventListener('click', () => {
    recipeHidden.querySelector('.recipe-wrapper-content').classList.toggle('hidden-active')

    if(buttonHidden.innerHTML == 'ESCONDER') {
      buttonHidden.innerHTML = 'MOSTRAR'
    } else {
      buttonHidden.innerHTML = 'ESCONDER'
    }
  })
}

// CONTROLE DO ACTIVE DO MENU (font-weight: bold;)
const currentPage = location.pathname;
const menuItems = document.querySelectorAll('header .links-menu a');

for(item of menuItems) {
  if(currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active');
  }
}