const cardsRecipe = document.querySelectorAll('.card-recipe');
const modal = document.querySelector('.modal-container');
const closeModal = document.querySelector('.close-modal')

for(let cardRecipe of cardsRecipe) {
  cardRecipe.addEventListener('click', () => {
    modal.classList.add('active');
  });
};

closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
});


