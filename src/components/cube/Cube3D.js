export default class Cube3D {
    constructor(side = 1) {
        this.side = side;
    }

    get faces() {
        return [
            new Face3D([0, 0, -this.side / 2], [0, 0, 0], "bottom"), // back
            new Face3D([this.side, 0, this.side / 2], [0, 1, 0], "left"), // right
            new Face3D([0, 0, this.side / 2], [0, 0, 0], "bottom"), // front
            new Face3D([-this.side, 0, this.side / 2], [0, -1, 0], "right"), // left
            new Face3D([0, -this.side, this.side / 2], [1, 0, 0], "bottom"), // top
            new Face3D([0, this.side, this.side / 2], [-1, 0, 0], "top"), // bottom
        ]
    }

}

class Face3D {
    constructor(translation, rotation, origin) {
        this.translation = translation;
        this.rotation = rotation;
        this.origin = origin;
    }
}