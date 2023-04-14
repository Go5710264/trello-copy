import Todo from "../components/Todo";

document.addEventListener('DOMContentLoaded', () => {
    const buttonAddCards = document.querySelectorAll('.button-icon');
    const todoList = new Todo();

    buttonAddCards.forEach(item => item.addEventListener('click', todoList.addTask));
});
