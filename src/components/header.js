import PropTypes from 'prop-types';
import React from 'react';
import styles from '../styles/grid.module.css';

export const Header = ({ columnName, columns, name, rows }) => {
  const spacers = [];
  for (let spacer = 0; spacer < rows.length - 1; spacer++) {
    spacers.push(
      <th
        key={`spacer-${spacer}`}
        className={`${styles.columnHeader} ${styles.primary}`}
      >
        &nbsp;
      </th>
    );
  }
  return (
    <thead>
      <tr>
        <th className={`${styles.columnHeader} ${styles.primary}`}>
          {name ? name.toUpperCase() : ''}
        </th>
        {spacers}
        <th
          className={`${styles.columnHeader} ${styles.primary} ${styles.center}`}
          colSpan={columns.length + 1}
        >
          {columnName.toUpperCase()}
        </th>
      </tr>
      <tr>
        {rows
          .concat(columns)
          .concat(['Grand total'])
          .map(label => (
            <th key={label} className={styles.columnHeader}>
              {label}
            </th>
          ))}
      </tr>
    </thead>
  );
};

Header.propTypes = {
  columnName: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Header.defaultProps = {
  name: undefined,
};

export default Header;
