import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {Colors} from '../../constant/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {Font} from '../../constant/Font';
const SearchInput = props => {
  return (
    <View style={styles.searchContainer}>
      <Feather
        style={{paddingLeft: 10}}
        name="search"
        size={20}
        color={' rgba(19, 15, 38, 0.3)'}
      />
      <TextInput
        style={{
          paddingLeft: 10,
          fontFamily: Font.Poppins400,
          color: Colors.greyfont,
        }}
        placeholder="Search  "
        placeholderTextColor={'grey'}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: Colors.textInputBackground,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
