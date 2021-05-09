const network = new rive.Rive({
    src: "./neural_network.riv",
    canvas: document.getElementById('canvas'),
});
const setTime = (time) => {
    let animation = network.animator?.animations[0];
    if (animation) {
        animation.instance.time = time;
        animation.instance.apply(network.artboard, 1.0);
        network.artboard.advance(0);
        network.artboard.draw(network.renderer);
    }
};
const canvas = document.getElementById("canvas");
let mousePos = 0;
canvas.addEventListener("mousemove", (e) => {
    mousePos = e.offsetX;
});
canvas.addEventListener("touchmove", (e) => {
    const canvasOffsetX = canvas.getBoundingClientRect().left;
    mousePos = e.touches[0].pageX - canvasOffsetX;
});
const updateBoard = () => {
    setTime(2 * mousePos / canvas.clientWidth);
    window.requestAnimationFrame(updateBoard);
};
window.requestAnimationFrame(updateBoard);
const ratio = 1920 / 874;
const container = document.getElementById("container");
const fitCanvas = () => {
    const fitHeight = container.clientWidth / container.clientHeight > ratio;
    container.className = fitHeight ? "fit-height" : "fit-width";
};
window.onresize = fitCanvas;
fitCanvas();
