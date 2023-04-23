import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../constant/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SendMessageInput = props => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholderTextColor={'grey'}
        placeholder="Type message Here ..."
        onChangeText={text => props.textController(text)}
        value={props.text}
        style={styles.input}
        selectionColor={'red'}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={props.onPickImage}>
          <MaterialCommunityIcons
            name="file-image-plus"
            color={Colors.themeRed}
            style={{ marginRight: 5 }}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onSendHandler}>
          <FontAwesome
            name="arrow-circle-right"
            color={props.text ? Colors.themeRed : 'gray'}
            size={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendMessageInput;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: Colors.textInputBackground,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    color: Colors.darkfont,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
});