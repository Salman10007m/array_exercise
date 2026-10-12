const r = require("raylib");
const m = require("./math");

function nextPosition(world, i) {
    return i * (world.barWidth + world.barGap);
}

function drawBar(bar) {
    r.DrawRectangleRec(bar, r.DARKBLUE);
}

function findYcoordinate(currentHeight, height, size) {
    return currentHeight - height + (size - currentHeight);
}

function createBar(world, maxHeight, currentHeight, i) {
    const percentage = m.valueToPercentage(world.data[i], maxHeight);
    const width = world.barWidth;
    const height = m.percentageToValue(percentage, currentHeight);
    const x = nextPosition(world, i);
    const y = findYcoordinate(currentHeight, height, world.HEIGHT);

    return { x, y, width, height };
}

function draw(world, maxHeight, currentHeight) {
    for (i = 0; i < world.data.length; i++) {
        const bar = createBar(world, maxHeight, currentHeight, i);
        drawBar(bar);
    }
}

module.exports = {
    draw,
    findYcoordinate,
};
