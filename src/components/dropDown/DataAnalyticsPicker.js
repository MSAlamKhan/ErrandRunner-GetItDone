import React from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../constant/Colors';

export default function DataAnalyticsPicker(props) {
  const [open, setOpen] = useState(false);

  return (
    <View style={{width: '40%'}}>
      <DropDownPicker
        placeholder="All Data"
        open={open}
        value={props.value}
        items={props.items}
        setOpen={setOpen}
        setValue={props.setValue}
        setItems={props.setItems}
        onChangeValue={props.onChange}
        showTickIcon={false}
        style={{borderColor: Colors.greyIconBorder}}
        textStyle={{
          color: Colors.themeRed,
          fontFamily: 'Poppins-Regular',
          fontSize: 15,
        }}
        ArrowDownIconComponent={() => (
          <Ionicons name="chevron-down" color={Colors.themeRed} size={25} />
        )}
        ArrowUpIconComponent={() => (
          <Ionicons name="chevron-up" color={Colors.themeRed} size={25} />
        )}
        dropDownContainerStyle={{
          borderColor: Colors.greyIconBorder,
        }}
      />
    </View>
  );
}
