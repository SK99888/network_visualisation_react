import React from 'react';
import { useState } from 'react';
import Node from './components/Node';
import Box from './components/Box';
import Link from './components/Link';
import './App.css';

const App = () => {
  const [nodes, setNodes] = useState([
    { id: 'node1', x: 400, y: 600, leftPorts: 4, rightPorts: 1, nameDetail: 'UDDI-8180-1A' },
    { id: 'node2', x: 700, y: 600, leftPorts: 1, rightPorts: 4, nameDetail: 'UDDI-8180-1B' },
  ]);

  const [portPositions, setPortPositions] = useState({});

  const handleSetPortPositions = (nodeId, positions) => {
    setPortPositions((prev) => ({
      ...prev,
      [nodeId]: positions,
    }));
  };

  const links = [
    {
      name: 'Link A',
      source: { nodeId: 'node1', portId: 'right-0' },
      target: { nodeId: 'node2', portId: 'left-0' },
    },

  ];

  return (
    <div className="App" style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {nodes.map((node) => (
        <Node
          key={node.id}
          id={node.id}
          name={node.nameDetail}
          backgroundColor="#f0f8ff"
          leftPorts={node.leftPorts}
          rightPorts={node.rightPorts}
          x={node.x}
          y={node.y}
          setPortPositions={handleSetPortPositions}
        />
      ))}

      {links.map((link, index) => {
        const startPortPos =
          portPositions[link.source.nodeId]?.[link.source.portId];
        const endPortPos =
          portPositions[link.target.nodeId]?.[link.target.portId];

        if (startPortPos && endPortPos) {
          return (
            <Link
              key={`link-${index}`}
              startPortPos={startPortPos}
              endPortPos={endPortPos}
              name={link.name}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

export default App;

