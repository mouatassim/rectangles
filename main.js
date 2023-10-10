const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let color = '#fff';

let isDrawing = false;
let startX, startY;
let rectangles = [];

canvas.addEventListener('dblclick', (event) => {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    for (let i = rectangles.length - 1; i >= 0; i--) {
        const rect = rectangles[i];
        if (
            mouseX > rect.x &&
            mouseX < rect.x + rect.width &&
            mouseY > rect.y &&
            mouseY < rect.y + rect.height
        ) {
            //Double-click occurred within the rectangle, so delete it
            rectangles.splice(i, 1);
            redrawRectangles();
            console.log(rectangles);

            continue;

        }
    }
});

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    startX = event.clientX - canvas.getBoundingClientRect().left;
    startY = event.clientY - canvas.getBoundingClientRect().top;
    color = getRandomColor();
});

canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;

    const currentX = event.clientX - canvas.getBoundingClientRect().left;
    const currentY = event.clientY - canvas.getBoundingClientRect().top;

    const width = currentX - startX;
    const height = currentY - startY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const rect of rectangles) {
        ctx.fillStyle = rect.color;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }

    ctx.fillStyle = color;
    ctx.fillRect(startX, startY, width, height);
});

canvas.addEventListener('mouseup', () => {
    if (isDrawing) {
        isDrawing = false;

        const currentX = event.clientX - canvas.getBoundingClientRect().left;
        const currentY = event.clientY - canvas.getBoundingClientRect().top;
        const width = currentX - startX;
        const height = currentY - startY;
        if(Math.abs(width) > 2 && Math.abs(height)  > 2){
            rectangles.push(
                rightShape({
                x: startX,
                y: startY,
                width,
                height,
                color,
            }));
        }
        redrawRectangles();
    }
});



function redrawRectangles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const rect of rectangles) {
        ctx.fillStyle = rect.color;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function rightShape(shape){
    let {x,y,width,height,color} = shape;
    return{
        x : width<0? x -Math.abs(width):x,
        width : width<0? -width:width,
        y : height<0? x - height:y,
        height : height<0? -height:height,
        color
    }
}
