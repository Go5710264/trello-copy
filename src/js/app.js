import Todo from '../components/Todo';
import Storage from '../components/Store';

/* На доработку:
Одновременно открыто одно поле textarea
Увеличение размеров колонны при добавлении контента */ 

document.addEventListener('DOMContentLoaded', () => {

  const objStorage = new Storage();
  objStorage.loadingLocalStorage();

  const todoList = new Todo();
  const buttonAddCards = document.querySelectorAll('.button-icon');
  const cardList = document.querySelectorAll('.column-cards');

  buttonAddCards.forEach((button) => {
    button.addEventListener('click', () => todoList.showInputField(button));
  });

  cardList.forEach((column) => {
    column.addEventListener('mouseover', todoList.showClosingIcon);
  });
});

window.addEventListener('beforeunload', () => { // как в devtools выполнить данное событие
  const objStorage = new Storage();
  const allCards = Array.from(document.querySelectorAll('.card'));
  const cardsWithoutAds = allCards.filter((card) => !card.classList.contains('advertisement'))

  if(cardsWithoutAds.length === 0) {
    localStorage.removeItem('taskCards');
    return false;
  }

  cardsWithoutAds.forEach(card => {

    if (card.classList.contains('advertisement')) return false;
    const header = card.closest('.column-boards').firstElementChild.firstElementChild.innerText;
    const content = card.firstElementChild.textContent;
    objStorage.addData(content, header);

  });

  objStorage.addLocalStorage();
});
