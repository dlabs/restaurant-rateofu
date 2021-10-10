import { createSelector } from 'reselect';
import { RootState } from '../rootReducer'

export const accessTokenSelector =  (state: RootState) => state.staffReducer.accessToken;
export const isAuthenticatedSelector =  createSelector(accessTokenSelector, (accessToken) => !!accessToken);

