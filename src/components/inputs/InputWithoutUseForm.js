import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {Colors} from '../../constant/Colors';
import {Font} from '../../constant/Font';

const InputWithoutUseForm = props => {
  return (
    <View style={[styles.inputContainer, props.style]}>
      <TextInput
        value={props.value}
        ref={props.ref}
        // onChangeText={field.onChange}-++
        selectionColor={Colors.themeRed}
        multiline={props.multiline}
        style={[props.textStyle, styles.text]}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        placeholderTextColor={props.placeholderTextColor}
        onSubmitEditing={props.onSubmitEditing}
        secureTextEntry={props.secureTextEntry}
        maxLength={props.maxLength}
        keyboardType={props.keyboardType}
        numberOfLines={props.numberOfLines}
        textAlignVertical={props.textAlignVertical}
        onFocus={props.onFocus}
      />
    </View>
  );
};

export default InputWithoutUseForm;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  text: {
    color: 'black',
    fontFamily: Font.Poppins500,
    lineHeight: 20,
  },
});
