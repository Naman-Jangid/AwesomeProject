import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
// import AuthNavigator from './AuthNavigator';
import {useAuthStore} from '../store/useAuthStore';
import {SCREEN} from '../utils/constants';
import {colors} from '../utils/colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/Auth/Signin';
import Home from '../screens/Home';
import DashBoard from '../screens/DashBoard';

const Stack = createNativeStackNavigator();
const Routes = () => {
  const {hasHydrated, setAllAvailableUsersInStore, isUserLoggedIn} =
    useAuthStore();

  useEffect(() => {
    // set all available users in store only when user is not logged in
    if (!isUserLoggedIn) {
      setAllAvailableUsersInStore();
    }
  }, [setAllAvailableUsersInStore, isUserLoggedIn]);

  if (!hasHydrated) {
    return (
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ActivityIndicator size="large" color={colors.singletons.darkText} />
      </View>
    );
  }

  return isUserLoggedIn ? (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name={SCREEN.SIGNIN}
        component={SignIn}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name={SCREEN.HOME}
        component={Home}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={SCREEN.DASHBOARD}
        component={DashBoard}
      />
    </Stack.Navigator>
  );
};

export default Routes;
