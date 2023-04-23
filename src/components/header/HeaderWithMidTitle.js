import {StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'
import SquareIconButton from '../buttons/SquareIconButton'
import {Font} from '../../constant/Font'
import {Colors} from '../../constant/Colors'
import {useNavigation} from '@react-navigation/native'

const HeaderWithMidTitle = (props) => {
  console.log('1312', props)
  const navigation = useNavigation()
  return (
    <View style={styles.headerContainer}>
      <SquareIconButton
        back={true}
        style={{borderRadius: 5, borderWidth: 1, borderColor: Colors.lightfont}}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.titleText}>{props.children} </Text>
      <SquareIconButton
        notification={true}
        onPress={() => navigation.navigate('noti')}
      />
    </View>
  )
}

export default HeaderWithMidTitle

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 20,
    height: 70,
    marginTop: 20,
    // backgroundColor: 'red',
    width: '95%',
  },
  titleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.themeRed,
  },
})
