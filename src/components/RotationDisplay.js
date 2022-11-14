import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// import Quaternion from "quaternion";

import useDragHandler from "./hooks/dragHandler";
import useRotationHandler from "./hooks/rotationHandler";

function RotationDisplay({ children, perspective = 800 }) {
    const [cssMatrix, setCSSMatrix] = useState([[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]]);
    const [animate, setAnimate] = useState(true);
    const dragAreaRef = useRef();
    const size = useRef([0,0]);

    const { rotate, snap, getMatrix } = useRotationHandler();
    useDragHandler(dragAreaRef, dragStart, dragMove, dragEnd);

    useEffect(() => {
        size.current = [dragAreaRef.current.offsetWidth || 100, dragAreaRef.current.offsetHeight || 100];
    }, []);

    function dragStart() {
        setAnimate(false);
    }

    function dragMove({ axis, event }) {
        const directions = [(-Math.sign(event.movementY) || 1), (Math.sign(event.movementX) || 1), 1];
        if (axis) {
            rotate(axis.map((v, i) => v * directions[i]), Math.sqrt((event.movementX ** 2) + (event.movementY ** 2)) / (size.current[0] * 0.5) * Math.PI);

            setCSSMatrix(getMatrix());
        };
    }

    function dragEnd() {
        setAnimate(true);

        setTimeout(() => {
            snap();
            setCSSMatrix(getMatrix());
        }, 100);
    }

    return (
        <DisplayView size={size} perspective={perspective} ref={dragAreaRef}>
            <Rotator animate={animate} style={{
                transition: animate && "all 300ms ease-out",
                transform: "matrix3d(" + cssMatrix + ")",
            }}>
                {children}
            </Rotator>
        </DisplayView>
    );
}

const Rotator = styled.div`
    border: 6px solid yellow;
    transform-style: preserve-3d;
`;
const DisplayView = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: ${props => props.perspective}px;
    height: 100%;
    width: 100%;
    background-color: grey;
`;

export default RotationDisplay;