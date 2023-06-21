import React from 'react';

import { Background, Controls, MiniMap, ReactFlow } from 'reactflow';
import { NodeType } from '../../types/NodeType';
import ActionSelectorNode from '../ActionSelectorNode/ActionSelectorNode';
import {
  onConnect,
  onEdgesChange,
  onNodesChange,
} from '../../store/slices/nodeSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import 'reactflow/dist/style.css';

const nodeTypes = {
  [NodeType.ActionSelectorNode]: ActionSelectorNode,
};

const minimapStyle = {
  height: 120,
};

const Flow = () => {
  const { nodes, edges } = useAppSelector((state) => state.nodesState);
  const dispatch = useAppDispatch();

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={(e) => dispatch(onNodesChange(e))}
      onEdgesChange={(e) => dispatch(onEdgesChange(e))}
      onConnect={(e) => dispatch(onConnect(e))}
      nodeTypes={nodeTypes}
      fitView
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default Flow;
