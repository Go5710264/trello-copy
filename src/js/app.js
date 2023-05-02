import Todo from '../components/Todo';
import Storage from '../components/Store';
import DragAndDrop from '../components/DragAndDrop';

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
    if (e.target.closest('.card') && !e.target.closest('.card-closure')) transferElement.onMouseDown(e);
  });

  main.addEventListener('mousemove', transferElement.onMouseMove);
  main.addEventListener('mouseup', transferElement.onMouseUp);
  main.addEventListener('mouseover', transferElement.onMouseOver);
});

window.addEventListener('beforeunload', () => {
  const objStorage = new Storage();
  const allCards = document.querySelectorAll('.card');
  const cardsWithoutAds = Array.from(allCards).filter((card) => !card.classList.contains('advertisement'));

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
