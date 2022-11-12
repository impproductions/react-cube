import Quaternion, { fromMatrix } from "quaternion";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import Cube3D from "./Cube3D";


function Cube({ side, rotation, animate }) {
    const cube = new Cube3D(side);

    const faceOrientations = useRef({
        front: new Quaternion([0,0,1]),
        back: new Quaternion([0,0,-1]),
        left: new Quaternion([-1,0,0]),
        right: new Quaternion([1,0,0]),
        top: new Quaternion([0,1,0]),
        bottom: new Quaternion([0,-1,0]),
    });

    useEffect(() => {
        const quat = Quaternion.fromMatrix(rotation.slice(0, 12).filter((v, i) => (i + 1) % 4 !== 0));
        console.log("Rotating faces");
        faceOrientations.current = Object.fromEntries(Object.entries(faceOrientations.current).map(([k, v]) => [k, quat.mul(v)]));
    }, [rotation]);

    // useEffect(() => {
    //     const faceContents = new documentl[]);
    //     console.log(faceContents);
    // }, []);

    function getContentTransform(face) {
        const eulerAngles = Quaternion.fromMatrix(rotation.slice(0, 12).filter((v, i) => (i + 1) % 4 !== 0)).toEuler();
        return eulerAngles;
    }

    return (
        <CubeWrapper
            side={side}
            animate={animate}
            style={{
                transform: "matrix3d(" + rotation + ")"
            }}
        >
            {
                ["front", "back", "left", "right", "top", "bottom"].map(face =>
                    <FaceWrapper key={"cube-side-" + face} className={face} side={side} rotation={rotation}>
                        <article style={{
                            // transform: `rotateZ(${getContentTransform().yaw}rad) rotateY(${getContentTransform().pitch}rad) rotateX(${getContentTransform().roll}rad) `
                        }}>
                            <h1 style={{ textTransform: "uppercase", textAlign: "center" }}>
                                {face}
                            </h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                            </p>
                            <h1>
                                {/* {Object.entries(faceOrientations.current[face]).map(([k, v]) => <div key={k}>{k}: {v.toPrecision(2)}</div>)} */}
                                {Object.entries(faceOrientations.current[face].toEuler()).map(([k, v]) => <div key={k}>{k}: {v.toPrecision(2)}</div>)}
                            </h1>
                        </article>
                    </FaceWrapper>
                )
            }
        </CubeWrapper>
    );
}

const FaceContent = styled.article`
    height: 100;
    width: 100;
`;

const CubeWrapper = styled.section`
    position: relative;
    transform-style: preserve-3d;
    height: ${(props) => Number(props.side)}px;
    width: ${(props) => Number(props.side)}px;
    border: 10px solid red;
    transition: ${(props) => props.animate ? "all 300ms ease-out" : ''};
`;

const FaceWrapper = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    height: ${(props) => props.side - 2}px;
    width: ${(props) => props.side - 2}px;
    background-color: black;
    border: 1px solid white;
    opacity: 0.3;
    box-shadow: 0 0 10px 3px;

    &.back {
        background-color: darkblue;
        transform-origin: center;
        transform: translate3d(0px, 0px, ${(props) => -props.side / 2}px) rotateZ(180deg) rotateY(180deg);
    }
    /* &.back + div {
        transform-origin: bottom;
        transform: translate3d(0px, 0px, ${(props) => -props.side / 2}px);
    } */
    &.front {
        background-color: blue;
        transform-origin: bottom;
        transform: translate3d(0px, 0px, ${(props) => props.side / 2}px) rotate3d(0, 0, 0, 90deg);
    }
    /* &.front + div {
        transform-origin: bottom;
        transform: translate3d(0px, 0px, ${(props) => props.side / 2}px);
    } */
    &.left {
        background-color: darkred;
        transform-origin: left;
        transform: translate3d(0px, 0px, ${(props) => -props.side / 2}px) rotate3d(0, -1, 0, 90deg);
    }
    /* &.left + div {
        transform-origin: left;
        transform: translate3d(0px, 0px, ${(props) => -props.side / 2}px);
    } */
    &.right {
        background-color: red;
        transform-origin: right;
        transform: translate3d(0px, 0px, ${(props) => -props.side / 2}px) rotate3d(0, 1, 0, 90deg);
    }
    /* &.right + div {
        transform-origin: right;
        transform: translate3d(0px, 0px, ${(props) => -props.side / 2}px);
    } */
    &.top {
        background-color: green;
        transform-origin: bottom;
        transform: translate3d(0px, ${(props) => -props.side}px, ${(props) => props.side / 2}px) rotate3d(1, 0, 0, 90deg);
    }
    /* &.top + div {
        transform-origin: bottom;
        transform: translate3d(0px, ${(props) => -props.side}px, ${(props) => props.side / 2}px);
    } */
    &.bottom {
        background-color: darkgreen;
        transform-origin: top;
        transform: translate3d(0px, ${(props) => props.side}px, ${(props) => props.side / 2}px) rotate3d(-1, 0, 0, 90deg);
    }
    /* &.bottom + div {
        transform-origin: top;
        transform: translate3d(0px, ${(props) => props.side}px, ${(props) => props.side / 2}px);
    } */
`;
export default Cube;