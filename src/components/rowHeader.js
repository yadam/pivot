import PropTypes from 'prop-types';
import React from 'react';
import styles from '../styles/grid.module.css';

export const RowHeader = ({ colSpan, header, rowSpan }) => {
  return (
    <th
      key={header}
      className={styles.rowHeader}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {header}
    </th>
  );
};

RowHeader.propTypes = {
  colSpan: PropTypes.number,
  header: PropTypes.string.isRequired,
  rowSpan: PropTypes.number,
};

RowHeader.defaultProps = {
  colSpan: 1,
  rowSpan: 1,
};

export default RowHeader;
