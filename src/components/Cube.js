import styled from "styled-components";

function Cube({ side, faces }) {
    return (
        <CubeWrapper side={side}>
            {
                ["front", "back", "left", "right", "top", "bottom"].map((face, i) =>
                    <FaceWrapper key={"cube-side-" + face} className={face} side={side}>
                        <article>
                            {faces[i]}
                        </article>
                    </FaceWrapper>
                )
            }
        </CubeWrapper>
    );
}

const CubeWrapper = styled.section`
    transform-style: preserve-3d;
    height: ${(props) => Number(props.side)}px;
    width: ${(props) => Number(props.side)}px;
    border: 10px solid red;
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
    &.front {
        background-color: blue;
        transform-origin: bottom;
        transform: translate3d(0px, 0px, ${(props) => props.side / 2}px) rotate3d(0, 0, 0, 90deg);
    }
    &.left {
        background-color: darkred;
        transform-origin: left;
        transform: translate3d(0px, 0px, ${(props) => -props.side / 2}px) rotate3d(0, -1, 0, 90deg);
    }
    &.right {
        background-color: red;
        transform-origin: right;
        transform: translate3d(0px, 0px, ${(props) => -props.side / 2}px) rotate3d(0, 1, 0, 90deg);
    }
    &.top {
        background-color: green;
        transform-origin: bottom;
        transform: translate3d(0px, ${(props) => -props.side}px, ${(props) => props.side / 2}px) rotate3d(1, 0, 0, 90deg);
    }
    &.bottom {
        background-color: darkgreen;
        transform-origin: top;
        transform: translate3d(0px, ${(props) => props.side}px, ${(props) => props.side / 2}px) rotate3d(-1, 0, 0, 90deg);
    }
`;
export default Cube;