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

// set up detector for mouse move event
const detector = document.getElementById("detector");
let mousePos = 0;
detector.addEventListener("mousemove", (e) => {
    mousePos = e.offsetX / detector.clientWidth;
});

// update canvas according to mouse position
const updateBoard = () => {
    setTime(mousePos);
    window.requestAnimationFrame(updateBoard);
}
window.requestAnimationFrame(updateBoard);