import { describe, expect, test } from 'vitest';

import reducer, {
  finishPasswordSetup,
  initialState,
  loginSuccess,
} from './appSlice';

describe('[redux] appSlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should handle finishPasswordSetup properly', () => {
    expect(reducer(initialState, finishPasswordSetup())).toEqual({
      hasPassword: true,
      loggedIn: true,
    });
  });

  test('should handle loginSuccess properly', () => {
    expect(reducer(initialState, loginSuccess()).loggedIn).toBe(true);
  });
});
