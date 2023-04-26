import Todo from '../components/Todo';
import Storage from '../components/Store';
import DragAndDrop from '../components/DragAndDrop';

/* На доработку:
При множестве нажитии на закрытие текстЭриа появляется ошибка в консоле
 */

document.addEventListener('DOMContentLoaded', () => {
  const objStorage = new Storage();
  objStorage.loadingLocalStorage();

  const todoList = new Todo();
  const transferElement = new DragAndDrop();
  const main = document.querySelector('main');

  main.addEventListener('click', (event) => {
    if (event.target.closest('.footer-block-card')) todoList.showInputField(event);
    return false;
  });

  todoList.cardList.forEach((column) => {
    column.addEventListener('mouseover', (event) => todoList.showClosingIcon('over', event));
    column.addEventListener('mouseout', (event) => todoList.showClosingIcon('out', event));
  });



  main.addEventListener('mousedown', (e) => {
    e.preventDefault();
    if(e.target.closest('.card')) transferElement.onMouseDown(e)
  })

  main.addEventListener('mousemove', transferElement.onMouseMove);
  main.addEventListener('mouseup', transferElement.onMouseUp);

});

window.addEventListener('beforeunload', () => { // как в devtools выполнить данное событие
  const objStorage = new Storage();
  const allCards = Array.from(document.querySelectorAll('.card'));
  const cardsWithoutAds = allCards.filter((card) => !card.classList.contains('advertisement'));

  if (cardsWithoutAds.length === 0) {
    localStorage.removeItem('taskCards');
    return false;
  }

  cardsWithoutAds.forEach((card) => {
    if (card.classList.contains('advertisement')) return false;
    const header = card.closest('.column-boards').firstElementChild.firstElementChild.innerText;
    const content = card.firstElementChild.textContent;
    return objStorage.addData(content, header);
  });

  return objStorage.addLocalStorage();
});
