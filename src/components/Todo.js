export default class Todo {
  constructor() {
    this.showTextarea = null;
    this.textarea = null;
    this.card = null;
    this.allTextareaOpeningButtons = document.querySelectorAll('.button-icon');
    this.cardList = document.querySelectorAll('.column-cards');
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
        this.cardDisplay(textareaField);
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

  cardDisplay(contentArea) {
    this.card = document.createElement('div');
    this.card.classList.add('card');

    const pContent = document.createElement('p');
    pContent.classList.add('card-message');

    const cardButton = document.createElement('button');
    cardButton.classList.add('card-closure');
    cardButton.classList.add('hide_element');

    const imgClose = document.createElement('img');
    imgClose.setAttribute('src', 'images/close.svg');
    imgClose.setAttribute('alt', 'Close');
    imgClose.classList.add('icon');
    cardButton.insertBefore(imgClose, cardButton.firstElementChild);

    this.card.insertBefore(cardButton, this.card.firstElementChild);
    this.card.insertBefore(pContent, this.card.firstElementChild);

    if (typeof contentArea === 'string') {
      pContent.innerText = contentArea;
      return this.card; // вернуть карточку для localStorage
    }

    pContent.innerText = contentArea.value;
    const wholeBoard = contentArea.closest('.column-boards');
    this.columnCards = wholeBoard.querySelector('.column-cards');
    return this.columnCards.insertAdjacentElement('beforeEnd', this.card);
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
      this.correctionColumnCoordinates();
      this.card.remove();
      this.card = null;
      this.iconClosure = null;
      return false;
      // после удаления элемента данное событие продолджает вызывать 3 раза - почему?
    });

    return false;
  }

  correctionColumnCoordinates() {
    this.columnCards = this.card.closest('.column-cards');

    const { bottom: bottomCard } = this.card.getBoundingClientRect();
    const { bottom: bottomColumn, height: heightColumn } = this.columnCards.getBoundingClientRect();

    if (bottomColumn < bottomCard) {
      this.columnCards.style.height = `${heightColumn + (bottomCard - bottomColumn)}px`;
    }

    if (bottomColumn > bottomCard) {
      this.columnCards.style.height = `${heightColumn - (bottomColumn - bottomCard)}px`;
    }
  }
}
