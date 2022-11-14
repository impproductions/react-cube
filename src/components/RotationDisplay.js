import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import useDragHandler from "./hooks/dragHandler";
import useRotationHandler from "./hooks/rotationHandler";

function RotationDisplay({ perspective = 800, children }) {
    const [cssMatrix, setCSSMatrix] = useState([[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]]);
    const [animate, setAnimate] = useState(true);
    const dragAreaRef = useRef();
    const size = useRef([0, 0]);

    const { rotate, rotateTo, snap, getMatrix } = useRotationHandler();
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

    function setRotation(direction, angle) {
        rotateTo(direction, angle);
        setCSSMatrix(getMatrix());
    }

    return (
        <>
            <DisplayViewSection size={size} perspective={perspective}>
                <DragAreaDiv ref={dragAreaRef}></DragAreaDiv>
                <RotatorDiv animate={animate} style={{
                    transition: animate && "all 300ms ease-out",
                    transform: "matrix3d(" + cssMatrix + ")",
                }}>
                    {children}
                </RotatorDiv>
            </DisplayViewSection>
            <ControlsNav>
                <button onClick={() => setRotation([0, 1, 0], 0)}>Front</button>
                <button onClick={() => setRotation([1, 0, 0], Math.PI)}>Back</button>
                <button onClick={() => setRotation([0, 1, 0], Math.PI / 2)}>Left</button>
                <button onClick={() => setRotation([0, -1, 0], Math.PI / 2)}>Right</button>
                <button onClick={() => setRotation([-1, 0, 0], Math.PI / 2)}>Top</button>
                <button onClick={() => setRotation([1, 0, 0], Math.PI / 2)}>Bottom</button>
            </ControlsNav>
        </>
    );
}

const ControlsNav = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    padding: var(--padding);

    button {
        margin-top: calc(var(--padding) / 2);
    }
    @media screen and (max-width: 540px) {
        & {
            flex-direction: row;
        }
        button {
            font-size: 1.5rem;
            height: 7rem;
            min-width: 7rem;
        }
    }
`;

const DragAreaDiv = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0.7;
`;

const RotatorDiv = styled.div`
    transform-style: preserve-3d;
`;
const DisplayViewSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: ${props => props.perspective}px;
    height: 100%;
    width: 100%;
`;

export default RotationDisplay;