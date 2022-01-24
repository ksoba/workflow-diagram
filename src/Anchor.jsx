import React, { useRef } from 'react';
import { Circle } from 'react-konva';
import { NODE_SIZE } from './NodeConfig';

function dragBounds(ref) {
    if (ref.current !== null) {
        return ref.current.getAbsolutePosition();
    }
    return {
        x: 0,
        y: 0
    };
}

//Anchor points
export function Anchor({ x, y, id, onDragMove, onDragEnd, onDragStart, onMouseOver, onMouseOut, scaleAnchor}) {
    const anchor = useRef(null);
    return (
        <Circle
            x={x}
            y={y}
            radius={scaleAnchor ? 12 : NODE_SIZE.radius}
            fill={NODE_SIZE.selectFill}
            draggable
            onDragStart={(e) => onDragStart(e, id)}
            onDragMove={(e) => onDragMove(e, id)}
            onDragEnd={(e) => onDragEnd(e, id)}
            onMouseOver={(e) => onMouseOver(e, id)}
            onMouseOut={(e) => onMouseOut(e, id)}
            dragBoundFunc={() => dragBounds(anchor)}
            perfectDrawEnabled={false}
            ref={anchor}
        />
    );
}