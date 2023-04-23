import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Colors} from '../constant/Colors';
import {base_Url, token} from '../constant/BaseUrl';
import NotificationCard from '../components/cards/NotificationCard';
import SquareIconButton from '../components/buttons/SquareIconButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import FullScreenLogin from '../components/Loader/FullScreenLoader';
import {Font} from '../constant/Font';

const Notification = () => {
  // const user_id = useSelector(state => state.auth.user_details.user_id);
  const [noti, setNoti] = useState([]);

  const userId = useSelector(state => state.auth.user_details.user_id);
  const navigation = useNavigation();
  const fetchNotification = async () => {
    try {
      let base_url = `${base_Url}/get_notification.php`;
      let formData = new FormData();
      formData.append('token', token);
      formData.append('user_id', userId);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      if (responseData.status == true) {
        // console.log('notificaiton response', responseData);
        setNoti(responseData.data);
      }
    } catch (error) {
      console.log('error in notification', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotification();
    }),
  );

  // console.log('NOTIIIII', noti);

  return Object.keys(noti).length == 0 ? (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <SquareIconButton
          back={true}
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.notificationText}>Notifications</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: Colors.themeRed, fontFamily: Font.Poppins400}}>
          No notifications
        </Text>
      </View>
      <View style={{height: 10}}></View>
    </View>
  ) : (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <SquareIconButton
          back={true}
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.notificationText}>Notifications</Text>
      </View>
      <FlatList
        data={noti.reverse()}
        keyExtractor={item => item.id}
        renderItem={item => {
          return <NotificationCard item={item} />;
        }}
      />
      <View style={{height: 10}}></View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeWhite,
  },
  iconButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  notificationText: {
    flex: 1,
    paddingHorizontal: 70,
    paddingTop: 15,
    fontSize: 20,
    color: Colors.themeRed,
    fontFamily: 'Poppins-Regular',
  },
});
