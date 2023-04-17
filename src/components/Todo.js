export default class Todo{
    constructor(){
        this.boardTask = [];
        this.showTextarea;
        this.textarea;

    }

    showInputField(element){
        this.showTextarea = element.parentElement; // кнопка открытия поля
        this.textarea = element.parentElement.parentElement.firstElementChild;
        // само поле ввода

        this.showTextarea.classList.add('hide_element');
        this.showTextarea.classList.remove('footer-block-card');

        this.textarea.classList.add('show_element');
        this.textarea.classList.remove('hide_element');

        this.cardFormation();
    }

    cardFormation(){
        const textArea = this.textarea.querySelector('.task-input-field');

        textArea.addEventListener('keyup', () => {
            textArea.style.height = '0px';
            textArea.style.height = textArea.scrollHeight + 'px';
        })
        
        this.textarea.addEventListener('click', (event) => {
            let buttonClose = event.target;

            if(buttonClose.classList.contains('footer-button-add-card') 
            || buttonClose.classList.contains('click-add-card-close')){

                if(buttonClose.classList.contains('footer-button-add-card')) this.cardDisplay(textArea);

                this.textarea = buttonClose.closest('.show_element');
                this.textarea.classList.remove('show_element');
                this.textarea.classList.add('hide_element');

                this.showTextarea = buttonClose.closest('footer').lastElementChild;
                this.showTextarea.classList.remove('hide_element');
                this.showTextarea.classList.add('footer-block-card');
            }

        })
    }

    cardDisplay(contentArea) {
        console.log(contentArea)
        // console.log(event)

        debugger
        // получить значение texarea
        const card = contentArea.closest('card');
        console.log(card)

        const newCard = card.cloneNode(true);
        const pharag = newCard.querySelector('.card-message')
        // pharag.textcontent = '' + contentArea.value; // не нашел другого метода
        pharag.innerText = contentArea.value; // не нашел другого метода
        console.log(newCard)

    }
}