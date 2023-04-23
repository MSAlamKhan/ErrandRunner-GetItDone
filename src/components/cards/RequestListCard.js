import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../constant/Colors';
import {Font} from '../../constant/Font';
import {addCustomerDetails} from '../../redux/actions/ProviderAction';
import CustomButton from '../buttons/CustomButton';
import AddTaskModal from '../modals/AddTaskModal';

const RequestTaskList = props => {
  const [data, setData] = useState(props.data);
  const [visible, setVisible] = useState(false);
  const modal_status = useSelector(state => state.provider.modal_status);
  const modalControl = props.modalVisiblityHandler;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const riderId = useSelector(state => state.auth.user_details.user_id);
  const ignoreHandler = taskId => {
    let filterData = data.filter(item => item.task_id != taskId);

    if (filterData.length == 0) {
      modalControl(false);
    }
    setData(filterData);
  };
  // console.log('====================================');
  // console.log('data in request Modal :', data[0].user_id);
  // console.log('====================================');

  return (
    <View>
      <AddTaskModal message={modal_status.message} visible={visible} />
      <FlatList
        data={data}
        renderItem={task => (
          <View style={styles.taskCardContainer}>
            <View style={styles.taskContainer}>
              <Text style={styles.titleText}> {task.item.username}</Text>
              <Text style={styles.categoryText}>Tasks</Text>
              <FlatList
                data={task.item.task_details}
                renderItem={taskItem => {
                  return (
                    <View>
                      <Text style={styles.categoryText}>
                        {taskItem.item.title}
                      </Text>
                      <Text style={styles.locationText}>
                        Pick Up Loaction : {taskItem.item.pickup_location}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>

            <Text style={styles.detailText}>Number Visiting Places:</Text>
            <Text style={styles.locationText}>
              {task.item.task_details.length}
            </Text>
            <Text style={styles.detailText}>
              Total Estimated Amount:
              <Text style={styles.locationText}> ${task.item.total}</Text>
            </Text>
            <Text style={styles.detailText}>DropOff Location :</Text>
            <Text style={styles.locationText}>
              {task.item.dropoff_location}
            </Text>
            <CustomButton
              title="Accept"
              style={styles.acceptButton}
              onPress={
                () => {
                  dispatch(
                    addCustomerDetails(
                      task.item.task_id,
                      task.item.user_id,
                      task.item.username,
                      navigation,
                      riderId,
                      task.item.task_details,
                      setVisible,
                      props.modalVisiblityHandler,
                      props.location,
                    ),
                  );
                  props.dataHandler([]);
                }
                // navigation.navigate('taskList', {
                //   customerID: task.item.user_id,
                //   tasks: task.item.task_details,
                //   customerName: task.item.username,
                //   taskId: task.item.task_id,
                // })
              } //user Id bhe pass hogi is ma!!
            />
            <CustomButton
              title="Ignore"
              style={styles.rejectButton}
              onPress={() => ignoreHandler(task.item.task_id)}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskCardContainer: {
    marginTop: 40,
    backgroundColor: Colors.themeWhite,
    padding: 25,
    marginHorizontal: 30,
    // paddingVertical: 20,

    borderRadius: 20,
  },
  taskContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleText: {
    fontFamily: Font.Poppins600,
    color: Colors.themeRed,
    fontSize: 20,
  },
  categoryText: {
    fontFamily: Font.Poppins500,
    color: Colors.themeRed,
    fontSize: 16,
  },
  detailText: {
    fontFamily: Font.Poppins500,
    color: Colors.themeRed,
    fontSize: 17,
    lineHeight: 24,
  },
  locationText: {
    fontFamily: Font.Poppins500,
    color: Colors.lightfont,
    fontSize: 14,
    lineHeight: 18,
  },
  acceptButton: {
    backgroundColor: Colors.buttonGreenBackground,
    marginTop: 10,
    width: '100%',
  },
  rejectButton: {
    backgroundColor: Colors.themeRed,
    marginTop: 10,
    width: '100%',
  },
});

export default RequestTaskList;
