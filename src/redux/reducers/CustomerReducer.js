// user management

export const IS_LOADING_AUTH = 'IS_LOADING_AUTH';
export const IS_CUSTOMER_LOADING = 'IS_CUSTOMER_LOADING';
export const MENU_DATA = 'MENU_DATA';
export const MODAL_STATUS = 'MODAL_STATUS';
export const TASKS_DATA = 'TASKS_DATA';
export const TASKS_DATA_COMPLETED = 'TASKS_DATA_COMPLETED';
export const TRANSACTIONS_LOG = 'TRANSACTIONS_LOG';
export const ORDER_COMPLETED = 'ORDER_COMPLETED';
export const ADD_LOCATION = 'ADD_LOCATION';
export const GET_BALANCE = 'GET_BALANCE';
export const CLEAR_CUSTOMER_DATA = 'CLEAR_CUSTOMER_DATA';
// export const PICKUP_LOC = 'PICKUP_LOC';
// export const DROP_LOC = 'DROP_LOC';

const initial_state = {
  is_loading: true,
  // dashboard states
  menu_data: [],
  userData: {},
  modal_status: {},
  tasks_data: null,
  tasks_data_completed: [],
  transactions_Log: [],
  user_loc: {},
  balance: null,
  // pickUpLoc: [],
  // dropLoc: [],
};

const CustomerReducer = (state = initial_state, action) => {
  console.log(action.type == MODAL_STATUS ? action : null);
  switch (action.type) {
    case IS_CUSTOMER_LOADING:
      return {
        ...state,
        is_loading: action.payload,
      };
    case MENU_DATA:
      return {
        ...state,
        menu_data: action.payload,
      };
    case TASKS_DATA:
      return {
        ...state,
        tasks_data: action.payload,
      };
    case ADD_LOCATION:
      return {
        ...state,
        user_loc: action.payload,
      };
    case TASKS_DATA_COMPLETED:
      return {
        ...state,
        tasks_data_completed: action.payload,
      };
    case MODAL_STATUS:
      return {
        ...state,
        modal_status: action.payload,
      };
    case TRANSACTIONS_LOG:
      return {
        ...state,
        transactions_Log: action.payload,
      };
    case ORDER_COMPLETED:
      return {
        ...state,
        task_data: {},
      };
    case GET_BALANCE:
      return {
        ...state,
        balance: action.payload,
      };
    case CLEAR_CUSTOMER_DATA:
      return {
        is_loading: true,
        menu_data: [],
        userData: {},
        modal_status: {},
        tasks_data: null,
        tasks_data_completed: [],
        transactions_Log: [],
        user_loc: {},
        balance: null,
      };

    // case DROP_LOC:
    //   return {
    //     ...state,
    //     dropOffLoc: action.payload,
    //   };

    default: {
      return state;
    }
  }
};
export default CustomerReducer;
