import React, {useState, forwardRef} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useController} from 'react-hook-form';
import {Colors} from '../constant/Colors';
import {Font} from '../constant/Font';
import {View, Text, TextInput, StyleSheet, Image, Platform} from 'react-native';

const GooglePlacesInput = props => {
  //   const {field} = useController({
  //     control: props.control,
  //     defaultValue: props.defaultValue || '',
  //     name: props.name,
  //     rules: props.rules,
  //   });
  return (
    <View style={[styles.field, props.style]}>
      {props.image ? <Image style={styles.image} source={props.image} /> : null}
      <GooglePlacesAutocomplete
        // value={props.value}
        textInputProps={props.textInputProps}
        ref={props.ref}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        placeholder={props.placeholder}
        style={[styles.input, props.textStyle]}
        keyboardType={props.keyboardType}
        textAlignVertical={props.textAlignVertical}
        onPress={props.onPress}
        fetchDetails={true}
        keepResultsAfterBlur={true}
        GooglePlacesDetailsQuery={props.GooglePlacesDetailsQuery}
        query={{
          key: 'AIzaSyCFiS3J95syNrmbl4JjQpWr8po9vXLzJvw',
          language: 'en',
          // types: '(cities)',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    borderBottomWidth: 1.8,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    // paddingBottom: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: scale(7),
    // marginTop: scale(10),
    borderRadius: 10,
  },

  image: {
    // width: scale(28),
    // height: scale(28),
    resizeMode: 'contain',
    // marginHorizontal: scale(15),
  },
  input: {
    // fontSize: moderateScale(16),
    color: Colors.black,
    fontWeight: '600',
    fontFamily: Font.Lato400,
    width: '100%',
    textInputContainer: {
      backgroundColor: 'black',
    },
  },
});

export default GooglePlacesInput;
