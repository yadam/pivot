import PropTypes from 'prop-types';
import React from 'react';
import styles from '../styles/grid.module.css';

export const TableHeader = ({ columnName, name }) => {
  return (
    <div className={styles.tableHeader}>
      <div
        className={`${styles.name} ${styles.columnHeader} ${styles.primary}`}
      >
        {name ? name.toUpperCase() : ''}
      </div>
      <div
        className={`${styles.columnName} ${styles.columnHeader} ${styles.primary} ${styles.center}`}
      >
        {columnName.toUpperCase()}
      </div>
    </div>
  );
};

TableHeader.propTypes = {
  columnName: PropTypes.string.isRequired,
  name: PropTypes.string,
};

TableHeader.defaultProps = {
  name: undefined,
};

export default TableHeader;
