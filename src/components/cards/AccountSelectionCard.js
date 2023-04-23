import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { Colors } from '../../constant/Colors'
import Octicons from 'react-native-vector-icons/Octicons';
const AccountSelectionCard = (props) => {
  return (
    <TouchableOpacity
    onPress={
        props.onPress
    //   SelectItemsHandler(item.title);
    }
    style={[
      styles.smallbox,
      {elevation: props.id == props.selectedItem ? 12 : 2},
    ]}>
    <Image style={styles.image} source={props.image} />
    <Text style={[styles.font]}>{props.title}</Text>
    <Text style={styles.text}>{props.description}</Text>
    {props.id == props.selectedItem ? (
        <View style={styles.tickIcon}>

      <Octicons
        style={{}}
        color={'#089D0E'}
        name="check-circle-fill"
        size={30}
        />
        </View>
    ) : null}
  </TouchableOpacity>)
}

export default AccountSelectionCard

const styles = StyleSheet.create({
    smallbox: {
        width: 206,
        height: 226,
        marginHorizontal: 20,
        alignItems: 'center',
        marginVertical: 25,
        paddingBottom: 5,
        backgroundColor: Colors.themeWhite,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        borderRadius: 8,
      },
      font: {
        justifyContent: 'center',
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: 'rgba(0, 0, 0, 1)',
      },
      text: {
        color: '#000000B2',
        fontFamily: 'Poppins-Medium',
        width: '85%',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 14,
      },
      image: {
        alignSelf: 'center',
        marginTop: '10%',
        marginBottom: '5%',
      },
      tickIcon:{
        backgroundColor:"white",alignSelf: 'center',position:"absolute",bottom:-15,borderRadius:100
      }
})