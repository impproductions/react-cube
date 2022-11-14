import Quaternion from "quaternion";
import { useRef } from "react";

function useRotationHandler() {
    const orientation = useRef(new Quaternion([1,0,0,0]));

    function rotate(axis, angle = Math.PI) {
        orientation.current = orientation.current.mul(Quaternion.fromAxisAngle(orientation.current.conjugate().rotateVector(axis), angle / 2));
    }

    function snap() {
        // convert quaternion to a 3x3 matrix in a 2d array
        const unflattenedMatrix = orientation.current.toMatrix().reduce((p, c, i, arr) => i % 3 === 0 ? [...p, arr.slice(i, i + 3)] : p, []);

        // for each row, round its number with the highest absolute value to 1 and the others to 0
        const matrix = unflattenedMatrix.map(r => r.map(c1 => r.every(c2 => Math.abs(c1) >= Math.abs(c2)) ? (Math.sign(c1) || 1) : 0));

        orientation.current = Quaternion.fromMatrix(matrix);
    }

    function getMatrix() {
        return orientation.current.conjugate().toMatrix4();
    }

    return {
        rotate,
        snap,
        getMatrix
    }
}

export default useRotationHandler;