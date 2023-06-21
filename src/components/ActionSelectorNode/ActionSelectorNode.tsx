import React from 'react';

import styles from './ActionSelectorNode.module.css';
import { Handle, Node, Position, getIncomers } from 'reactflow';
import { Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeSelected } from '../../store/slices/nodeSlice';

export interface ActionSelectorData {
  label: string;
  selected: string | null;
}

interface ActionSelectorNodeProps {
  id: string;
  data: ActionSelectorData;
}

const ActionSelectorNode: React.FC<ActionSelectorNodeProps> = ({
  id,
  data,
}) => {
  const { nodes, edges } = useAppSelector((state) => state.nodesState);
  const dispatch = useAppDispatch();
  const node = nodes.find((node) => node.id === id);

  let incomers: Node<any, string | undefined>[];

  let variants: string[] = [];

  for (var i = 1; i <= 6; i++) {
    variants.push(i.toString());
  }

  if (node) {
    incomers = getIncomers(node, nodes, edges);

    const first = incomers[0];

    if (first) {
      variants = variants.map((variant) => {
        if (!first) return variant;

        return first.data.selected + '-' + variant;
      });
    }
  }

  const handleChange = (value: string) => {
    dispatch(changeSelected({ id, value }));
  };

  return (
    <div className={styles.container}>
      <Handle type="target" position={Position.Top} />
      <div className={styles.header}>
        This is a <strong>custom node</strong>
      </div>
      <div className={styles.body}>
        {data.label}
        <br />
        This is custom node body
      </div>
      <Select
        placeholder={'Оберіть значення'}
        value={data.selected}
        style={{ width: '100%' }}
        onChange={handleChange}
        className="nodrag"
        options={variants.map((variant) => ({
          value: variant,
          label: `Варіант ${variant}`,
        }))}
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default ActionSelectorNode;
