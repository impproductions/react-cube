import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Quaternion from "quaternion";
import Cube from "./Cube";

import useDragHandler from "./dragHandler";

function Stage() {
    const orientation = useRef(Quaternion.fromAxisAngle([0, 0, 1], 0));
    const [orbit, setOrbit] = useState(Quaternion.ZERO.conjugate().toMatrix4());
    const animate = useRef(true);

    const stageElementId = "stage-element";
    const size = [500, 500];

    useDragHandler(stageElementId, dragStart, dragMove, dragEnd);

    function dragStart() {
        animate.current = false;
        return null;
    }

    function dragMove({ axis, delta, event }) {
        const directions = [
            (-Math.sign(event.movementY) || 1),
            (Math.sign(event.movementX) || 1),
            1
        ];
        if (axis) rotate(axis.map((c, i) => c * directions[i]), Math.sqrt((event.movementX ** 2) + (event.movementY ** 2)) / (size[0] * 0.5) * Math.PI);
        // if (axis) rotate(axis.map((c, i) => c * directions[i]), Math.sqrt((event.movementX ** 2) + (event.movementY ** 2)) / 100 * Math.PI);


        console.log(axis, delta, event);
        // for free movement
        // if (axis) rotate(Math.abs(event.movementX) > Math.abs(event.movementY) ? [0, Math.sign(event.movementX) || 1, 0] : [-Math.sign(event.movementY) || 1, 0, 0], Math.sqrt((event.movementX ** 2) + (event.movementY ** 2)) / 100 * Math.PI);
    }

    function dragEnd({ axis, delta }) {
        animate.current = true;

        // to snap: convert to matrix and round the biggest number for each row to 1 and the others to 0?
        const snapRotation = (q) => {
            let matrix = q.toMatrix().reduce((p, c, i) => {
                if (i % 3 === 0) p.push([c]);
                else p[p.length - 1].push(c);
                return p;
            }, []);

            matrix = matrix.map(r => {
                const biggestIndex = r.findIndex(v => r.every(vv => Math.abs(vv) <= Math.abs(v)));
                r[biggestIndex] = Math.sign(r[biggestIndex]) || 1;

                return r.map(v => Math.abs(v) < 1 ? 0 : v);
            });

            console.log(matrix);

            return Quaternion.fromMatrix(matrix);
        }

        setTimeout(() => {
            const snapped = snapRotation(orientation.current)
            orientation.current = snapped;
            setOrbit(snapped.conjugate().toMatrix4());
        }, 100);
    }

    function rotate(axis, angle = Math.PI) {
        orientation.current = orientation.current.mul(Quaternion.fromAxisAngle(orientation.current.conjugate().rotateVector(axis), angle / 2));
        setOrbit(orientation.current.conjugate().toMatrix4());
    }

    useEffect(() => {
        function keyDown(e) {
            let directions = {
                "ArrowLeft": [0, -1, 0],
                "ArrowRight": [0, 1, 0],
                "ArrowUp": [1, 0, 0],
                "ArrowDown": [-1, 0, 0],
            };

            if (directions[e.key]) rotate(directions[e.key], Math.PI);
        }

        window.addEventListener("keydown", keyDown);
        return () => window.removeEventListener("keydown", keyDown);
    }, []);

    return (
        <>
            <StageView id={stageElementId} name={stageElementId} size={size}>
                <Cube side="200" rotation={orbit} animate={animate.current}></Cube>
            </StageView>
        </>
    );
}

const StageView = styled.section.attrs(props => ({ name: props.name }))`
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 400px;
    height: ${({ size }) => size[1]}px;
    width: ${({ size }) => size[0]}px;
    background-color: grey;
`;

export default Stage;