import Todo from './Todo';

export default class DragAndDrop {
  constructor() {
    this.card = null;
    this.copyElement = null;
    this.shiftX = null;
    this.shiftY = null;
    this.clientY = null;
    this.todo = new Todo();
  }

  onMouseDown(event) {
    event.preventDefault();

    this.card = event.target.closest('.card');
    this.card.classList.add('dragged');

    this.shiftX = event.offsetX;
    this.shiftY = event.offsetY;

    this.card.style = `
            left: ${event.pageX - this.shiftX}px;
            top: ${event.pageY - this.shiftY}px;
        `;
    this.insertingElement(event);
  }

  insertingElement(event) {
    const target = event.closest('.card');

    if (target) {
      const { y, height } = target.getBoundingClientRect();

      const appendPosition = y + height / 2 > this.clientY
        ? 'beforebegin'
        : 'afterend';

      if (!this.copyElement) {
        this.copyElement = this.proection();
        this.todo.card = this.copyElement;
      } else {
        target.insertAdjacentElement(appendPosition, this.copyElement);
        this.todo.correctionColumnCoordinates();
      }
    }
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
    }
  };

  onMouseMove = (event) => {
    if (this.card) {
      this.clientY = event.clientY;
      const { pageX, pageY } = event;
      const element = this.card;

      element.style = `
                position: absolute;
                left: ${pageX - this.shiftX}px;
                top: ${pageY - this.shiftY}px;
                pointer-events: none;
            `;

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
