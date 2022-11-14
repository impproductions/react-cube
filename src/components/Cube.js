import styled from "styled-components";

function Cube({ side, faces }) {
    return (
        <CubeWrapper side={side}>
            {
                ["front", "back", "left", "right", "top", "bottom"].map((face, i) =>
                    <FaceWrapper key={"cube-side-" + face} className={face} side={side}>
                        <section>
                            {faces[i]}
                        </section>
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
    background-color: rgba(40,40,40,0.75);
    border: 1px solid rgba(0,0,0,0.8);
    box-shadow: inset 0 0 60px 10px rgba(0,0,0, 0.4);
    /* box-shadow: 0 0 5px 3px rgba(180, 190, 200, 1), inset 0 0 3px 2px rgba(180, 190, 200, 1); */
    
    & section {
    overflow: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    }
    
    & section::-webkit-scrollbar {
        display: none;
    }
    
    &.back {
        /* background-color: darkblue; */
        transform-origin: center;
        transform: translate3d(0px, 0px, ${(props) => -props.side / 2}px) rotateZ(180deg) rotateY(180deg);
    }
    &.front {
        /* background-color: blue; */
        transform-origin: bottom;
        transform: translate3d(0px, 0px, ${(props) => props.side / 2}px) rotate3d(0, 0, 0, 90deg);
    }
    &.left {
        /* background-color: darkred; */
        transform-origin: left;
        transform: translate3d(0px, 0px, ${(props) => -props.side / 2}px) rotate3d(0, -1, 0, 90deg);
    }
    &.right {
        /* background-color: red; */
        transform-origin: right;
        transform: translate3d(0px, 0px, ${(props) => -props.side / 2}px) rotate3d(0, 1, 0, 90deg);
    }
    &.top {
        /* background-color: green; */
        transform-origin: bottom;
        transform: translate3d(0px, ${(props) => -props.side}px, ${(props) => props.side / 2}px) rotate3d(1, 0, 0, 90deg);
    }
    &.bottom {
        /* background-color: darkgreen; */
        transform-origin: top;
        transform: translate3d(0px, ${(props) => props.side}px, ${(props) => props.side / 2}px) rotate3d(-1, 0, 0, 90deg);
    }
`;
export default Cube;