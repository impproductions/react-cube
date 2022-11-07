import { useEffect, useState } from "react";
import styled from "styled-components";

import Quaternion from "quaternion";
import Cube from "./Cube";

let orientation = Quaternion.fromAxisAngle([0, 0, 1], 0);

function Stage() {
    const [orbit, setOrbit] = useState(Quaternion.ZERO.conjugate().toMatrix4());
    const size = [500, 500];

    useEffect(() => {
        function keyDown(e) {
            let axis;
            if (e.key == "ArrowLeft") axis = [0, 1, 0]
            else if (e.key == "ArrowRight") axis = [0, -1, 0];
            else if (e.key == "ArrowUp") axis = [-1, 0, 0];
            else if (e.key == "ArrowDown") axis = [1, 0, 0];

            if (axis) {
                orientation = orientation.mul(Quaternion.fromAxisAngle(orientation.conjugate().rotateVector(axis), Math.PI / 2));
                setOrbit(orientation.conjugate().toMatrix4());
            }
        }
        window.removeEventListener("keydown", keyDown);

        window.addEventListener("keydown", keyDown);
        return () => window.removeEventListener("keydown", keyDown);
    }, []);

    return (
        <>
            <StageView size={size} name="stage-element">
                <Cube side="200" rotation={orbit}></Cube>
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