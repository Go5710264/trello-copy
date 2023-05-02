export function cardDisplay(contentArea) {
  const card = document.createElement('div');
  card.classList.add('card');

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

  card.insertBefore(cardButton, card.firstElementChild);
  card.insertBefore(pContent, card.firstElementChild);

  if (typeof contentArea === 'string') {
    pContent.innerText = contentArea;
    return card;
  }

  pContent.innerText = contentArea.value;
  const wholeBoard = contentArea.closest('.column-boards');
  const columnCards = wholeBoard.querySelector('.column-cards');
  columnCards.insertAdjacentElement('beforeEnd', card);
  return card;
}

export default function createCard(message, selector) {
  const newCard = cardDisplay(message);
  const elem = document.querySelector(selector);
  elem.insertAdjacentElement('beforeEnd', newCard);

  if (message === 'Welcome to Trello!') {
    elem.style = 'height: 150px;';
    return false;
  }

  return newCard;
}
