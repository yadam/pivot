import React from 'react';
import { parse } from './services/parser';

function App() {
  return (
    <div className="App">
      {JSON.stringify(
        parse({
          column: 'state',
          rows: ['category', 'subCategory'],
          metric: 'sales',
        })
      )}
    </div>
  );
}

export default App;
