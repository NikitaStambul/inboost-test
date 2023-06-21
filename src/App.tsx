import React from 'react';

import Flow from './components/Flow/Flow';
import AddNodeButton from './components/AddNodeButton/AddNodeButton';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Flow />
      <AddNodeButton />
    </div>
  );
}
