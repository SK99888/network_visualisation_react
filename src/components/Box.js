import React from 'react';
import './Box.css';

const Box = ({ x = 0, y = 0, edgeColor = '#000', boxWidth = 200, boxHeight=200, crosses = 0, circles = 0, squares = 0, children }) => {
  // Generate edge symbols
  const totalSymbols = crosses + circles + squares;
  const symbolElements = [];

  // Function to create symbols
  const createSymbols = (symbol, count) => {
    return Array.from({ length: count }).map((_, index) => (
      <div key={`${symbol}-${index}`} className={`symbol ${symbol}`}></div>
    ));
  };

  // Add symbols to the array
  symbolElements.push(...createSymbols('cross', crosses));
  symbolElements.push(...createSymbols('circle', circles));
  symbolElements.push(...createSymbols('square', squares));

  // Distribute symbols along the edges
  const edgeSymbols = symbolElements.map((symbol, index) => {
    const position = (index / totalSymbols) * 100;
    return React.cloneElement(symbol, { style: { left: `${position}%` } });
  });

  return (
    <div
      className="box"
      style={{
        borderColor: edgeColor,
        width: `${boxWidth}px`,
        height: `${boxHeight}px`,
        left: x,
        top: y,
        position: 'absolute'
      }}
    >
      <div className="edge top">{edgeSymbols}</div>
      {/* Right Edge Symbols */}

      {children}
    </div>
  );
};

export default Box;