import data from '../data/truncated.json';
// import data from '../data/UI Take Home Test - sales-orders.json';

// action types
const getDataType = 'GET_DATA';

// actions
export const getData = payload => ({
  type: getDataType,
  payload,
});

export const reducers = (state, action) => {
  switch (action.type) {
    case getDataType:
      return { ...state, data };
    default:
      return state;
  }
};

export default reducers;
