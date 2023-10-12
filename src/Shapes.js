class Shapes {
    waitingShapesQueue = [];
    shapesToDeleteQueue = [];
    shapesList = [];

    get getShapesList() {
        return this.shapesList;
    }
    setShapeList(newShapeList) {
        this.shapesList = newShapeList;
    }

    get length() {
        return this.shapesList.length;
    }

    addShape(shape) {
        this.shapesList.push(shape);
    }

    deleteShapes(rects) {
        this.setShapeList(
            this.shapesList.filter((element) => !rects.includes(element))
        );
    }

    waitSelection() {
        const intervalId = setInterval(() => {
            if (this.waitingShapesQueue.length === 0) {
                clearInterval(intervalId);
            }
        });
    }

    selectShapes(rect) {
        this.waitingShapesQueue.push(rect);
        this.shapesToDeleteQueue.push(rect);
        this.waitSelection(rect);
        const onSelect = new Promise((resolve) => {
            setTimeout(() => {
                this.waitingShapesQueue.pop();
                resolve(this.shapesToDeleteQueue);
            }, 1200);
        });

        return Promise.allSettled([this.waitSelection, onSelect]);
    }
}

export default Shapes;
