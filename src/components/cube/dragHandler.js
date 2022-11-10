import { useRef, useEffect } from "react";

function useDragHandler(dragAreaId, onDragStart, onDrag, onDragEnd) {
    let dragStartCoord = useRef([]);
    let mouseCurrentCoords = useRef([]);
    let dragEndCoord = useRef([]);
    let axis = useRef(null);
    let isDragging = useRef(false);
    let lastTouchPosition = useRef([0, 0]);
    let delta = () => mouseCurrentCoords.current.map((c, i) => c - dragStartCoord.current[i]);

    useEffect(() => {
        const mouseDown = (e) => {
            if (e.target.closest("#" + dragAreaId)) {

                e.preventDefault();

                if (e.touches) {
                    e = e.touches[0];
                    console.log("Touchs start", e);
                    lastTouchPosition = [e.pageX, e.pageY];
                }


                dragStartCoord.current = [e.clientX, e.clientY];
                isDragging.current = true;
                onDragStart();

                const getAxis = (delta) => {
                    const [x, y] = delta();

                    axis.current = (Math.abs(x) > Math.abs(y) ? [0, Math.sign(x * e.movementX) || 1, 0] : [Math.sign(y * e.movementY) || 1, 0, 0]);
                };

                setTimeout(() => {
                    if (!isDragging.current) return;
                    if (delta().some(v => Math.abs(v) > 10)) {
                        getAxis(delta);
                    } else {
                        setTimeout(() => {
                            getAxis(delta);
                        }, 100);
                    }
                }, 100);

            }
        }

        const mouseMove = (e) => {
            e.preventDefault();
            if (e.touches) {
                e = e.touches[0];
                e.movementX = -(lastTouchPosition[0] - e.pageX);
                e.movementY = -(lastTouchPosition[1] - e.pageY);
                lastTouchPosition = [e.pageX, e.pageY];
            }
            // console.log("Touchs move", e);

            mouseCurrentCoords.current = [e.clientX, e.clientY];

            if (isDragging.current) {
                // const [x, y] = delta();
                // axis.current = (Math.abs(x) > Math.abs(y) ? "h" : "v");
                onDrag({ delta: delta(), axis: axis.current, event: e });
            }
        }

        const mouseUp = (e) => {
            e.preventDefault();
            if (e.touches) {
                e = e.changedTouches[0];
                lastTouchPosition = null;
            }
            console.log("Touchs up", e);

            mouseCurrentCoords.current = [e.clientX, e.clientY];

            if (isDragging.current) {
                dragEndCoord.current = [e.clientX, e.clientY];

                onDragEnd({ delta: delta(), axis: axis.current });

                setTimeout(() => {
                    mouseCurrentCoords.current = [];
                    dragStartCoord.current = [];
                    axis.current = null;
                    dragEndCoord.current = [];
                    isDragging.current = false;
                }, 100);
            }
        }

        window.addEventListener("touchstart", mouseDown, { passive: false });
        window.addEventListener("touchmove", mouseMove, { passive: false });
        window.addEventListener("touchend", mouseUp, { passive: false });
        window.addEventListener("mousedown", mouseDown);
        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseup", mouseUp);

        return () => {
            window.removeEventListener("mousedown", mouseDown);
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseup", mouseUp);
            window.removeEventListener("touchstart", mouseDown);
            window.removeEventListener("touchmove", mouseMove);
            window.removeEventListener("touchend", mouseUp);
        }
    }, []);

    return null;
}

export default useDragHandler;