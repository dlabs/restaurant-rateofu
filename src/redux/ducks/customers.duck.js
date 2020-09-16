import { all, takeLatest, call, put } from 'redux-saga/effects'
import firebase from '../../services/firebase'
import ReduxSagaFirebase from 'redux-saga-firebase'

const rsf = new ReduxSagaFirebase(firebase)

const initialState = {}

export const actionTypes = {
  PLACE_ORDER_REQUEST: 'CUSTOMERS.PLACE_ORDER_REQUEST',
  PLACE_ORDER_SUCCESS: 'CUSTOMERS.PLACE_ORDER_SUCCESS',
  PLACE_ORDER_FAILURE: 'CUSTOMERS.PLACE_ORDER_FAILURE',
}

export const reducer = function(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.PLACE_ORDER_REQUEST:
      return { ...state }
    case actionTypes.PLACE_ORDER_SUCCESS:
      return { ...state }
    case actionTypes.PLACE_ORDER_FAILURE:
      return { ...state }
    default:
      return state
  }
}

export const actions = {
  placeOrderRequest: (menuItems, onSuccess) => ({
    type: actionTypes.PLACE_ORDER_REQUEST,
    menuItems,
    onSuccess,
  }),
  placeOrderSuccess: receiptId => ({
    type: actionTypes.PLACE_ORDER_SUCCESS,
    receiptId,
  }),
  placeOrderFailure: error => ({
    type: actionTypes.PLACE_ORDER_FAILURE,
    error,
  }),
}

function* placeOrderSaga(action) {
  try {
    const result = yield call(
      rsf.firestore.addDocument,
      'orders',
      {items: action.menuItems}
    )
    const receiptId = result.id
    yield put(actions.placeOrderSuccess(receiptId))
    action.onSuccess()
  } catch (error) {
    console.error(error)
    yield put(actions.placeOrderFailure(error))
  }
}

export function* saga() {
  yield all([takeLatest(actionTypes.PLACE_ORDER_REQUEST, placeOrderSaga)])
}
