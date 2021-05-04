const recipesHiddens = document.querySelectorAll('.recipe-hidden');

for(let recipeHidden of recipesHiddens) {
  const buttonHidden = recipeHidden.querySelector('.button-hidden');

  buttonHidden.addEventListener('click', () => {
    recipeHidden.querySelector('.content-hidden').classList.toggle('hidden-active')

    if(buttonHidden.innerHTML == 'ESCONDER') {
      buttonHidden.innerHTML = 'MOSTRAR'
    } else {
      buttonHidden.innerHTML = 'ESCONDER'
    }
  })
}