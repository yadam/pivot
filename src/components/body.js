import PropTypes from 'prop-types';
import React from 'react';
import { INTERNAL_TOTAL_BRANCH } from '../constants';
import { Row } from './row';
import { RowHeader } from './rowHeader';
import styles from '../styles/grid.module.css';

const build = (parents, data, columns, rows) => {
  const isDimension = Object.keys(data).length > 1;
  const parentsKey = parents.join('-');
  const totalLabel = parents[parents.length - 1] || 'Grand';
  if (!isDimension) {
    // We've reached the leaf of this part of the graph. Render the row.
    return (
      <tr key={parentsKey} className={styles.dataRow}>
        {parents.map((header, index) => (
          <RowHeader key={`${parentsKey}-${header}-${index}`} header={header} />
        ))}
        <Row key={`${parentsKey}-row`} columns={columns} data={data} />
      </tr>
    );
  }
  const spacers = [];
  for (let spacer = 0; spacer < parents.length - 1; spacer++) {
    spacers.push(
      <RowHeader key={`${totalLabel}-spacer-${spacer}`} header={''} />
    );
  }
  // Recursively build the rows and the totals for each branch of the data graph
  return (
    <React.Fragment key={`${totalLabel}-fragment`}>
      {Object.keys(data)
        .sort()
        .map((key, index) => {
          if (key === INTERNAL_TOTAL_BRANCH) {
            // Ignore the totals rows for now. It will be rendered at the end
            return null;
          }
          return build(
            index === 0 ? [...parents, key] : [...parents.fill(''), key],
            data[key],
            columns,
            rows
          );
        })}
      <tr key={`${totalLabel}-total-tr`} className={styles.totalRow}>
        {spacers}
        <RowHeader
          key={`${totalLabel}-total`}
          header={`${totalLabel} total`}
          colSpan={Math.min(rows.length - (parents.length - 1), rows.length)}
        />
        <Row key={`${totalLabel}-total-row`} columns={columns} data={data} />
      </tr>
    </React.Fragment>
  );
};

export const Body = ({ columns, data, rows }) => (
  <tbody>{build([], data, columns, rows)}</tbody>
);

Body.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.shape({}),
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Body.defaultProps = {
  data: {},
};

export default Body;
