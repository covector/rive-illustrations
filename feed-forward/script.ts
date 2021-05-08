import * as rive from "rive-js"

const network: rive.Rive = new rive.Rive({
    src: "./neural_network.riv",
    canvas: document.getElementById('canvas') as HTMLCanvasElement,
});