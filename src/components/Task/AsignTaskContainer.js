import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Font} from '../../constant/Font';
import {Colors} from '../../constant/Colors';
import SquareIconButton from '../buttons/SquareIconButton';
import SmallBoxWithIcon from '../box/SmallBoxWithIcon';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import {scale} from 'react-native-size-matters-ch';
const AsignTaskContainer = props => {
  const data = props.data;
  const index = props.index;
  const location = props.location;
  const navigation = useNavigation();
  // const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('taskDetails', {
          details: data,
          index: index,
          location: location,
        })
      }>
      <View style={styles.taskcontainer}>
        <SmallBoxWithIcon style={styles.icon} icon={data.title} />
        <View style={styles.rightContainer}>
          <Text style={styles.taskText}>{data.name}</Text>
          {/* <CheckBox
            tintColors={{ true: Colors.themeRed, false: Colors.themeRed }}
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          /> */}
          {/* <Text style={styles.taskstatus}>{data.task_detail_status}</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AsignTaskContainer;

const styles = StyleSheet.create({
  taskcontainer: {
    // width: '50%',
    marginTop: 30,
    // backgroundColor: 'blue',
    // justifyContent: 'center',
    paddingLeft: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: '80%',
    paddingLeft: 20,
  },

  taskText: {
    fontFamily: Font.Poppins600,
    color: Colors.themeRed,
    fontSize: 20,
  },
  taskstatus: {
    fontFamily: Font.Poppins400,
    color: '#000',
    fontSize: scale(12),
  },
});
