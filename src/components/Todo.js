import createCard, { cardDisplay } from './cardManipulation';

export default class Todo {
  constructor() {
    this.showTextarea = null;
    this.textarea = null;
    this.card = null;
    this.lastElement = null;
    this.cardList = document.querySelectorAll('.column-cards');

    this.createCard = createCard.bind(this);
    this.cardDisplay = cardDisplay.bind(this);

    this.columnCards = null;
    this.iconClosure = null;
    this.arrayTextareaDisplayIcon = Array.from(document.querySelectorAll('.footer-block-card'));
  }

  showInputField(event) {
    const textareaDisplayIcon = event.target.closest('.footer-block-card');

    this.arrayTextareaDisplayIcon.forEach((icon) => {
      if (icon === textareaDisplayIcon) return false;

      this.showTextarea = icon;
      this.textarea = icon.previousElementSibling;

      return this.hideTextField('footer-block-card', 'hide_element', 'show_element');
    });

    this.showTextarea = textareaDisplayIcon;
    this.textarea = textareaDisplayIcon.previousElementSibling;

    this.hideTextField('hide_element', 'footer-block-card', 'show_element');

    this.cardFormation();
  }

  hideTextField(firstSelector, secondSelector, thirdSelector) {
    this.showTextarea.classList.add(firstSelector);
    this.showTextarea.classList.remove(secondSelector);

    if (secondSelector === 'hide_element') {
      this.textarea.classList.add(secondSelector);
      this.textarea.classList.remove(thirdSelector);
      return false;
    }

    this.textarea.classList.add(thirdSelector);
    this.textarea.classList.remove(firstSelector);
    return false;
  }

  cardFormation() {
    const textareaField = this.textarea.querySelector('.task-input-field');

    textareaField.addEventListener('keyup', () => {
      textareaField.style.height = '0px';
      textareaField.style.height = `${textareaField.scrollHeight}px`;
    });

    this.textarea.addEventListener('click', (event) => {
      const buttonClose = event.target;

      textareaField.style.height = '';
      textareaField.value = textareaField.value.trim();

      if (buttonClose.classList.contains('footer-button-add-card') && textareaField.value === '') return false;

      if (buttonClose.classList.contains('footer-button-add-card')) {
        this.card = this.cardDisplay(textareaField);
        this.correctionColumnCoordinates();
      }

      if (buttonClose.classList.contains('footer-button-add-card') || buttonClose.classList.contains('click-add-card-close')) {
        textareaField.value = '';

        this.textarea = buttonClose.closest('.show_element');
        this.showTextarea = buttonClose.closest('footer').lastElementChild;

        return this.hideTextField('footer-block-card', 'hide_element', 'show_element');
      }

      return false;
    });
  }

  showClosingIcon(arg, event) {
    if (!event.target.closest('.card')) return false;

    this.card = event.target.closest('.card');

    if (arg === 'out') {
      this.card.querySelector('.card-closure').classList.add('hide_element');
      this.card.querySelector('.card-closure').classList.remove('flex_element');
      return false;
    }

    this.card.querySelector('.card-closure').classList.remove('hide_element');
    this.card.querySelector('.card-closure').classList.add('flex_element');

    this.iconClosure = this.card.querySelector('.card-closure');

    this.iconClosure.addEventListener('click', () => {
      if (this.card === null) return false;

      this.columnCards = this.card.closest('.column-cards');
      this.card.remove();

      const nameColumns = this.columnCards.className.split(' ');
      if (this.columnCards.children.length === 0) {
        this.createCard('Welcome to Trello!', `.${nameColumns[1]}`);
      } else {
        this.lastElement = this.columnCards.lastElementChild;
        this.correctionColumnCoordinates();
      }

      this.lastElement = null;
      this.card = null;
      this.iconClosure = null;
      return false;
    });

    return false;
  }

  correctionColumnCoordinates() {
    if (!this.lastElement) {
      this.columnCards = this.card.closest('.column-cards');
      this.lastElement = this.columnCards.lastElementChild;
    }

    const { bottom: bottomCard } = this.lastElement.getBoundingClientRect();
    const { bottom: bottomColumn, height: heightColumn } = this.columnCards.getBoundingClientRect();

    if (bottomColumn < bottomCard) {
      this.columnCards.style.height = `${heightColumn + (bottomCard - bottomColumn)}px`;
    }

    if (bottomColumn > bottomCard) {
      this.columnCards.style.height = `${heightColumn - (bottomColumn - bottomCard)}px`;
    }

    this.lastElement = null;
  }
}
