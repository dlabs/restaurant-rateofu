import { all, call, put, takeLatest } from 'redux-saga/effects'
import ReduxSagaFirebase from 'redux-saga-firebase'
import firebase from '../../services/firebase'

const rsf = new ReduxSagaFirebase(firebase)

const initialState = {
  userRole: null,
  userName: null,
}

export const actionTypes = {
  LOGIN_REQUEST: 'CUSTOMERS.LOGIN_REQUEST',
  LOGIN_SUCCESS: 'CUSTOMERS.LOGIN_SUCCESS',
  LOGIN_FAILURE: 'CUSTOMERS.IDENTIFY_FAILURE',
}

export const reducer = function(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return { ...state }
    case actionTypes.LOGIN_SUCCESS:
      return { ...state }
    case actionTypes.LOGIN_FAILURE:
      return { ...state }
    default:
      return state
  }
}

export const actions = {
  employeeLoginRequest: (name, role, onSuccess) => ({
    type: actionTypes.LOGIN_REQUEST,
    name,
    role,
    onSuccess,
  }),
  employeeLoginSuccess: () => ({
    type: actionTypes.LOGIN_SUCCESS,
  }),
  employeeLoginFailure: error => ({
    type: actionTypes.LOGIN_FAILURE,
    error,
  }),
}

function* loginEmployeeSage(action) {
  try {
    const payload = {
      name: action.name,
      role: action.role,
    }
    const result = yield call(rsf.firestore.addDocument, 'employees', {
      ...payload,
      isLoggedIn: true,
    })
    yield put(actions.employeeLoginSuccess())
    payload.id = result.id
    action.onSuccess(payload)
  } catch (error) {
    yield put(actions.employeeLoginFailure(error))
  }
}

export function* saga() {
  yield all([takeLatest(actionTypes.LOGIN_REQUEST, loginEmployeeSage)])
}
