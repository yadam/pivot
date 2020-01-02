import data from '../data/truncated.json';
// import data from '../data/UI Take Home Test - sales-orders.json';

const getTotals = (graph, column, value) => ({
  _totals: {
    ...graph._totals,
    [column]:
      graph._totals && graph._totals[column]
        ? graph._totals[column] + value
        : value,
    _subtotal:
      graph._totals && graph._totals._subtotal
        ? graph._totals._subtotal + value
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

export const parse = ({ column, rows, metric }) => {
  const result = data.reduce((acc, record) => {
    const recordValue = record[metric];

    // get row values i.e. [ 'Furniture', 'Bookcases' ]
    const rowValues = rows.map(row => record[row]);
    // get column values i.e. 'California'
    const columnValue = record[column];

    // update the graph
    return update(acc, rowValues, columnValue, recordValue);
  }, {});
  return result;
};

// const result = {
//   _totals: {
//     _subtotal: 1560,
//     Alabama: 850,
//     Arizona: 710,
//   },
//   Furniture: {
//     _totals: {
//       _subtotal: 890,
//       Alabama: 600,
//       Arizona: 290,
//     },
//     Bookcases: {
//       _totals: {
//         _subtotal: 740,
//         Alabama: 500,
//         Arizona: 240,
//       },
//     },
//     Chairs: {
//       _totals: {
//         _subtotal: 150,
//         Alabama: 100,
//         Arizona: 50,
//       },
//     },
//   },
//   'Office Supplies': {
//     _totals: {
//       _subtotal: 670,
//       Alabama: 250,
//       Arizona: 420,
//     },
//     Appliances: {
//       _totals: {
//         _subtotal: 600,
//         Alabama: 200,
//         Arizona: 400,
//       },
//     },
//     Art: {
//       _totals: {
//         _subtotal: 70,
//         Alabama: 50,
//         Arizona: 20,
//       },
//     },
//   },
// };

export default parse;
