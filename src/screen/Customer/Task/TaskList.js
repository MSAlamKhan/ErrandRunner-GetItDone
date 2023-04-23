import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import TaskCard from '../../../components/cards/TaskCard';
import TwoWayHeader from '../../../components/header/TwoWayHeader';
import {Colors} from '../../../constant/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  get_Tasks,
  get_Tasks_completed,
} from '../../../redux/actions/CustomerAction';
import FullScreenLogin from '../../../components/Loader/FullScreenLoader';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import OneSignal from 'react-native-onesignal';
import AddTaskModal from '../../../components/modals/AddTaskModal';

const TaskList = () => {
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.auth.user_details.user_id);
  console.log('====================================');
  console.log('user ID :', user_id);
  console.log('====================================');
  const _getTasks = useSelector(state => state.customer.tasks_data);
  const _getTasksCompleted = useSelector(
    state => state.customer.tasks_data_completed,
  );
  console.log('====================================');
  console.log('TASKs FROM REDUX', _getTasks);
  console.log('====================================');
  const modal_status = useSelector(state => state.customer.modal_status);
  const [modalVisible, setVisible] = useState(false);
  const loading = useSelector(state => state.customer.is_loading);

  const [first, setFirst] = useState(true);

  const getTasks = () => {
    // console.log('userId', user_id);
    dispatch(get_Tasks(user_id, 'pending'));
  };
  const completedTasks = () => {
    // console.log('userId', user_id);
    dispatch(get_Tasks_completed(user_id, 'completed'));
  };
  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      let notification = notificationReceivedEvent.getNotification();
      OneSignal.add;
      getTasks();
      completedTasks();
      const data = notification.additionalData;
      notificationReceivedEvent.complete(notification);
    },
  );
  useFocusEffect(
    useCallback(() => {
      getTasks();
      completedTasks();
    }, [modalVisible]),
  );
  return loading ? (
    <FullScreenLogin />
  ) : (
    <View style={styles.container}>
      <AddTaskModal message={modal_status.message} visible={modalVisible} />

      <TwoWayHeader
        onPressRight={() => setFirst(false)}
        onPressLeft={() => setFirst(true)}
        style={styles.headerContainer}
        first={first}
        leftTitle="Current "
        rightTitle="Completed"
      />

      <FlatList
        data={first ? _getTasks : _getTasksCompleted.reverse()}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return (
            <TaskCard tasks={item} modalHandler={setVisible} index={index} />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeWhite,
  },
  headerContainer: {
    width: '70%',
    marginTop: '6%',
    marginBottom: 10,
  },
});
export default TaskList;
