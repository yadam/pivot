import PropTypes from 'prop-types';
import React from 'react';
import { parse } from '../services/parser';
import { Header } from './header';
import { Body } from './body';
import styles from '../styles/pivot.module.css';

export const Pivot = ({ column, data, metric, name, rows }) => {
  const { columns, graph } = parse({ column, data, rows, metric });
  if (!columns.length || !Object.keys(data).length) {
    // No data received yet, don't render anything. Maybe add a loader?
    return null;
  }
  return (
    <div className={styles.pivot}>
      <table className={styles.table}>
        <Header columnName={column} columns={columns} name={name} rows={rows} />
        <Body columns={columns} data={graph} rows={rows} />
      </table>
    </div>
  );
};

Pivot.propTypes = {
  column: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  metric: PropTypes.string.isRequired,
  name: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Pivot.defaultProps = {
  data: [],
  name: undefined,
};

export default Pivot;
