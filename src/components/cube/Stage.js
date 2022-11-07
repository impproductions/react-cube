import { useEffect, useState } from "react";
import styled from "styled-components";

import Matrix from "./matrix";
import Quaternion from "quaternion";

import Cube from "./Cube";

let cumulativeOrientation = Quaternion.fromAxisAngle([0, 0, 1], 0);
function toOrbit(quaternion) {
    return quaternion.conjugate().toMatrix4();
    // const euler = cumulativeOrientation.toEuler();
    // return [euler.roll, euler.pitch, euler.yaw].map(v => (v / Math.PI) * 180);
}

function Stage() {
    const [axes, setAxes] = useState([[1, 0, 0], [0, 1, 0]]);
    const [orbit, setOrbit] = useState(Quaternion.ZERO.conjugate().toMatrix4());
    const size = [500, 500];

    function rotate(vector, axis, angle) {
        return Quaternion.fromAxisAngle(axis, angle).rotateVector(vector).map(v => Math.abs(v) <= Number.EPSILON ? 0 : v);
    }

    useEffect(() => {
        console.log();

        function keyDown(e) {
            if (e.key == "ArrowLeft") {
                cumulativeOrientation = cumulativeOrientation.mul(Quaternion.fromAxisAngle(axes[1], Math.PI / 2));
                setOrbit(toOrbit(cumulativeOrientation))
                setAxes((axes) => axes.map(a => rotate(a, axes[1], -Math.PI / 2)));
            } else if (e.key == "ArrowRight") {
                cumulativeOrientation = cumulativeOrientation.mul(Quaternion.fromAxisAngle(axes[1], -Math.PI / 2));
                setOrbit(toOrbit(cumulativeOrientation))
                setAxes((axes) => axes.map(a => rotate(a, axes[1], Math.PI / 2)));
            } else if (e.key == "ArrowUp") {
                cumulativeOrientation = cumulativeOrientation.mul(Quaternion.fromAxisAngle(axes[0], -Math.PI / 2));
                setOrbit(toOrbit(cumulativeOrientation))
                setAxes((axes) => axes.map(a => rotate(a, axes[0], Math.PI / 2)));
            } else if (e.key == "ArrowDown") {
                cumulativeOrientation = cumulativeOrientation.mul(Quaternion.fromAxisAngle(axes[0], Math.PI / 2));
                setOrbit(toOrbit(cumulativeOrientation))
                setAxes((axes) => axes.map(a => rotate(a, axes[0], -Math.PI / 2)));
            }
        }
        window.removeEventListener("keydown", keyDown);


        window.addEventListener("keydown", keyDown);
        return () => window.removeEventListener("keydown", keyDown);
    }, [axes]);

    return (
        <>
            <StageView size={size} name="stage-element">
                <Cube side="200" rotation={orbit}></Cube>
            </StageView>
            <DisplayAxes>
                h: <span className={[..."xyz"].filter((l, i) => axes[0][i] != 0)}>{axes[0].map((v, i) => v != 0 ? ((String(v).match(/-/g) || '')) + "xyz"[i] : null)} | {axes[0]}</span><br />
                v: <span className={[..."xyz"].filter((l, i) => axes[1][i] != 0)}>{axes[1].map((v, i) => v != 0 ? ((String(v).match(/-/g) || '')) + "xyz"[i] : null)} | {axes[1]}</span>
            </DisplayAxes>
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

const DisplayAxes = styled.div`
    position: absolute;
    top: 20%;
    right: 20%;
    background: white;
    color: black;
    border: 1px solid black;

    span {
        padding: 3px;
        margin: 3px;
        font-size: 40px;
    }
    span.x {
        background: red;
    }
    span.y {
        background: green;
        color: white;
    }
    span.z {
        background: blue;
        color: white;
    }
`;

export default Stage;