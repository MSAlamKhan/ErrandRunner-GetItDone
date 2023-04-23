import React, {forwardRef} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';

import {useController} from 'react-hook-form';
import {Colors} from '../../constant/Colors';
import {Font} from '../../constant/Font';

const Input = forwardRef((props, ref) => {
  const {field} = useController({
    control: props.control,
    defaultValue: props.defaultValue || '',
    name: props.name,
    rules: props.rules,
  });

  // console.log('defaultValue', props.defaultValue);
  return (
    <View style={[styles.inputContainer, props.style]}>
      <TextInput
        value={field.value}
        ref={ref}
        // onChangeText={field.onChange}-++
        selectionColor={Colors.themeRed}
        multiline={props.multiline}
        style={[props.textStyle, styles.text]}
        placeholder={props.placeholder}
        onChangeText={field.onChange}
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
});
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
export default Input;
