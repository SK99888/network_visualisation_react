import React from 'react';
import { useState } from 'react';
import Node from './components/Node';
import Box from './components/Box';
import Link from './components/Link';
import './App.css';

const App = () => {
  const [nodes, setNodes] = useState([
    { id: 'node1', x: 300, y: 600, leftPorts: 4, rightPorts: 1, nameDetail: 'UDDI-8180-1A', backgroundColor: '#9e2626'},
    { id: 'node2', x: 500, y: 600, leftPorts: 1, rightPorts: 4, nameDetail: 'UDDI-8180-1B', backgroundColor: '#9e2626'},
    { id: 'node3', x: 1100, y: 600, leftPorts: 4, rightPorts: 1, nameDetail: 'SGYL-8180-1A',backgroundColor: '#9e2626'},
    { id: 'node4', x: 1300, y: 600, leftPorts: 1, rightPorts: 4, nameDetail: 'SGYL-8180-1B', backgroundColor: '#9e2626'},
    { id: 'node5', x: 700, y: 1200, leftPorts: 1, rightPorts: 1, nameDetail: 'SGYLIVI0102', backgroundColor: '#26729e'},
    { id: 'node6', x: 900, y: 1200, leftPorts: 1, rightPorts: 1, nameDetail: 'SGYLIVI0101', backgroundColor: '#26729e'},
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
      name: 'LAG 1',
      source: { nodeId: 'node1', portId: 'right-0' },
      target: { nodeId: 'node2', portId: 'left-0' },
    },
    {
      name: 'LAG 1',
      source: {nodeId: 'node3', portId:'right-0'},
      target: {nodeId: 'node4', portId:'left-0'},
    },
    {
      name: 'LAG-7',
      source: {nodeId: 'node2', portId:'right-3'},
      target: {nodeId: 'node3', portId:'left-3'},
    },
    {
      name: '',
      source: {nodeId: 'node1', portId:'left-3'},
      target: {nodeId: 'node5', portId:'left-0'},
      type: 'orthogonal',
    },
    {
      name: 'LAG 13',
      source: {nodeId: 'node5', portId:'right-0'},
      target: {nodeId: 'node6', portId:'left-0'},
    },
    {
      name: '',
      source: {nodeId: 'node4', portId:'right-3'},
      target: {nodeId: 'node6', portId:'right-0'},
      type: 'orthogonal',
    },
    {
      name: '',
      source: {nodeId: 'node7', portId:'right-0'},
      target: {nodeId: 'node8', portId:'left-0'},
    },

  ];

  return (
    <div className="App" style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {nodes.map((node) => (
        <Node
          key={node.id}
          id={node.id}
          name={node.nameDetail}
          backgroundColor={node.backgroundColor}
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
              typeOfCurve={link.type}
            />
          );
        }
        return null;
      })}

      <Box x={500} y={800} boxWidth={800} boxHeight={300} edgeColor='#9933ff' crosses={1} squares={4}>
        <Box x={25} y={50} boxWidth={750} boxHeight={200} edgeColor='#f58d42' crosses={1} circles={4}>
          <p>Dummy Data</p>
        </Box>
      </Box>
    </div>
  );
}

export default App;

