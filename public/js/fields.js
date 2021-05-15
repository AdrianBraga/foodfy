// ADD NEW INPUT
const addIngredients = document.querySelector('.add-ingredient');
const addPreparation = document.querySelector('.add-preparation');

function addInputs(idDiv, classContainer) {
  var id = document.querySelector(idDiv);
  const fieldContainer = document.querySelectorAll(classContainer);

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if(newField.children[0].value == '') return false;

  newField.children[0].value = '';
  id.appendChild(newField);
}

addIngredients.addEventListener('click', () => {
  addInputs('#ingredients', '.ingredients')
});
addPreparation.addEventListener('click', () => {
  addInputs('#preparation', '.preparation')
});

// REMOVE INPUT
const deleteIngredients = document.querySelector('.delete-ingredient');
const deletePreparation = document.querySelector('.delete-preparation');

function RemoveInputs(idDiv, classContainer) {
  var id = document.querySelector(idDiv);
  const fieldContainer = document.querySelectorAll(classContainer);

  const newField = fieldContainer[fieldContainer.length - 1];

  if(newField.children.lenght > 1) {
    if(newField.children[0].value == '') return false;
  } else {
    id.removeChild(newField);
  }
}

deleteIngredients.addEventListener('click', () => {
  RemoveInputs('#ingredients', '.ingredients')
});
deletePreparation.addEventListener('click', () => {
  RemoveInputs('#preparation', '.preparation')
});

