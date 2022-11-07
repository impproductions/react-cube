import Quaternion from "quaternion";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Cube3D from "./Cube3D";


function Cube({ side, rotation }) {
    const cube = new Cube3D(side);

    return (
        <CubeWrapperX
            side={side}
            style={{
                transform: "matrix3d(" + rotation + ")"
                // transform: "rotateX(" + rotation[0] + "deg) rotateY(" + rotation[1] + "deg) rotateZ(" + rotation[2] + "deg)"
                // transform: "rotateY(" + rotation[1] + "deg) rotateY(" + rotation[1] + "deg)"
            }}
        >
            {/* <CubeWrapperY
                side={side}
                style={{
                    transform: "rotateX(" + rotation[0] + "deg)"
                }}
            > */}
            {
                cube.faces.map((s, i) => {
                    return (
                        <FaceWrapper
                            key={i}
                            id={i}
                            data={s}
                            side={side}
                        >
                            <article
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100%",
                                    width: "100%",
                                }}
                            >
                                {"zXZxYy"[i]}
                            </article>
                        </FaceWrapper>
                    );
                })
            }
            {/* </CubeWrapperY> */}
        </CubeWrapperX>
    );
}


const CubeWrapperX = styled.section`
    position: relative;
    transform-style: preserve-3d;
    height: ${(props) => Number(props.side)}px;
    width: ${(props) => Number(props.side)}px;
    border: 10px solid red;
    transition: all 500ms ease-out;
`;
const CubeWrapperY = styled.section`
    position: relative;
    height: ${(props) => props.side}px;
    width: ${(props) => props.side}px;
    transform-style: preserve-3d;
    border: 10px solid green;
    transition: all 500ms ease-out;
`;

const FaceWrapper = styled.div`
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    height: ${(props) => props.side - 2}px;
    width: ${(props) => props.side - 2}px;
    background-color: black;
    border: 1px solid white;
    box-shadow: 0 0 10px 3px;
    transform-origin: ${(props) => props.data.origin};
    transform: translate3d(${({ data }) => data.translation[0] + "px, " + data.translation[1] + "px, " + data.translation[2] + "px"}) rotate3d(${({ data }) => data.rotation[0] + ", " + data.rotation[1] + ", " + data.rotation[2]}, 90deg);
`;

export default Cube;