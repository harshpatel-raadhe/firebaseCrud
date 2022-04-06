import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {AsyncStorage} from 'react-native';
import {LocalStorageKey} from './src/Constants/LocalStorageKey';
import useCachedResources from './src/Hooks/useCachedResources';
import StackNavigator from './src/Navigation/StackNavigator';
import {View, Text, ActivityIndicator} from 'react-native';

const App = () => {
  const [userToken, setUserToken] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    AsyncStorage.getItem(LocalStorageKey.ACCESSTOKEN)
      .then(res => {
        if (res) {
          setUserToken(res);
        } else {
          setUserToken(null);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000000',
        }}>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 27,
            fontFamily: 'Poppins-SemiBold',
          }}>
          Loading
        </Text>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <StackNavigator token={userToken} />
      </NavigationContainer>
    );
  }
};

export default App;
