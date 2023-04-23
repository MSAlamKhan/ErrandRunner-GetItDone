import React, {useContext} from 'react';
import {Image, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from '../constant/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
//Screens
import Dashboard from '../screen/Customer/Home/Dashboard';
import AddDetails from '../screen/Customer/Home/AddDetails';
import Chat from '../screen/Chat';
import CheckOut from '../screen/Customer/Home/CheckOut';
import OrderTracking from '../screen/Customer/Home/OrderTracking';
import TaskList from '../screen/Customer/Task/TaskList';
import Wallet from '../screen/Customer/Wallet/Wallet';
import EditProfile from '../screen/Customer/Profile/EditProfile';
import ChangePassword from '../screen/Customer/Profile/ChangePassword';
import Stripe from '../screen/Stripe';
//components
import SquareIconButton from '../components/buttons/SquareIconButton';
import HeaderWithMidIcon from '../components/header/HeaderWithMidIcon';
import EmptyScreen from '../screen/EmptyScreen';
import Map from '../components/Map';
import DropOffMap from '../components/DropOffMap';

import {Font} from '../constant/Font';
import Notification from '../screen/Notification';
import ImageView from '../screen/ImageView';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export const CustomerDashBoardStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.themeWhite,
          elevation: 0,
          shadowOpacity: 0,
        },

        headerBackVisible: false,
      }}>
      <Stack.Screen
        name="bottomTab"
        component={CustomerBotTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="addDetails"
        component={AddDetails}
        options={{
          headerShadowVisible: false,
          headerTitle: props => <HeaderWithMidIcon {...props} />,
        }}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen name="map" component={Map} options={{headerShown: false}} />
      <Stack.Screen
        name="dropOffMap"
        component={DropOffMap}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="stripe"
        component={Stripe}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="checkout"
        component={CheckOut}
        // options={{headerShown: false}}
        options={{
          headerShadowVisible: false,
          headerTitle: props => <HeaderWithMidIcon {...props} />,
        }}
      />
      <Stack.Screen
        name="orderTracking"
        component={OrderTracking}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="imageview"
        component={ImageView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="noti"
        component={Notification}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export const CustomerBotTab = navigation => {
  const defaultTabNavOptions = {
    tabBarStyle: {
      backgroundColor: Colors.themeRed,
      height: 62,
      //color you want to change

      paddingBottom: 12,
    },
    tabBarActiveTintColor: Colors.themeWhite,
  };
  return (
    <Tab.Navigator
      initialRouteName="dashboard"
      screenOptions={{...defaultTabNavOptions}}>
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          //   tabBarLabel: language?.home,
          tabBarShowLabel: false,
          tabBarVisible: false,
          tabBarIcon: ({focused, color, size}) => (
            <View style={focused ? styles.focusedIcon : styles.notFocusedIcon}>
              <MaterialCommunityIcons
                name="home-outline"
                color={Colors.themeWhite}
                size={30}
              />
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="empty"
        component={EmptyScreen}
        options={{
          headerShown: false,
          //   tabBarLabel: language?.home,
          tabBarShowLabel: false,
          tabBarVisible: false,
          tabBarIcon: ({focused, color, size}) => (
            <View style={focused ? styles.focusedIcon : styles.notFocusedIcon}>
              <AntDesign name="addfile" color={Colors.themeWhite} size={30} />
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="taskList"
        component={TaskList}
        options={{
          headerShown: false,
          //   tabBarLabel: language?.home,

          tabBarShowLabel: false,
          tabBarVisible: false,
          tabBarIcon: ({focused, color, size}) => (
            <View style={focused ? styles.focusedIcon : styles.notFocusedIcon}>
              <Image
                source={require('../assets/images/task.png')}
                style={{height: 30, width: 30}}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="wallet"
        component={Wallet}
        options={{
          headerShown: false,
          //   tabBarLabel: language?.home,
          tabBarShowLabel: false,
          tabBarVisible: false,
          tabBarIcon: ({focused, color, size}) => (
            <View style={focused ? styles.focusedIcon : styles.notFocusedIcon}>
              <Ionicons
                name="wallet-outline"
                color={Colors.themeWhite}
                size={30}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileStackNavigator}
        options={{
          headerShown: false,
          //   tabBarLabel: language?.home,

          tabBarShowLabel: false,
          tabBarVisible: false,
          tabBarIcon: ({focused, color, size}) => (
            <View style={focused ? styles.focusedIcon : styles.notFocusedIcon}>
              <FontAwesome name="user" color={Colors.themeWhite} size={30} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: false,

        headerShadowVisible: false,
        headerTitle: props => <HeaderWithMidIcon {...props} />,
      }}>
      <Stack.Screen
        name="editProfile"
        component={EditProfile}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="changePassword"
        component={ChangePassword}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  focusedIcon: {
    marginBottom: 20,
    borderWidth: 8,
    height: 60,
    alignItems: 'center',
    aspectRatio: 1 / 1,
    borderRadius: 100,

    justifyContent: 'center',
    backgroundColor: Colors.themeRed,
    borderColor: Colors.themeWhite,
  },
  notFocusedIcon: {},
});
