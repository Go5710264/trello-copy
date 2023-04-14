export default class Todo{
    constructor(){
        this.boardTask = [];
        this.fieldForAddCard;
        this.textInputField;

    }

    showInputField(element){
        this.fieldForAddCard = element;
        this.textInputField = element.parentElement.parentElement.firstElementChild;

        this.fieldForAddCard.classList.add('hide_element');
        this.textInputField.classList.add('show_element');

        this.cardFormation();
    }

    cardFormation(){
        const textArea = this.textInputField.querySelector('.task-input-field');

        textArea.addEventListener('keyup', () => {
            textArea.style.height = '0px';
            textArea.style.height = textArea.scrollHeight + 'px';
        })

        const buttonAddCard = this.textInputField.querySelector('.footer-button-add-card');
        
        this.textInputField.addEventListener('click', (event) => {
            let buttonClose = event.target;
            if(buttonClose.classList.contains('footer-button-add-card') 
            || buttonClose.classList.contains('click-add-card-close')){
                this.textInputField.classList.remove('show_element');
                this.fieldForAddCard.classList.remove('hide_element')
            }
        })
    }
}