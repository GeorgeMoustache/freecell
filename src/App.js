import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5backend from 'react-dnd-html5-backend'
//components
import Stage from './pages/Stage'

const App = () => {
  return (
    <DndProvider backend={HTML5backend}>
      <Stage />
    </DndProvider>
  );
}

export default App;
