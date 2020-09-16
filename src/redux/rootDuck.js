import { all } from 'redux-saga/effects'
import { combineReducers } from 'redux'

import * as customers from './ducks/customers.duck'
import * as employees from './ducks/employees.duck'

export const rootReducer = combineReducers({
  customers: customers.reducer,
  employees: employees.reducer,
})

export function* rootSaga() {
  yield all([
    customers.saga(),
    employees.saga(),
  ])
}
