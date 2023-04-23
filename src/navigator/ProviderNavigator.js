import React, {useContext} from 'react';
import {Image, StyleSheet, View, TouchableOpacity, Text} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Font} from '../constant/Font';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//screen
import Statistic from '../screen/Provides/home/Statistic';
//components
import SquareIconButton from '../components/buttons/SquareIconButton';
import EmptyScreen from '../screen/EmptyScreen';
import CurrentTask from '../screen/Provides/task/CurrentTask';

import HeaderWithMidTitle from '../components/header/HeaderWithMidTitle';
import {ProfileStackNavigator} from './CustomerNavigator';
import {Colors} from '../constant/Colors';
import AddBankDetails from '../screen/Provides/wallet/AddBankDetails';
import Wallet from '../screen/Provides/wallet/ProvidesWallet';
import Notification from '../screen/Notification';
import Chat from '../screen/Chat';
import TaskDetailsScreen from '../screen/Provides/task/TaskDetails';
import ImageView from '../screen/ImageView';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const ProviderDashBoardStackNavigator = ({navigation}) => {
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
        component={ProviderBotTab}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="imageview"
        component={ImageView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="taskDetails"
        component={TaskDetailsScreen}
        options={{
          headerShown: true,
          title: 'Details',
          headerShadowVisible: false,
          headerTitle: props => <HeaderWithMidTitle {...props} />,
        }}
      />
      <Stack.Screen
        name="noti"
        component={Notification}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
  // return (
  //   <Stack.Navigator
  //     screenOptions={{
  //       headerStyle: {
  //         backgroundColor: Colors.themeWhite,
  //         elevation: 0,
  //         shadowOpacity: 0,
  //       },

  //       headerBackVisible: false,
  //     }}>
  //     <Stack.Screen
  //       name="bottomTab"
  //       component={ProviderBotTab}
  //       options={{headerShown: false}}
  //     />
  //     <Stack.Screen
  //       name="noti"
  //       component={Notification}
  //       options={{headerShown: false}}
  //     />
  //     <Stack.Screen
  //       name="chat"
  //       component={Chat}
  //       options={{headerShown: false}}
  //     />
  //     <Stack.Screen
  //       name="imageview"
  //       component={ImageView}
  //       options={{headerShown: false}}
  //     />
  //     <Stack.Screen
  //       name="taskDetails"
  //       component={TaskDetailsScreen}
  //       options={{
  //         headerShown: true,
  //         title: 'Details',
  //         headerShadowVisible: false,
  //         headerTitle: props => <HeaderWithMidTitle {...props} />,
  //       }}
  //     />
  //   </Stack.Navigator>
  // );
};

export const ProviderBotTab = navigation => {
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
      initialRouteName="statistic"
      screenOptions={{...defaultTabNavOptions}}>
      <Tab.Screen
        name="statistic"
        component={Statistic}
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
      <Tab.Screen
        name="taskList"
        component={CurrentTask}
        options={{
          // headerShown: false,
          //   tabBarLabel: language?.home,
          title: 'Current Task',
          tabBarShowLabel: false,
          tabBarVisible: false,
          headerShadowVisible: false,
          headerTitle: props => <HeaderWithMidTitle {...props} />,
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
        name="walletBotTab"
        component={WalletStackNavigator}
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
          tabBarShowLabel: false,
          tabBarVisible: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.focusedIcon : styles.notFocusedIcon}>
              <FontAwesome name="user" color={Colors.themeWhite} size={30} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export const WalletStackNavigator = ({navigation}) => {
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
        name="wallet"
        component={Wallet}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="bankDetails"
        component={AddBankDetails}
        options={{
          headerShadowVisible: false,
          headerTitle: props => <HeaderWithMidTitle {...props} />,
        }}
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
