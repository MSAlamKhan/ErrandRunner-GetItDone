import {s} from 'react-native-size-matters';

export const BANK_DETAILS = 'BANK_DETAILS';
export const GET_BANK_DETAILS = 'GET_BANK_DETAILS';
export const CUSTOMER_DETAILS = 'CUSTOMER_DETAILS';
export const MODAL_STATUS = 'MODAL_STATUS';
export const COMPLETE_JOB = 'COMPLETE_JOB';
export const TRANSACTIONS_LOG = 'TRANSACTIONS_LOG';
export const SET_LOCATION = 'LOCATION';
export const SET_ADDITIONAL_COST = 'SET_ADDITIONAL_COST';
export const MY_INTERVAL = 'MY_INTERVAL';
export const CLEAR_ADDITIONAL_COST = 'CLEAR_ADDITIONAL_COST';
export const CLEAR_RIDER_DATA = 'CLEAR_RIDER_DATA';

const initial_state = {
  add_bank_details: [],
  get_bank_details: [],
  customerID: null,
  taskId: null,
  customerName: null,
  taskDetails: [],
  modal_status: {},
  sub_task_status: 'inprogress',
  transactions_Log: [],
  my_interval: null,
  addCost: [],
};
const ProviderReducer = (state = initial_state, action) => {
  switch (action.type) {
    case BANK_DETAILS:
      return {
        ...state,
        add_bank_details: action.payload,
      };
    case GET_BANK_DETAILS:
      return {
        ...state,
        get_bank_details: action.payload,
      };
    case TRANSACTIONS_LOG:
      return {
        ...state,
        transactions_Log: action.payload,
      };

    case CUSTOMER_DETAILS:
      return {
        ...state,
        customerID: action.payload.customerId,
        taskId: action.payload.taskId,
        taskDetails: action.payload.tasks,
        customerName: action.payload.customerName,
      };
    case MODAL_STATUS:
      return {
        ...state,
        modal_status: action.payload,
      };
    case MY_INTERVAL:
      return {
        ...state,
        my_interval: action.payload,
      };
    case COMPLETE_JOB:
      return {
        ...state,
        customerID: null,
        taskId: null,
        taskDetails: [],
        customerName: null,
      };
    case SET_ADDITIONAL_COST:
      return {
        ...state,
        addCost: [...state.addCost, action.payload.additionalCost],
      };
    case CLEAR_ADDITIONAL_COST:
      return {
        ...state,
        addCost: action.payload,
      };
    case CLEAR_RIDER_DATA:
      return {
        add_bank_details: [],
        get_bank_details: [],
        customerID: null,
        taskId: null,
        customerName: null,
        taskDetails: [],
        modal_status: {},
        sub_task_status: 'inprogress',
        transactions_Log: [],
        my_interval: null,
        addCost: [],
      };
    default: {
      return state;
    }
  }
};

export default ProviderReducer;
