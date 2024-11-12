import React from 'react';

const Link = ({ startPortPos, endPortPos, name, typeOfCurve = 'curved' }) => {
  // Get the start and end positions
  const x1 = startPortPos.x;
  const y1 = startPortPos.y;
  const x2 = endPortPos.x;
  const y2 = endPortPos.y;

  // Determine the SVG dimensions
  const svgWidth = Math.abs(x2 - x1) + 100;
  const svgHeight = Math.abs(y2 - y1) + 100;

  // Determine SVG offset
  const offsetX = Math.min(x1, x2) - 50;
  const offsetY = Math.min(y1, y2) - 50;

  // Adjust coordinates relative to the SVG coordinate system
  const adjustedX1 = x1 - offsetX;
  const adjustedY1 = y1 - offsetY;
  const adjustedX2 = x2 - offsetX;
  const adjustedY2 = y2 - offsetY;

  let pathData = '';

  if (typeOfCurve === 'straight') {
    // Straight line
    pathData = `M${adjustedX1},${adjustedY1} L${adjustedX2},${adjustedY2}`;
  } else if (typeOfCurve === 'curved') {
    // Curved path
    const controlPointOffset = 50;
    pathData = `M${adjustedX1},${adjustedY1} C${adjustedX1 + controlPointOffset},${adjustedY1} ${adjustedX2 - controlPointOffset},${adjustedY2} ${adjustedX2},${adjustedY2}`;
  } else if (typeOfCurve === 'orthogonal') {
    // Orthogonal path (L-shaped)
    const midX = adjustedX1;
    const midY = adjustedY2;

    pathData = `M${adjustedX1},${adjustedY1} L${midX},${midY} L${adjustedX2},${adjustedY2}`;
  } else {
    // Default to straight line if typeOfCurve is unrecognized
    pathData = `M${adjustedX1},${adjustedY1} L${adjustedX2},${adjustedY2}`;
  }


  return (
    <svg
      style={{
        position: 'absolute',
        left: offsetX,
        top: offsetY,
        pointerEvents: 'none',
        overflow: 'visible',
      }}
      width={svgWidth}
      height={svgHeight}
    >
      {/* Draw a curved path */}
      <path
        d={pathData}
        stroke="black"
        strokeWidth="2"
        fill="none"
      />
      {/* Display the name of the link */}
      {name && (
        <text
          x={(adjustedX1 + adjustedX2) / 2}
          y={(adjustedY1 + adjustedY2) / 2 - 5}
          fill="black"
          fontSize="12"
          textAnchor="middle"
        >
          {name}
        </text>
      )}
    </svg>
  );
};

export default Link;