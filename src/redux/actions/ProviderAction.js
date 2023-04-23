import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {base_Url, token} from '../../constant/BaseUrl';
import {IS_LOADING_AUTH, Response_Status} from '../reducers/AuthReducer';
import {
  BANK_DETAILS,
  CLEAR_ADDITIONAL_COST,
  COMPLETE_JOB,
  CUSTOMER_DETAILS,
  GET_BANK_DETAILS,
  MODAL_STATUS,
  SET_LOCATION,
  TRANSACTIONS_LOG,
} from '../reducers/ProviderReducer';
import RNLocation from 'react-native-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const addBankDetails = (data, user_id, setModalVisible, navigation) => {
  console.log('DIPSATCH', data);
  console.log('DIPSATCH', user_id);

  return async dispatch => {
    await dispatch({type: IS_LOADING_AUTH, payload: true});
    try {
      let base_url = `${base_Url}/add_bank_details.php`;
      let checkEmail = new FormData();
      checkEmail.append('token', token);
      checkEmail.append('user_id', user_id);
      checkEmail.append('bank_name', data.bankname);
      checkEmail.append('account_holder_name', data.accountName);
      checkEmail.append('iban_number', data.iban);

      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        console.log('resss of BANK DETAILSSS ', responseData);
        setModalVisible(true);
        await dispatch({type: Response_Status, payload: responseData});
        setTimeout(async () => {
          await dispatch({type: BANK_DETAILS, payload: responseData.data});
          // AsyncStorage.setItem(
          //   'bankDetails',
          //   JSON.stringify(responseData.data),
          // );
          navigation.goBack();
        }, 1500);

        await dispatch({type: IS_LOADING_AUTH, payload: false});
        //
      } else {
        await dispatch({type: IS_LOADING_AUTH, payload: false});
        await dispatch({type: Response_Status, payload: responseData});
        setModalVisible(true);
      }
    } catch (error) {
      console.log('error', error);
      await dispatch({type: IS_LOADING_AUTH, payload: false});
    }
  };
};

export const addCustomerDetails = (
  taskId,
  customerId,
  customerName,
  navigation,
  riderId,
  tasks,
  setVisible,
  modalVisiblityHandler,
  location,
) => {
  return async dispatch => {
    try {
      let base_url = `${base_Url}/rider/accept_task.php`;
      let formData = new FormData();
      formData.append('token', token);
      formData.append('task_id', taskId);
      formData.append('customer_id', customerId);
      formData.append('rider_id', riderId);
      formData.append('latitude', location.lat);
      formData.append('longitude', location.long);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      console.log('====================================');
      console.log('Response : ', responseData);
      console.log('====================================');
      if (responseData.status == true) {
        if (responseData.response_code == 207) {
          setVisible(true);
          await dispatch({
            type: MODAL_STATUS,
            payload: {
              status: responseData.status,
              message: responseData.message,
            },
          });
          setTimeout(() => {
            setVisible(false);
          }, 1500);
          modalVisiblityHandler(false);
        } else {
          setVisible(true);
          await dispatch({
            type: MODAL_STATUS,
            payload: {
              status: responseData.status,
              message: 'Request Accepted',
            },
          });
          await dispatch({
            type: CUSTOMER_DETAILS,
            payload: {
              taskId: taskId,
              customerId: customerId,
              tasks: tasks,
              customerName: customerName,
            },
          });
          await AsyncStorage.setItem('taskId', taskId);
          await AsyncStorage.setItem('customerId', customerId);
          await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
          await AsyncStorage.setItem('customerName', customerName);
          setTimeout(() => {
            setVisible(false);
            modalVisiblityHandler(false);
            navigation.navigate('taskList');
          }, 1000);
        }
      } else {
        console.log('first');
      }
    } catch (error) {
      console.log('====================================');
      console.log('Add Customer Error : ', error);
      console.log('====================================');
    }
  };
};

export const CompleteTask = (navigation, rider_id, task_id, setVisible) => {
  return async dispatch => {
    try {
      let base_url = `${base_Url}/rider/complete_job.php`;
      const formData = new FormData();
      formData.append('token', token);
      formData.append('task_id', task_id);
      formData.append('rider_id', rider_id);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      console.log('====================================');
      console.log('Response : ', responseData);
      console.log('====================================');
      if (responseData.status == true) {
        setVisible(true);
        dispatch({
          type: MODAL_STATUS,
          payload: {
            status: responseData.status,
            message: 'Request Completed',
          },
        });
        setTimeout(async () => {
          dispatch({
            type: COMPLETE_JOB,
            payload: null,
          });
          dispatch({type: CLEAR_ADDITIONAL_COST, payload: []});
          await AsyncStorage.removeItem('taskId'),
            await AsyncStorage.removeItem('customerId'),
            await AsyncStorage.removeItem('tasks'),
            await AsyncStorage.removeItem('customerName'),
            setVisible(false);
          navigation.navigate('statistic');
        }, 1000);
      } else {
        console.log('====================================');
        console.log('SOMETHING WENT WRONG!!');
        console.log('====================================');
      }
    } catch (error) {
      console.log('====================================');
      console.log(`ERROR ${error}`);
      console.log('====================================');
    }
  };
};

export const getTransectionLog = userId => {
  return async dispatch => {
    try {
      let base_url = `${base_Url}/rider/transactions_log.php`;
      const formData = new FormData();
      formData.append('token', token);
      formData.append('user_id', userId);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      console.log('====================================');
      console.log(
        `Response from get Transection of provider ${responseData.data}`,
      );
      console.log('====================================');
      if (responseData.status == true) {
        await dispatch({type: TRANSACTIONS_LOG, payload: responseData.data});
        console.log('====================================');
        console.log('success');
        console.log('====================================');
      } else {
        console.log('====================================');
        console.log('fail');
        console.log('====================================');
      }
    } catch (error) {
      console.log('====================================');
      console.log(`Error in get transection log ${error}`);
      console.log('====================================');
    }
  };
};

export const getbanks = userId => {
  return async dispatch => {
    try {
      let base_url = `${base_Url}/rider/fetch_banks.php`;
      const formData = new FormData();
      formData.append('token', token);
      formData.append('rider_id', userId);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      console.log('====================================');
      console.log('Response from get Banks of provider ', responseData);
      console.log('====================================');
      if (responseData.status == true) {
        await dispatch({type: GET_BANK_DETAILS, payload: responseData.data});
        console.log('====================================');
        console.log('BANK DETAILS ==>', responseData.data);
        console.log('====================================');
        console.log('====================================');
        console.log('success');
        console.log('====================================');
      } else {
        console.log('====================================');
        console.log('fail');
        console.log('====================================');
      }
    } catch (error) {
      console.log('====================================');
      console.log(`Error in get Bank ${error}`);
      console.log('====================================');
    }
  };
};
