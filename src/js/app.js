import Todo from '../components/Todo';
import Storage from '../components/Store';

/* На доработку:
При множестве нажитии на закрытие текстЭриа появляется ошибка в консоле
 */

document.addEventListener('DOMContentLoaded', () => {
  const objStorage = new Storage();
  objStorage.loadingLocalStorage();

  const todoList = new Todo();
  const main = document.querySelector('main');

  main.addEventListener('click', (event) => {
    console.log(event);
    if (event.target.closest('.footer-block-card')) todoList.showInputField();
    return false;
  });

  todoList.cardList.forEach((column) => {
    column.addEventListener('mouseover', () => todoList.showClosingIcon('over'));
    column.addEventListener('mouseout', () => todoList.showClosingIcon('out'));
  });
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
