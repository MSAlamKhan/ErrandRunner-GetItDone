import React from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../constant/Colors';
import {Font} from '../../constant/Font';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import SquareIconButton from '../buttons/SquareIconButton';
import CustomButton from '../buttons/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {orderCompleted} from '../../redux/actions/CustomerAction';
import {TASKS_DATA} from '../../redux/reducers/CustomerReducer';
const TaskCard = ({tasks, modalHandler, index}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log('====================================');
  console.log(`Completed tasks : ${tasks}`);
  console.log('====================================');
  const user_id = useSelector(state => state.auth.user_details.user_id);
  const taskData = useSelector(state => state.customer.tasks_data);
  console.log('====================================');
  console.log(` taskDAta`, taskData);
  console.log('====================================');

  // console.log('====================================');
  // console.log('Rider ID : ', riderId);
  // console.log('====================================');
  // console.log('Tasks', tasks);
  return (
    <View style={styles.cardContainer}>
      <Text
        style={{
          ...styles.statusText,
          textAlign: 'center',
          fontSize: 20,
          paddingBottom: 10,
        }}>
        Request Number : {tasks.task_id}
      </Text>
      <FlatList
        data={tasks.task_details}
        renderItem={(task, index) => (
          <>
            <Text style={styles.statusText}>{task.item.title}</Text>
            <Text style={styles.text}>Item : {task.item.name}</Text>
            <Text style={styles.text}>
              Description :{task.item.description}
            </Text>
            <Text style={styles.text}>
              Pickup Location: {task.item.pickup_location}{' '}
            </Text>
          </>
        )}
      />
      <Text style={styles.text}>
        Dropoff Location: {tasks.dropoff_location}
      </Text>
      <Text style={styles.text}>Total Estimated Cost: ${tasks.total}</Text>
      <Text style={styles.statusText}>Status: {tasks.status}</Text>
      {tasks.status == 'inprogress' ? (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              margin: 5,
            }}>
            <Text style={styles.chatStatusText}>
              {taskData ? taskData[index].rider_name : null}
            </Text>
            <SquareIconButton
              onPress={() =>
                navigation.navigate('chat', {
                  id: taskData ? taskData[index].rider_id : null,
                  name: taskData ? taskData[index].rider_name : null,
                })
              }
              style={styles.iconStyle}
              message={true}
            />
          </View>
          <View style={{margin: 10}}>
            <CustomButton
              title={'Track Progress'}
              onPress={() =>
                navigation.navigate('orderTracking', {
                  data: tasks.task_details,
                  riderName: taskData[index].rider_name,
                  riderID: taskData[index].rider_id,
                  riderLocation: {
                    lat: taskData[index].rider_latitude,
                    long: taskData[index].rider_longitude,
                  },
                })
              }
            />
          </View>
          {tasks.task_details.every(
            item => item.task_detail_status == 'completed',
          ) ? (
            <CustomButton
              title={'Recived'}
              onPress={() => {
                dispatch(
                  orderCompleted(
                    taskData ? taskData[index].rider_id : null,
                    tasks.task_id,
                    user_id,
                    modalHandler,
                  ),
                );
                const itemIndex = taskData.indexOf(tasks.task_id);
                taskData.splice(itemIndex, 1);
                dispatch({type: TASKS_DATA, payload: taskData});
              }}
              style={{backgroundColor: Colors.buttonGreenBackground}}
            />
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.ContainerBg,
    marginHorizontal: 20,
    marginVertical: 7,
    padding: 10,
    borderRadius: 20,
  },
  text: {
    fontFamily: Font.Poppins500,
    color: Colors.darkfont,
  },
  statusText: {
    fontFamily: Font.Poppins600,
    color: Colors.themeRed,
    fontSize: 16,
  },
  chatStatusText: {
    fontFamily: Font.Poppins600,
    color: Colors.themeRed,
    fontSize: 20,
  },
  iconStyle: {
    backgroundColor: Colors.themeWhite,
    padding: 10,
    borderColor: '#CDCDCD',
    borderRadius: 100,
    borderWidth: 1,
  },
});
export default TaskCard;
