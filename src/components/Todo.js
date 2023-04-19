export default class Todo {
  constructor() {
    this.showTextarea = null;
    this.textarea = null;
    this.card = null;
  }

  showInputField(element) {
    this.showTextarea = element.parentElement;
    this.textarea = element.parentElement.parentElement.firstElementChild;

    this.showTextarea.classList.add('hide_element');
    this.showTextarea.classList.remove('footer-block-card');

    this.textarea.classList.add('show_element');
    this.textarea.classList.remove('hide_element');

    this.cardFormation();
  }

  cardFormation() {
    const textareaField = this.textarea.querySelector('.task-input-field');

    textareaField.addEventListener('keyup', () => {
      textareaField.style.height = '0px';
      textareaField.style.height = `${textareaField.scrollHeight}px`;
    });

    this.textarea.addEventListener('click', (event) => {
      const buttonClose = event.target;

      if (buttonClose.classList.contains('footer-button-add-card')
            || buttonClose.classList.contains('click-add-card-close')) {
        if (buttonClose.classList.contains('footer-button-add-card')) {
          if (textareaField.value === '') return false; // эта строчка как необоходимость.
          // Так как все последующие карточки, после добавления первой,
          // вызывают событие клика повторно,
          // что с этим делать и как это исправить? загружает ивентлуп

          this.cardDisplay(textareaField);
        }

        this.textarea = buttonClose.closest('.show_element');
        textareaField.value = '';
        this.textarea.classList.remove('show_element');
        this.textarea.classList.add('hide_element');

        this.showTextarea = buttonClose.closest('footer').lastElementChild;
        this.showTextarea.classList.remove('hide_element');
        this.showTextarea.classList.add('footer-block-card');
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

    pContent.innerText = contentArea.value;
    pContent.innerText.trim();
    const wholeBoard = contentArea.closest('.column-boards');
    const columnCards = wholeBoard.querySelector('.column-cards');
    return columnCards.insertAdjacentElement('beforeEnd', this.card);
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

    const iconClosure = this.card.querySelector('.card-closure');

    iconClosure.addEventListener('click', () => this.card.remove());
    return false;
  }
}
