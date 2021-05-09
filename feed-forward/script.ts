import * as rive from "rive-js"

// init rive
const network = new rive.Rive({
    src: "./neural_network.riv",
    canvas: document.getElementById('canvas') as HTMLCanvasElement,
});

// set the canvas to a particular frame in the animation
const setTime = (time: number) => {
    // @ts-expect-error
    let animation = network.animator?.animations[0];
    if (animation) {
        animation.instance.time = time;
        // @ts-expect-error
        animation.instance.apply(network.artboard, 1.0);
        // @ts-expect-error
        network.artboard.advance(0);
        // @ts-expect-error
        network.artboard.draw(network.renderer);
    }
}

// set up canvas for detecting mousemove and touchmove event
const canvas = document.getElementById("canvas");
let mousePos = 0;
canvas.addEventListener("mousemove", (e) => {
    mousePos = e.offsetX;
});
canvas.addEventListener("touchmove", (e) => {
    const canvasOffsetX = canvas.getBoundingClientRect().left;
    mousePos = e.touches[0].pageX - canvasOffsetX;
});

// update canvas according to mouse position
const updateBoard = () => {
    setTime(2 * mousePos / canvas.clientWidth);
    window.requestAnimationFrame(updateBoard);
}
window.requestAnimationFrame(updateBoard);

// fit canvas according to aspect ratio
const ratio = 1920 / 874;
const container = document.getElementById("container");
const fitCanvas = () => {
    const fitHeight = container.clientWidth / container.clientHeight > ratio;
    container.className = fitHeight ? "fit-height" : "fit-width";
}
window.onresize = fitCanvas;
fitCanvas();