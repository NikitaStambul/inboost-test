import React from 'react';
import styles from './AddNodeButton.module.css';
import { useAppDispatch } from '../../store/hooks';
import { addNode } from '../../store/slices/nodeSlice';
import { NodeType } from '../../types/NodeType';
import { ActionSelectorData } from '../ActionSelectorNode';

const AddNodeButton = () => {
  const dispatch = useAppDispatch();

  const handleAddClick = () => {
    const data: ActionSelectorData = {
      label: 'My new node',
      selected: null,
    };

    dispatch(
      addNode({
        data,
        nodeType: NodeType.ActionSelectorNode,
      }),
    );
  };

  return (
    <button className={styles.button} onClick={handleAddClick}>
      Add Node
    </button>
  );
};

export default AddNodeButton;
