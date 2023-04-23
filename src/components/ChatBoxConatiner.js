import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../constant/Colors';
import {Font} from '../constant/Font';
import {verticalScale, scale} from 'react-native-size-matters-ch';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const ChatBoxConatiner = props => {
  const userId = useSelector(state => state.auth.user_details.user_id);
  const navigation = useNavigation();
  const data = props.data;
  return (
    <View
      style={[
        styles.chatBoxContainer,
        {
          flexDirection: data.sender_id == userId ? 'row-reverse' : 'row',
          paddingLeft: data.sender_id == userId ? 10 : 10,
        },
      ]}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor:
              data.sender_id == userId
                ? Colors.themeRed
                : Colors.themeRedLightest,
          },
        ]}>
        {data.data_type == 'text' ? (
          <Text
            style={[
              styles.messageText,
              {
                color:
                  data.sender_id == userId
                    ? Colors.themeWhite
                    : Colors.darkfont,
              },
            ]}>
            {data.user_massage}
          </Text>
        ) : (
          <Pressable
            onPress={() =>
              navigation.navigate('imageview', {
                image: `${
                  'https://sassolution.org/getitdone/API/' + data.user_massage
                }`,
              })
            }
            style={{
              height: verticalScale(150),
              width: scale(200),
              margin: 5,
            }}>
            <Image
              resizeMode="cover"
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 12,
              }}
              source={{
                uri: `${
                  'https://sassolution.org/getitdone/API/' + data.user_massage
                }`,
              }}
            />
          </Pressable>
        )}
      </View>
      <Text style={styles.timeText}>{data.created_at}</Text>
    </View>
  );
};

export default ChatBoxConatiner;

const styles = StyleSheet.create({
  chatBoxContainer: {
    flexDirection: 'row',
    // marginVertical: 5,
    alignItems: 'center',
    paddingVertical: 5,

    paddingLeft: 10,
  },
  messageBox: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 12,

    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    maxWidth: '80%',
  },
  messageText: {
    color: Colors.darkfont,
    fontFamily: Font.Poppins400,
  },
  timeText: {
    color: Colors.darkfont,
    fontFamily: Font.Poppins700,
    fontSize: 10,
    marginTop: 5,
    paddingLeft: 5,

    paddingRight: 10,
  },
});
