import Todo from './Todo';
import createCard from './cardManipulation';

export default class Store {
  constructor() {
    this.storage = {
      todo: [],
      inProgress: [],
      done: [],
    };
    this.newCard = null;
    this.newBoard = new Todo();
    this.createCard = createCard.bind(this);
  }

  addData(card, chapter) {
    if (chapter === 'TODO') this.storage.todo.push(card);
    if (chapter === 'IN PROGRESS') this.storage.inProgress.push(card);
    if (chapter === 'DONE') this.storage.done.push(card);
  }

  addLocalStorage() {
    localStorage.setItem('taskCards', JSON.stringify(this.storage));
  }

  loadingLocalStorage() {
    const json = localStorage.getItem('taskCards');

    let formData;

    try {
      formData = JSON.parse(json);
    } catch (error) {
      console.log(error);
    }

    if (json === null) {
      const arrColumnSelectors = ['.todo', '.in-progress', '.done'];

      arrColumnSelectors.forEach((selector) => {
        this.newCard = this.createCard('Welcome to Trello!', selector);
      });

      return false;
    }

    Object.keys(formData).forEach((column) => {
      formData[column].forEach((message) => {
        if (column === 'todo') return this.createCard(message, '.todo');
        if (column === 'inProgress') return this.createCard(message, '.in-progress');
        if (column === 'done') return this.createCard(message, '.done');

        return false;
      });
    });
    return false;
  }
}
