export default class Todo {
  constructor() {
    this.showTextarea = null;
    this.textarea = null;
    this.card = null;
    this.allTextareaOpeningButtons = document.querySelectorAll('.button-icon');
    this.cardList = document.querySelectorAll('.column-cards');
    this.columnCards = null;
    this.iconClosure = null;
  }

  showInputField(element) {
    this.allTextareaOpeningButtons.forEach((button) => {
      if (button === element) return false;

      this.showTextarea = button.parentElement;
      this.textarea = button.parentElement.parentElement.firstElementChild;

      return this.hideTextField('footer-block-card', 'hide_element', 'show_element');
    });

    this.showTextarea = element.parentElement;
    this.textarea = element.parentElement.parentElement.firstElementChild;

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
      textareaField.style.height = '';

      const buttonClose = event.target;
      textareaField.value = textareaField.value.trim();

      if (buttonClose.classList.contains('footer-button-add-card')
            || buttonClose.classList.contains('click-add-card-close')) {
        if (buttonClose.classList.contains('footer-button-add-card')) {
          if (textareaField.value === '') {
            return false; // эта строчка как необоходимость.
            // Так как все последующие карточки, после добавления первой,
            // вызывают событие клика повторно,
            // что с этим делать и как это исправить? загружает ивентлуп
          }

          this.cardDisplay(textareaField);

          this.correctionColumnCoordinates();
        }

        this.textarea = buttonClose.closest('.show_element');
        textareaField.value = '';
        this.showTextarea = buttonClose.closest('footer').lastElementChild;

        this.hideTextField('footer-block-card', 'hide_element', 'show_element');

        return false;
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

    // pContent.innerText = contentArea.value.trim();
    pContent.innerText = contentArea.value;
    const wholeBoard = contentArea.closest('.column-boards');
    this.columnCards = wholeBoard.querySelector('.column-cards');
    return this.columnCards.insertAdjacentElement('beforeEnd', this.card);
  }

  showClosingIcon(event) {
    this.card = event.target.closest('.card');

    if (!this.card) return false;

    this.card.querySelector('.card-closure').classList.remove('hide_element');
    this.card.querySelector('.card-closure').classList.add('flex_element');

    this.card.addEventListener('mouseout', () => {
      this.card.querySelector('.card-closure').classList.add('hide_element');
      this.card.querySelector('.card-closure').classList.remove('flex_element');
    });

    this.iconClosure = this.card.querySelector('.card-closure');

    this.iconClosure.addEventListener('click', () => {
      this.card.remove();

      this.correctionColumnCoordinates();
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
