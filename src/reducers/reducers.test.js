import { getData, reducers } from '.';

describe('reducers', () => {
  it('should handle a getData action', () => {
    const actual = reducers({}, getData());
    expect(actual.data).toBeTruthy();
    expect(actual.data[0].state).toEqual('Kentucky');
  });

  it('should handle an unknown action', () => {
    const actual = reducers({}, { type: 'invalid' });
    expect(actual).toEqual({});
  });
});
