import Todo from './Todo';
import createCard from './cardManipulation';

export default class DragAndDrop {
  constructor() {
    this.card = null;
    this.copyElement = null;
    this.shiftX = null;
    this.shiftY = null;
    this.clientY = null;
    this.todo = new Todo();
    this.createCard = createCard.bind(this);
    this.columnCards = null;
  }

  onMouseDown(event) {
    event.preventDefault();

    this.card = event.target.closest('.card');
    this.card.classList.add('dragged');

    this.columnCards = this.card.closest('.column-cards');
    const nameColumns = this.columnCards.className.split(' ');
    if (this.columnCards.children.length === 1) this.createCard('Welcome to Trello!', `.${nameColumns[1]}`);

    this.shiftX = event.offsetX;
    this.shiftY = event.offsetY;

    this.card.style = `
            left: ${event.pageX - this.shiftX}px;
            top: ${event.pageY - this.shiftY}px;
        `;
    this.insertingElement(event);
  }

  insertingElement() {
    if (!this.deepElement) return false;

    this.deepElement = this.deepElement.closest('.card');

    if (this.deepElement) {
      const { y, height } = this.deepElement.getBoundingClientRect();

      const appendPosition = y + height / 2 > this.clientY
        ? 'beforebegin'
        : 'afterend';

      if (!this.copyElement) {
        this.copyElement = this.proection();
        this.todo.card = this.copyElement;
      }
      this.deepElement.insertAdjacentElement(appendPosition, this.copyElement);
      this.todo.correctionColumnCoordinates();
    }
    return false;
  }

  onMouseUp = () => {
    if (this.card) {
      this.copyElement.replaceWith(this.card);

      this.card.style = '';
      this.card.classList.remove('dragged');

      this.card = null;
      this.copyElement = null;

      this.todo.cardList.forEach((board) => {
        this.todo.columnCards = board;
        this.todo.lastElement = this.todo.columnCards.lastElementChild;
        this.todo.correctionColumnCoordinates();
      });

      this.todo.columnCards = null;
      this.todo.card = null;
      this.deepElement = null;
    }
  };

  onMouseMove = (event) => {
    if (this.card) {
      this.clientY = event.clientY;
      const { pageX, pageY } = event;

      this.card.style = `
        position: absolute;
        left: ${pageX - this.shiftX}px;
        top: ${pageY - this.shiftY}px;
      `;

      this.deepElement = document.elementFromPoint(event.clientX, event.clientY);

      this.insertingElement(event.target);
    }
  };

  proection() {
    return (() => {
      const elem = document.createElement('div');
      elem.classList.add('copyElement');
      const { width, height } = this.card.getBoundingClientRect();
      elem.style.cssText = `
                width: ${width}px;
                height: ${height}px;
                margin-bottom: 5px; 
                opacity: 0;
            `;
      return elem;
    })();
  }
}
