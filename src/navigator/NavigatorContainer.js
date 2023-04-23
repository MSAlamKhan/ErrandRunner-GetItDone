import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStackNavigator} from './AuthNavigation';
import {
  ProviderBotTab,
  ProviderDashBoardStackNavigator,
} from './ProviderNavigator';
import {CustomerDashBoardStackNavigator} from './CustomerNavigator';
import {useSelector} from 'react-redux';

const AppNavigationContainer = () => {
  const userDetails = useSelector(state => state.auth.user_details);
  return (
    <NavigationContainer>
      {!userDetails && <AuthStackNavigator />}
      {userDetails && userDetails.role_id == 1 && (
        <CustomerDashBoardStackNavigator />
      )}
      {userDetails && userDetails.role_id == 2 && (
        <ProviderDashBoardStackNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
