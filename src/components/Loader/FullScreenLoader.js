import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';
const FullScreenLogin = () => {
  return (
    <View style={styles.container}>
       <Lottie
          style={{width: 250, height: 250}}
          source={require('../../assets/lootieFile/riderLoader.json')}
          autoPlay
          loop
          speed={0.8}
        />
    </View>
  )
}

export default FullScreenLogin

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
})