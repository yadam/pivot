import { INTERNAL_TOTAL_BRANCH, INTERNAL_SUBTOTAL_VALUE } from '../constants';

const getTotals = (graph, column, value) => ({
  [INTERNAL_TOTAL_BRANCH]: {
    ...graph[INTERNAL_TOTAL_BRANCH],
    [column]:
      graph[INTERNAL_TOTAL_BRANCH] && graph[INTERNAL_TOTAL_BRANCH][column]
        ? graph[INTERNAL_TOTAL_BRANCH][column] + value
        : value,
    [INTERNAL_SUBTOTAL_VALUE]:
      graph[INTERNAL_TOTAL_BRANCH] &&
      graph[INTERNAL_TOTAL_BRANCH][INTERNAL_SUBTOTAL_VALUE]
        ? graph[INTERNAL_TOTAL_BRANCH][INTERNAL_SUBTOTAL_VALUE] + value
        : value,
  },
});

const update = (graph, path, column, value) => {
  if (!path.length) {
    // We're at the bottom. Stop recursing
    return getTotals(graph, column, value);
  }
  const newPath = [...path];
  const currentPath = newPath.shift(); // array.shift() modifies the original array
  const currentGraph = graph[currentPath] || {};
  return {
    ...graph,
    ...getTotals(graph, column, value),
    [currentPath]: {
      ...currentGraph,
      ...update(currentGraph, newPath, column, value),
    },
  };
};

export const parse = ({ column, data, rows, metric }) => {
  if (!data || !data.length) {
    return { graph: {}, columns: [] };
  }
  const result = data.reduce(
    (acc, record) => {
      const recordValue = record[metric];

      // get row values i.e. [ 'Furniture', 'Bookcases' ]
      const rowValues = rows.map(row => record[row]);
      // get column values i.e. 'California'
      const columnValue = record[column];

      // update the graph
      return {
        graph: update(acc.graph, rowValues, columnValue, recordValue),
        // collect the possible column names with a boolean object for deduplication
        foundColumns: { ...acc.foundColumns, [columnValue]: true },
      };
    },
    { graph: {}, foundColumns: {} }
  );

  // convert boolean object to sorted string array
  const columns = Object.keys(result.foundColumns).sort();
  return { graph: result.graph, columns };
};

// const result = {
//   columns: ['Alabama', 'Arizona'],
//   graph: {
//     _totals: {
//       _subtotal: 1560,
//       Alabama: 850,
//       Arizona: 710,
//     },
//     Furniture: {
//       _totals: {
//         _subtotal: 890,
//         Alabama: 600,
//         Arizona: 290,
//       },
//       Bookcases: {
//         _totals: {
//           _subtotal: 740,
//           Alabama: 500,
//           Arizona: 240,
//         },
//       },
//       Chairs: {
//         _totals: {
//           _subtotal: 150,
//           Alabama: 100,
//           Arizona: 50,
//         },
//       },
//     },
//     'Office Supplies': {
//       _totals: {
//         _subtotal: 670,
//         Alabama: 250,
//         Arizona: 420,
//       },
//       Appliances: {
//         _totals: {
//           _subtotal: 600,
//           Alabama: 200,
//           Arizona: 400,
//         },
//       },
//       Art: {
//         _totals: {
//           _subtotal: 70,
//           Alabama: 50,
//           Arizona: 20,
//         },
//       },
//     },
//   },
// };

export default parse;
