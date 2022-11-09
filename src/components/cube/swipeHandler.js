import { useEffect, useRef } from "react";


function useSwipeHandler(dragAreaId, onSwipeStart, onSwipe, onSwipeEnd) {
    let swipeStartCoord = useRef([]);
    let mouseCurrentCoords = useRef([]);
    let swipeEndCoord = useRef([]);
    let axis = useRef(null);
    let isSwiping = useRef(false);
    let delta = () => mouseCurrentCoords.current.map((c, i) => c - swipeStartCoord.current[i]);

    useEffect(() => {
        const mouseDown = (e) => {
            if (e.target.closest("#" + dragAreaId)) {
                swipeStartCoord.current = [e.clientX, e.clientY];

                onSwipeStart();

                setTimeout(() => {
                    if (delta().some(v => Math.abs(v) > 10)) {
                        const [x, y] = delta();
                        axis.current = (Math.abs(x) > Math.abs(y) ? "h" : "v");
                        isSwiping.current = true;
                    }
                }, 100);
            }
        }

        const mouseMove = (e) => {
            mouseCurrentCoords.current = [e.clientX, e.clientY];

            if (isSwiping.current) {
                onSwipe({ delta: delta(), axis: axis.current });
            }
        }

        const mouseUp = (e) => {
            mouseCurrentCoords.current = [e.clientX, e.clientY];

            if (isSwiping.current) {
                swipeEndCoord.current = [e.clientX, e.clientY];

                onSwipeEnd({ delta: delta(), axis: axis.current });

                setTimeout(() => {
                    mouseCurrentCoords.current = [];
                    swipeStartCoord.current = [];
                    axis.current = null;
                    swipeEndCoord.current = [];
                    isSwiping.current = false;
                }, 100);
            }
        }

        window.addEventListener("mousedown", mouseDown);
        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseup", mouseUp);

        return () => {
            window.removeEventListener("mousedown", mouseDown);
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseup", mouseUp);
        }
    }, []);

    return null;
}

export default useSwipeHandler;