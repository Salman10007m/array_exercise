const r = require("raylib");
const m = require("./math");
const bars = require("./bar");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const WIDTH = 400;
    const HEIGHT = 400;
    const TITLE = "Average";
    const FPS = 60;

    const data = [12, 45, 78, 23, 91, 56, 34, 67, 89, 40];
    // const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const barWidth = 40;
    const barGap = 4;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, TITLE);
    r.SetTargetFPS(FPS);

    return { WIDTH, HEIGHT, FPS, data, barGap, barWidth };
}

function update() {
    // change the state
}

function drawAvgLine(maxHeight, currentHeight, world, avg) {
    const percentage = m.valueToPercentage(avg, maxHeight);
    const lineWidth = m.percentageToValue(percentage, currentHeight);
    const y = bars.findYcoordinate(currentHeight, lineWidth, world.WIDTH);

    r.DrawRectangle(0, y, world.WIDTH, 1, r.RED);
}

function draw(world) {
    const currentHeight = m.percentageToValue(90, world.HEIGHT);
    const maxHeight = m.max(world.data);
    const avg = m.calAvg(world.data);

    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE);

    bars.draw(world, maxHeight, currentHeight);
    drawAvgLine(maxHeight, currentHeight, world, avg);

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};
