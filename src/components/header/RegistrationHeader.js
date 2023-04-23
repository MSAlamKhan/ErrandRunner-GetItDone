import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors } from '../../constant/Colors';

const Signup = props => {
    return (
        <View style={styles.headerContainer}>
            <Text
                onPress={props.onPressLogin}
                style={
                    props.login ? styles.selectedHeaderText : styles.unSelectedHeaderText
                }>
                Login
            </Text>
            <Image
                style={styles.logo}
                source={require('../../assets/images/redhand.png')}
            />
            <Text
                onPress={props.onPressSignup}
                style={
                    props.login ? styles.unSelectedHeaderText : styles.selectedHeaderText
                }>
                Signup
            </Text>
        </View>
    );
};

export default Signup;

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: '18%',
        width: '60%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    selectedHeaderText: {
        color: Colors.themeRed,
        fontSize: 20,
        borderBottomWidth: 1,
        fontFamily: 'Poppins-Bold',
        borderBottomColor: Colors.themeRed,
    },
    unSelectedHeaderText: {
        color: Colors.unselectedText,
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
    },
});