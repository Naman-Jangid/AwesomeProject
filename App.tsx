import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/navigation/Routes';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {colors} from './src/utils/colors';
import {useAuthStore} from './src/store/useAuthStore';

const App = (): React.JSX.Element => {
  const {hasHydrated, token} = useAuthStore();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? colors.singletons.black : colors.primary[100],
  };

  useEffect(() => {
    if (!!token && hasHydrated) {
      // setupAuthAxios(REACT_APP_API_BASE_URL, token);
    }
  }, [token, hasHydrated]);
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Routes />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
