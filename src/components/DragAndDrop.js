export default class DragAndDrop {
    constructor() {
        this.card; // перемещаемый элемент
        this.copyElement;
        this.placeCard;
        this.placeInsertion = null;
        this.column;
        this.shiftX;
        this.shiftY;
        this.mouseDownCard; // элемент на который перемещают
        this.main = document.querySelector('main');
    }

    onMouseDown(event) {
        event.preventDefault();

        this.card = event.target.closest('.card');
        this.card.classList.add('dragged');

        // фиксация координат клика
        this.shiftX = event.offsetX;
        this.shiftY = event.offsetY;

        this.copyElement = this.card; // создание копии элемента

        // this.placeCard.style = `
        this.copyElement.style = `
            left: ${event.pageX - this.shiftX}px;
            top: ${event.pageY - this.shiftY}px;
        `
        this.insertingElement(event);
    }

    insertingElement(event) {

        // необоходимо провести оптимизацию кода

        if(event.closest('.card')){
            const{ y, height } = event.getBoundingClientRect();
            const appendPosition = y + height / 2 > event.clientY 
            ? 'beforebegin' 
            : 'afterend';

            // this.copyCard.remove();

            event.insertAdjacentElement(appendPosition, this.copyElement)
        }

        // const target = event.target;
        // const element = this.card;
        // const placeInsertion = this.placeInsertion;

        if(target.classList.contains('dragged')){
            // const{ y, height } = this.card.getBoundingClientRect();
            // if(target.closest('card')) return target = target.closest('card');
            // console.log(target)
            const{ y, height } = target.getBoundingClientRect();


            const appendPosition = y + height / 2 > event.clientY 
                ? 'beforebegin' 
                : 'afterend';

            if(!this.placeInsertion) {
                this.placeInsertion = this.proection();
                // console.log(this.placeInsertion)
            } else {
                target.insertAdjacentElement(appendPosition, this.copyElement)
            }
        }
    }

    onMouseUp = () => {

        // полный рефакторинг
        if(this.card){
            // console.log(this.card , this.placeInsertion)

            this.card.replaceWith(this.placeInsertion);
        }
    }
    
    onMouseMove = (event) => {
        // console.log(typeof event.target ) // данный event.target указывает на элемент вместо которого будут подставлять 
        if(this.copyElement){
            const { pageX, pageY } = event;
            const element = this.copyElement;
            const { width, height } = element.getBoundingClientRect();

            element.style = `
                position: absolute;
                left: ${pageX - this.shiftX}px;
                top: ${pageY - this.shiftY}px;
                pointer-events: none;
            `
            this.insertingElement(event.target);
        }
    }

    proection(){
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