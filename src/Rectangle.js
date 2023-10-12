class Rectangle {
    #x;
    #y;
    #width;
    #height;
    #edgeColor;
    static id = 0;
    constructor(x, y, width, height, edgeColor) {
        this.id = ++this.constructor.id;
        this.#x = width < 0 ? x - Math.abs(width) : x;
        this.#width = width < 0 ? -width : width;
        this.#y = height < 0 ? y - Math.abs(height) : y;
        this.#height = height < 0 ? -height : height;
        this.#edgeColor = edgeColor;
        this.angle = 0;
        this.angleSpeed = Math.PI / 6;
    }
    get getX() {
        return this.#x;
    }
    set setX(newX) {
        this.#x = newX;
    }
    get getY() {
        return this.#y;
    }
    set setY(newY) {
        this.#y = newY;
    }
    get getWidth() {
        return this.#width;
    }
    set setWidth(newWidth) {
        this.#width = newWidth;
    }
    get getHeight() {
        return this.#height;
    }
    set setHeight(newHeight) {
        this.#height = newHeight;
    }
    get getEdgeColor() {
        return this.#edgeColor;
    }
    rotate() {
        this.angle += this.angleSpeed;
    }
    get getShape() {
        return {
            id: this.id,
            x: this.getX,
            y: this.getY,
            width: this.getWidth,
            height: this.getHeight,
            color: this.#edgeColor,
        };
    }

}

export default Rectangle;
