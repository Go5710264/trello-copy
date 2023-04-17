import Todo from '../components/Todo';

document.addEventListener('DOMContentLoaded', () => {
  const todoList = new Todo();
  const buttonAddCards = document.querySelectorAll('.button-icon');

  buttonAddCards.forEach((button) => {
    button.addEventListener('click', () => todoList.showInputField(button));
  });

  // Стоит ли использовать всплытие??
  // const mainContainer = document.querySelector('.wrapper-columns-boards');

  // mainContainer.addEventListener('click', (event) => {
  //     debugger
  //     let buttonAddCards = event.target.closest('.button-icon');

  //     if(!buttonAddCards) return;

  //     todoList.showInputField(buttonAddCards);
  // })
});
