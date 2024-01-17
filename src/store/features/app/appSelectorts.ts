import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../store';

export const selectHasPassword = createSelector(
  (state: RootState) => state,
  (state) => state.app.hasPassword
);

export const selectIsLoggedIn = createSelector(
  (state: RootState) => state,
  (state) => !!state.app.loggedIn
);
