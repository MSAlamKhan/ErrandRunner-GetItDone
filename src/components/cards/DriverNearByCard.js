import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import CustomButton from '../buttons/CustomButton';
import { Colors } from '../../constant/Colors';
import { Font } from '../../constant/Font';
import SquareIconButton from '../buttons/SquareIconButton';

const DriverNearByCard = props => {
    return (
        <View style={styles.cardContainer}>
            <Image
                source={{
                    uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
                }}
                style={styles.image}
            />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    width: '80%',
                }}>
                <View>
                    <Text style={styles.nameText}>{props.name}</Text>
                    <Text style={styles.distanceText}>5 minutes away</Text>
                </View>
                <SquareIconButton style={styles.iconStyle} message={true} />
            </View>
        </View>
    );
};

export default DriverNearByCard;

const styles = StyleSheet.create({
    image: {
        width: '18%',
        aspectRatio: 1 / 1,
        borderRadius: 100,
    },
    cardContainer: {
        backgroundColor: Colors.ContainerBg,
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 10,
        marginVertical: 5,
    },

    nameText: {
        color: Colors.darkfont,
        fontFamily: Font.Poppins500,
        lineHeight: 18,
    },
    distanceText: {
        color: Colors.lightfont,
        fontFamily: Font.Poppins400,
        lineHeight: 18,
        fontSize: 13,
    },
    iconStyle: {
        backgroundColor: Colors.themeWhite,
        padding: 10,
        borderColor: '#CDCDCD',
        borderRadius: 100,
        borderWidth: 1,
    },
});