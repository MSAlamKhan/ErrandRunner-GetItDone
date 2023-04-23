import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Authentication from '../screen/Authentication/Authentication';
import ChangePassword from '../screen/Authentication/ChangePassword';
import ForgotPassword from '../screen/Authentication/ForgotPassword';
import VerifyOTP from '../screen/Authentication/VerifyOTP';

import AccountType from '../screen/Authentication/AccountType';
const AuthStack = createNativeStackNavigator();
export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="authentication"
        component={Authentication}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        options={{headerShown: false}}
        name="changePassowrd"
        component={ChangePassword}
      />
      <AuthStack.Screen
        options={{headerShown: false}}
        name="forgotPassword"
        component={ForgotPassword}
      />
      <AuthStack.Screen
        name="accountType"
        component={AccountType}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        options={{headerShown: false}}
        name="otp"
        component={VerifyOTP}
      />
      
    </AuthStack.Navigator>
  );
};
