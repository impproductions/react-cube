import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Quaternion from "quaternion";
import Cube from "./Cube";

import useDragHandler from "./dragHandler";

function Stage() {
    const orientation = useRef(Quaternion.fromAxisAngle([0, 0, 1], 0));
    const [rotation, setRotation] = useState(Quaternion.ZERO.conjugate().toMatrix4());
    const animate = useRef(true);

    const stageElementId = "stage-element";
    const size = [500, 500];


    const startVector = [0, 0, 1];
    const [vector, setVector] = useState([0, 0, 1]);

    useDragHandler(stageElementId, dragStart, dragMove, dragEnd);

    function dragStart() {
        animate.current = false;
    }

    function dragMove({ axis, delta, event }) {
        const directions = [
            (-Math.sign(event.movementY) || 1),
            (Math.sign(event.movementX) || 1),
            1
        ];
        if (axis) rotate(axis.map((c, i) => c * directions[i]), Math.sqrt((event.movementX ** 2) + (event.movementY ** 2)) / (size[0] * 0.5) * Math.PI);

        setVector(orientation.current.rotateVector(startVector));
    }

    function dragEnd({ axis, delta }) {
        animate.current = true;

        const snapRotation = (q) => {
            // convert quaternion to a matrix in a 2d array
            const unflattenedMatrix = q.toMatrix().reduce((p, c, i, arr) => i % 3 == 0 ? [...p, arr.slice(i, i + 3)] : p, []);

            // for each row, round its number with the highest absolute value to 1 and the others to 0
            const matrix = unflattenedMatrix.map(r => r.map(c1 => r.every(c2 => Math.abs(c1) >= Math.abs(c2)) ? (Math.sign(c1) || 1) : 0));

            return Quaternion.fromMatrix(matrix);
        }

        setTimeout(() => {
            const snapped = snapRotation(orientation.current)
            orientation.current = snapped;
            setRotation(snapped.conjugate().toMatrix4());
        }, 100);
    }

    function rotate(axis, angle = Math.PI) {
        orientation.current = orientation.current.mul(Quaternion.fromAxisAngle(orientation.current.conjugate().rotateVector(axis), angle / 2));
        setRotation(orientation.current.conjugate().toMatrix4());
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
                <div style={{
                    background: "red",
                    height: "50px",
                    width: "50px",
                    position: "absolute",
                    top: "calc(50% - 25px)",
                    left: "calc(50% - 25px)",
                    transformOrigin: "center",
                    // transform: "translate3d("+size[0]/8+"px, "+size[0]/8+"px, "+size[0]/8+"px) translateZ("+size[0]/8+"px)",
                    transform: "translate3d(" + orientation.current.rotateVector([size[0] / 8, size[0] / 8, size[0] / 8]).map(v => v + "px").join(",") + ")  translateZ(" + size[0] / 8 + "px)"
                }}></div>
                <Cube side="200" rotation={rotation} animate={animate.current}></Cube>
                <DebugSquare>
                    {
                        orientation.current.toVector().map((v, i) => <div key={i}>{"wxyz"[i] + ":" + v.toPrecision(2)}</div>)
                        // Object.entries(orientation.current.toEuler()).map(([k, v]) => <div key={k}>{k}: {Math.round(v / Math.PI * 180)}</div>)
                        // rotation.reduce((p, c, i, arr) => i % 4 == 0 ? [...p, arr.slice(i, i + 4)] : p, []).map((r, i) => <div key={i}>[{r.map(Math.round).join(",")}]</div>)
                    }
                    ----
                    {
                        Object.entries(orientation.current.inverse().toEuler()).map(([k, v], i) => <div key={i}>{"xyz"[i] + ":" + Math.round(v / Math.PI * 180) + (Math.sign(v) >= 0 ? "cw" : "ccw") }</div>)
                    }
                </DebugSquare>
            </StageView>
        </>
    );
}

const DebugSquare = styled.div`
    min-height: 50px;
    min-width: 50px;
    position: absolute;
    top: 0%;
    left: 0%;
    background-color: white;
    border: 1px solid black;
    font-family: monospace;
    font-size: 14pt;
`;

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