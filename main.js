import Rectangle from "./src/Rectangle.js";
import Shapes from "./src/Shapes.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//using windowWidth,windowHeight  only for the resizing sync

let windowWidth = canvas.width = window.innerWidth - 70;
let windowHeight = canvas.height = window.innerHeight - 70;

//defaulte color (declared here because we need to see the color while drawing)
let color = "#000";

//draxing flag to know if we are drawing in the real time
let isDrawing = false;

//(x,y) for the new rectangle 
let startX, startY;

//shape container
let rectangles = new Shapes();


// I'm not sure if you demande the resize event to change the values(x,y ,width, height) for every shape while resizing the window 
// This event is working with the first rectangle 
// If you want to see the default config (no resizing) you should replace the funtion   syncShapesWithResing() by syncShapes(); {you can see that i the code}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth - 70;
    canvas.height = window.innerHeight - 70;
    syncShapesWithResing();
    // syncShapes();

});

//start drawing
canvas.addEventListener("mousedown", (event) => {
    isDrawing = true;
    startX = event.clientX - canvas.getBoundingClientRect().left;
    startY = event.clientY - canvas.getBoundingClientRect().top;
    color = getRandomColor();
});

//while drawing
canvas.addEventListener("mousemove", (event) => {
    if (!isDrawing) return;
    const currentX = event.clientX - canvas.getBoundingClientRect().left;
    const currentY = event.clientY - canvas.getBoundingClientRect().top;
    const width = currentX - startX;
    const height = currentY - startY;
    syncShapes();
    ctx.fillStyle = color;
    ctx.fillRect(startX, startY, width, height);
});

//finish drawing
canvas.addEventListener("mouseup", (event) => {
    if (isDrawing) {
        isDrawing = false;
        const currentX = event.clientX - canvas.getBoundingClientRect().left;
        const currentY = event.clientY - canvas.getBoundingClientRect().top;
        const width = currentX - startX;
        const height = currentY - startY;
        const rectangle = new Rectangle(startX, startY, width, height, color);
        if (rectangle.getWidth > 3 && rectangle.getHeight > 3) {
            rectangles.addShape(rectangle);
        }
        syncShapes();
    }
});

//double click to remove
canvas.addEventListener("dblclick", async (event) => {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    let len = rectangles.shapesList.length;
    for (let rect of rectangles.shapesList) {
        const { x, y, width, height } = rect.getShape;
        if (
            mouseX > x &&
            mouseX < x + width &&
            mouseY > y &&
            mouseY < y + height
        ) {
            if (rectangles.shapesList.includes(rect)) {
                const intervalId = setInterval(() => {
                    rect.angle += rect.angleSpeed;
                    syncShapes();
                }, 100);
                const rects = await rectangles.selectShapes(rect);
                clearInterval(intervalId);
                // start clearing whe there are no shape in the waiting list
                if (!rectangles.waitingShapesQueue.length) {
                    rectangles.deleteShapes(rects.at(-1).value);
                    // add a small delay to see the deleting of the rectangles in thes same time
                    setTimeout(() => {
                        syncShapes();
                    }, 500);
                }
                return;
            }
        }
    }
});

// syncronise the shapes on the DOM
function syncShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const rect of rectangles.shapesList) {
        ctx.save();
        ctx.fillStyle = rect.getShape.color;
        ctx.translate(
            rect.getX + rect.getWidth / 2,
            rect.getY + rect.getHeight / 2
        );
        ctx.rotate(rect.angle);
        ctx.fillRect(
            -rect.getWidth / 2,
            -rect.getHeight / 2,
            rect.getWidth,
            rect.getHeight
        );
        ctx.restore();
    }
}

// syncronise the shapes while resizing (optional function)
function syncShapesWithResing(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let rate =  windowWidth!= canvas.width? windowWidth/canvas.width : windowHeight/canvas.height

    for (const rect of rectangles.shapesList) {
        ctx.save();
        ctx.fillStyle = rect.getShape.color;
        const newX = rect.getX / rate;
        const newY = rect.getY /rate;
        const newWidth = rect.getWidth / rate;
        const newHeight = rect.getHeight / rate;
        
        rect.setX = newX;
        rect.setY = newY;
        rect.setWidth = newWidth;
        rect.setHeight = newHeight;
        
        ctx.translate(
            rect.getX + rect.getWidth / 2,
            rect.getY + rect.getHeight / 2
        );

        ctx.fillRect(
            -rect.getWidth / 2,
            -rect.getHeight / 2,
            rect.getWidth,
            rect.getHeight
        );
        ctx.restore();
        windowWidth = canvas.width;
        windowHeight = canvas.height;
    }
}

//get a rendom HexCode color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
