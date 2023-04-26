
export default class DragAndDrop {
    constructor() {
        this.card; // перемещаемый элемент
        this.copyCard = null;
        this.column;
        this.shiftX;
        this.shiftY;
        this.mouseDownCard; // элемент на который перемещают
        this.main = document.querySelector('main');
    }

    onMouseDown(event) {
        this.card = event.target.closest('.card');
        this.card.classList.add('dragged');

        // фиксация координат клика
        this.shiftX = event.offsetX;
        this.shiftY = event.offsetY;

        // console.log(event.pageX, event.pageY)

        this.card.style = `
            left: ${event.pageX - this.shiftX}px;
            top: ${event.pageY - this.shiftY}px;
        `

        this.insertingElement(event);
        // document.documentElement.addEventListener('mouseup', (event) => this.onMouseUp(event));

        // const{ y, height } = this.card.getBoundingClientRect();
        // const appendPosition = y + height / 2 > event.clientY 
        //     ? 'beforebegin' 
        //     : 'afterend';

        // if(!this.copyCard) {
        //     this.copyCard = this.createCopyCard();
        // } else {
        //     this.copyCard.remove();
        //     this.card.insertAdjacentElement(appendPosition, this.copyCard)
        // }
    }

    insertingElement(event) {
        const target = event.target;
        const element = this.card;
        const copyCard = this.copyCard;

        if(target.classList.contains('dragged')){
            const{ y, height } = this.card.getBoundingClientRect();
            const appendPosition = y + height / 2 > event.clientY 
                ? 'beforebegin' 
                : 'afterend';
            if(!this.copyCard) {
                this.copyCard = this.createCopyCard();
            } else {
                this.copyCard.remove();
                this.card.insertAdjacentElement(appendPosition, this.copyCard)
            }
        }
    }

    onMouseUp = () => {
        console.log(this.card)
        if(this.card){
            console.log(this.card , this.copyCard)

            this.card.replaceWith(this.copyCard);
            // this.card.element.style = this.card.element;
            // this.card.remove();
        }
        // this.mouseDownCard = event.target;

        // this.main.insertBefore(this.card, this.mouseDownCard);
    }
    
    onMouseMove = (event) => {

        if(this.card){
            const { pageX, pageY } = event;
            const { width, height } = this.card.style;

            // const element = this.card;
            this.card.style = `
                position: absolute;
                left: ${pageX - this.shiftX}px;
                top: ${pageY - this.shiftY}px;
                pointer-events: none;
                width: ${width}px;
                height: ${height}px;
            `
            this.insertingElement(event);
        }
    }

    createCopyCard(){
        return (() => {
            const elem = document.createElement('div');
            const { width, height } = this.card.getBoundingClientRect();
            elem.style.cssText = `
                width: ${width}px;
                height: ${height}px;
                margin-bottom: 5px; 
            `;
            return elem
        })();
    }
}