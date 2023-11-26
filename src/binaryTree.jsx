import React, { useEffect } from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';

const BinaryTree = () => {
  useEffect(() => {
    const nodes = new DataSet([
      { id: 1, label: '1' },
      { id: 2, label: '2' },
      { id: 3, label: '3' },
      { id: 4, label: '4' },
      { id: 5, label: '5' },
    ]);

    const edges = new DataSet([
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ]);

    const container = document.getElementById('binaryTree');
    const data = {
      nodes,
      edges,
    };
    const options = {};

    const network = new Network(container, data, options);

    return () => {
      if (network) {
        network.destroy();
      }
    };
  }, []);

  return <div id="binaryTree" style={{ height: '400px' }} />;
};

export default BinaryTree;
