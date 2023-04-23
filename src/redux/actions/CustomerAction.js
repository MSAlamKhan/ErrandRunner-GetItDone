import {base_Url, token} from '../../constant/BaseUrl';
import {IS_LOADING_AUTH, Response_Status} from '../reducers/AuthReducer';
import {
  GET_BALANCE,
  IS_CUSTOMER_LOADING,
  MENU_DATA,
  MODAL_STATUS,
  ORDER_COMPLETED,
  TASKS_DATA,
  TASKS_DATA_COMPLETED,
  TRANSACTIONS_LOG,
} from '../reducers/CustomerReducer';

// export const loc = location => {
//   return {
//     type: 'PICKUP_LOC',
//     payload: location,
//   };
// };

// export const dropLoc = location => {
//   return {
//     type: 'DROP_LOC',
//     payload: location,
//   };
// };

export const verifyEmail = (data, navigation, setModalVisible) => {
  return async dispatch => {
    await dispatch({type: IS_LOADING_AUTH, payload: true});
    try {
      let base_url = `${base_Url}/verifyEmail.php`;
      let checkEmail = new FormData();
      checkEmail.append('email', data.email);
      checkEmail.append('token', token);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.status === true) {
        setModalVisible(true);
        await dispatch({type: Response_Status, payload: responseData});

        setTimeout(() => {
          navigation.navigate('otp', {data, type: 'registration'});
          setModalVisible(false);
        }, 1500);
        await dispatch({type: IS_LOADING_AUTH, payload: false});

        //
      } else {
        await dispatch({type: Response_Status, payload: responseData});
        await dispatch({type: IS_LOADING_AUTH, payload: false});
        setModalVisible(true);
      }
    } catch (error) {
      console.log(error);
      // await dispatch({type: IS_LOADING, payload: false});
    }
  };
};

export const get_Menu = setFilteredDataSource => {
  return async dispatch => {
    dispatch({type: IS_CUSTOMER_LOADING, payload: true});
    try {
      let base_url = `${base_Url}/get_menu_items.php`;
      let formData = new FormData();
      formData.append('token', token);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        await dispatch({type: MENU_DATA, payload: responseData.data});
        setFilteredDataSource(responseData.data);
        await dispatch({type: IS_CUSTOMER_LOADING, payload: false});
      } else {
        await dispatch({type: Response_Status, payload: responseData});
        await dispatch({type: IS_CUSTOMER_LOADING, payload: false});
      }
    } catch (error) {
      await dispatch({type: IS_CUSTOMER_LOADING, payload: false});
      console.log(error);
      // await dispatch({type: IS_LOADING, payload: false});
    }
  };
};

export const get_Tasks = (user_id, status) => {
  // console.log('STATUS', status);
  return async dispatch => {
    dispatch({type: IS_CUSTOMER_LOADING, payload: true});
    try {
      let base_url = `${base_Url}/get_tasks.php`;
      let formData = new FormData();
      formData.append('token', token);
      formData.append('user_id', user_id);
      formData.append('status', status);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();

      if (responseData.status === true) {
        console.log('====================================');
        console.log('get task response data : ', responseData.data);
        console.log('====================================');
        await dispatch({type: TASKS_DATA, payload: responseData.data});
        await dispatch({type: IS_CUSTOMER_LOADING, payload: false});
      } else {
        await dispatch({type: Response_Status, payload: responseData});
        await dispatch({type: IS_CUSTOMER_LOADING, payload: false});
      }
    } catch (error) {
      await dispatch({type: IS_CUSTOMER_LOADING, payload: false});
      console.log('errorrrrrr', error);
      // await dispatch({type: IS_LOADING, payload: false});
    }
  };
};

export const get_Transactions = user_id => {
  return async dispatch => {
    dispatch({type: IS_CUSTOMER_LOADING, payload: true});
    try {
      let base_url = `${base_Url}/transactions_log.php`;
      let formData = new FormData();
      formData.append('token', token);
      formData.append('user_id', user_id);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        await dispatch({type: TRANSACTIONS_LOG, payload: responseData.data});
        await dispatch({type: IS_CUSTOMER_LOADING, payload: false});
      } else {
        await dispatch({type: Response_Status, payload: responseData});
        await dispatch({type: IS_CUSTOMER_LOADING, payload: false});
      }
    } catch (error) {
      await dispatch({type: IS_CUSTOMER_LOADING, payload: false});
      console.log('errorrrrrr', error);
      // await dispatch({type: IS_LOADING, payload: false});
    }
  };
};

export const get_Tasks_completed = (user_id, status) => {
  // console.log('STATUS', status);
  return async dispatch => {
    dispatch({type: IS_CUSTOMER_LOADING, payload: true});
    try {
      let base_url = `${base_Url}/get_tasks.php`;
      let formData = new FormData();
      formData.append('token', token);
      formData.append('user_id', user_id);
      formData.append('status', status);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      console.log('responseData in completed task : ', responseData.data);
      if (responseData.status === true) {
        await dispatch({
          type: TASKS_DATA_COMPLETED,
          payload: responseData.data,
        });
        await dispatch({type: IS_CUSTOMER_LOADING, payload: false});
      } else {
        await dispatch({type: Response_Status, payload: responseData});
        await dispatch({type: IS_CUSTOMER_LOADING, payload: false});
      }
    } catch (error) {
      await dispatch({type: IS_CUSTOMER_LOADING, payload: false});
      console.log('errorrrrrr', error);
      // await dispatch({type: IS_LOADING, payload: false});
    }
  };
};

export const proceed_Order = (
  input,
  user_id,
  dropOffLoc,
  dropCords,
  setVisible,
  navigation,
) => {
  return async dispatch => {
    dispatch({type: IS_CUSTOMER_LOADING, payload: true});
    try {
      let base_url = `${base_Url}/proceed_order.php`;
      let formData = new FormData();
      formData.append('token', token);
      formData.append('drop_location', dropOffLoc);
      formData.append('drop_lat', dropCords.latitude);
      formData.append('drop_lon', dropCords.longitude);
      formData.append('menu_item', JSON.stringify(input));
      formData.append('user_id', user_id);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      dispatch({type: MODAL_STATUS, payload: responseData});
      if (responseData.status === true) {
        console.log('input ====> ', input);
        await dispatch({type: IS_CUSTOMER_LOADING, payload: false});
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          navigation.navigate('dashboard');
        }, 1000);
      } else {
        await dispatch({type: IS_CUSTOMER_LOADING, payload: false});
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          // navigation.navigate('orderTracking');
        }, 1000);
      }
    } catch (error) {
      await dispatch({type: IS_CUSTOMER_LOADING, payload: false});
      console.log(error);
    }
  };
};

export const orderCompleted = (rider_id, task_id, user_id, setVisible) => {
  return async dispatch => {
    try {
      let base_url = `${base_Url}/mark_order_completed.php`;
      let formData = new FormData();
      formData.append('token', token);
      formData.append('rider_id', rider_id);
      formData.append('task_id', task_id);
      formData.append('user_id', user_id);

      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      dispatch({type: MODAL_STATUS, payload: responseData});
      if (responseData.status == true) {
        console.log('====================================');
        console.log(responseData);
        console.log('====================================');
        setVisible(true);
        setTimeout(async () => {
          await dispatch({type: ORDER_COMPLETED, payload: null});
          setVisible(false);
        }, 1000);
      } else {
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
        }, 1000);
      }
    } catch (error) {
      console.log('====================================');
      console.log(`ERROR IN COMPLETE JOB : ${error}`);
      console.log('====================================');
    }
  };
};

export const getWalletData = user_id => {
  return async dispatch => {
    try {
      let base_url = `${base_Url}/checkWalletBalance.php`;
      let formData = new FormData();
      formData.append('token', token);
      formData.append('user_id', user_id);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      if (responseData.status == true) {
        console.log('RESPONSE DATa', responseData);
        dispatch({
          type: GET_BALANCE,
          payload: responseData.current_balance,
        });
      }
    } catch (error) {
      console.log('eeeeeERRRE', error);
    }
  };
};
