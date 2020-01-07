import PropTypes from 'prop-types';
import React from 'react';
import { INTERNAL_SUBTOTAL_VALUE, INTERNAL_TOTAL_BRANCH } from '../constants';
import styles from '../styles/grid.module.css';

export const Row = ({ columns, data }) => {
  return columns.concat([INTERNAL_SUBTOTAL_VALUE]).map(column => (
    <td className={styles.cell} key={column}>
      {(Math.round(data[INTERNAL_TOTAL_BRANCH][column]) || 0).toLocaleString()}
    </td>
  ));
};

Row.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.shape({}),
};

Row.defaultProps = {
  data: {},
};

export default Row;
