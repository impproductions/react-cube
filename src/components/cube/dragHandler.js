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
                    lastTouchPosition.current = [e.pageX, e.pageY];
                }

                dragStartCoord.current = [e.pageX, e.pageY];
                isDragging.current = true;

                onDragStart();

                const setAxis = () => {
                    setTimeout(() => {
                        const [x, y] = delta();
                        if (!isDragging.current) return;
                        if (delta().some(v => Math.abs(v) > 10) && Math.abs(x) !== Math.abs(y)) {
                            axis.current = (Math.abs(x) > Math.abs(y) ? [0, Math.sign(x * e.movementX) || 1, 0] : [Math.sign(y * e.movementY) || 1, 0, 0]);
                        } else {
                            setAxis(delta);
                        }
                    }, 100);
                };

                setAxis();
            }
        }

        const mouseMove = (e) => {
            e.preventDefault();
            if (e.touches) {
                e = e.touches[0];
                e.movementX = -(lastTouchPosition.current[0] - e.pageX);
                e.movementY = -(lastTouchPosition.current[1] - e.pageY);
                lastTouchPosition.current = [e.pageX, e.pageY];
            }

            mouseCurrentCoords.current = [e.pageX, e.pageY];

            if (isDragging.current) {
                onDrag({ delta: delta(), axis: axis.current, event: e });
            }
        }

        const mouseUp = (e) => {
            e.preventDefault();
            if (e.touches) {
                e = e.changedTouches[0];
                lastTouchPosition.current = null;
            }

            mouseCurrentCoords.current = [e.pageX, e.pageY];

            if (isDragging.current) {
                dragEndCoord.current = [e.pageX, e.pageY];

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
    });

    return null;
}

export default useDragHandler;