import React from 'react';

const Link = ({ startPortPos, endPortPos, name }) => {
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
        d={`M${adjustedX1},${adjustedY1} C${adjustedX1 + 50},${adjustedY1} ${adjustedX2 - 50},${adjustedY2} ${adjustedX2},${adjustedY2}`}
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