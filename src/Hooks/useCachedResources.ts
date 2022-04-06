// import * as Font from 'expo-font';

import React from 'react';
import SplashScreen from 'react-native-splash-screen';

/**
 * custom hook for loading font and to show splash screen untill font load
 */
export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      setLoadingComplete(true);
      SplashScreen.hide();
    }
    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
