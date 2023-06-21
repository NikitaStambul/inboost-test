/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

export interface State {
  nodes: Node[];
  edges: Edge[];
}

const initialState = {
  nodes: [],
  edges: [],
};

const stateFromStorage: State = JSON.parse(
  localStorage.getItem('reduxState') || JSON.stringify(initialState),
);

const nodesSlice = createSlice({
  name: 'nodes',
  initialState: stateFromStorage,
  reducers: {
    addNode: (state, { payload }) => {
      const { nodeType, data } = payload;
      const newNode: Node = {
        id: uuidv4(),
        data: data,
        position: { x: 100, y: 200 },
        type: nodeType,
      };

      state.nodes.push(newNode);
    },
    changeSelected: (state, { payload }) => {
      state.nodes.forEach((node) => {
        if (node.id === payload.id) {
          console.log(payload.value);
          node.data.selected = payload.value;
        }
      });
    },
    onNodesChange: (state, action) => {
      const changes: NodeChange[] = action.payload;

      state.nodes = applyNodeChanges(changes, state.nodes);
    },
    onEdgesChange: (state, action) => {
      const changes: EdgeChange[] = action.payload;

      state.edges = applyEdgeChanges(changes, state.edges);
    },
    onConnect: (state, action) => {
      const connection: Connection = action.payload;

      state.edges = addEdge(connection, state.edges);
    },
  },
});

export const {
  onNodesChange,
  onEdgesChange,
  onConnect,
  addNode,
  changeSelected,
} = nodesSlice.actions;

export default nodesSlice.reducer;
