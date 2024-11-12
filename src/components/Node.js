import React, { useRef, useEffect } from 'react';
import './Node.css';

const Node = ({
  id,
  name,
  backgroundColor,
  leftPorts,
  rightPorts,
  x,
  y,
  setPortPositions,
}) => {
  // Refs for ports
  const leftPortRefs = useRef([]);
  const rightPortRefs = useRef([]);

  useEffect(() => {
    // After the component mounts, get the positions of the ports
    const getPortPositions = () => {
      const positions = {};

      leftPortRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          positions[`left-${index}`] = {
            x: rect.left + rect.width / 2 + window.scrollX,
            y: rect.top + rect.height / 2 + window.scrollY,
          };
        }
      });

      rightPortRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          positions[`right-${index}`] = {
            x: rect.left + rect.width / 2 + window.scrollX,
            y: rect.top + rect.height / 2 + window.scrollY,
          };
        }
      });

      // Pass the port positions back to the parent
      setPortPositions(id, positions);
    };

    getPortPositions();

    // Optionally, you can add event listeners to update positions on resize or scroll
    window.addEventListener('resize', getPortPositions);
    window.addEventListener('scroll', getPortPositions);

    return () => {
      window.removeEventListener('resize', getPortPositions);
      window.removeEventListener('scroll', getPortPositions);
    };
  }, [id, setPortPositions]);

  // Generate left ports
  const leftPortElements = Array.from({ length: leftPorts }).map((_, index) => (
    <div
      key={`left-port-${index}`}
      className="port"
      ref={(el) => (leftPortRefs.current[index] = el)}
      data-port-id={`left-${index}`}
    ></div>
  ));

  // Generate right ports
  const rightPortElements = Array.from({ length: rightPorts }).map((_, index) => (
    <div
      key={`right-port-${index}`}
      className="port"
      ref={(el) => (rightPortRefs.current[index] = el)}
      data-port-id={`right-${index}`}
    ></div>
  ));



  return (
    <div
      className="node"
      style={{
        backgroundColor,
        left: x,
        top: y,
        position: 'absolute',
        width: '140px',
        height: '80px',
        color: 'white',
      }}
    >
      <div className="ports left">{leftPortElements}</div>
      <div className="node-name">{name}</div>
      <div className="ports right">{rightPortElements}</div>
    </div>
  );
};

export default Node;