import React, { useEffect, useReducer } from 'react';
import { Pivot } from './components/pivot';
import { getData, reducers } from './reducers';
import styles from './styles/app.module.css';

function App() {
  const [state, dispatch] = useReducer(reducers, {});

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <div className={styles.card}>
        <Pivot
          column="state"
          data={state.data}
          metric="sales"
          name="Products"
          rows={['category', 'subCategory']}
        />
      </div>
    </div>
  );
}

export default App;
