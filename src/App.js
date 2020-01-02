import React, { useEffect, useReducer } from 'react';
import { parse } from './services/parser';
import { getData, reducers } from './reducers';

function App() {
  const [state, dispatch] = useReducer(reducers, {});

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <div className="App">
      {JSON.stringify(
        parse({
          column: 'state',
          data: state.data,
          rows: ['category', 'subCategory'],
          metric: 'sales',
        })
      )}
    </div>
  );
}

export default App;
