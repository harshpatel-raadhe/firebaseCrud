import {StyleSheet, Text, View, AsyncStorage} from 'react-native';
import React, {useState, useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Home from '../Screens/Home';
import {LocalStorageKey} from '../Constants/LocalStorageKey';
import {AuthContext} from '../Hooks/AuthContext';

const StackNavigator = ({token}) => {
console.log("TOKEN in Stack", token)
  const [userToken, setUserToken] = useState(token);
  console.log("userToken",userToken)
  const AuthStack = createNativeStackNavigator();
  const MainStack = createNativeStackNavigator();

  const AuthAction = useMemo(() => {
    return {
      Login: res => {
        AsyncStorage.setItem(LocalStorageKey.ACCESSTOKEN, res);
        setUserToken(res);
      },
      LogOut: () => {
        setUserToken("")
        AsyncStorage.setItem(LocalStorageKey.ACCESSTOKEN, "");
      },
    };
  }, []);

  const GuestUser = () => {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <AuthStack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
      </AuthStack.Navigator>
    );
  };

  const ActiveUser = () => {
    return (
      <MainStack.Navigator>
        <MainStack.Screen name="Home" component={Home} />
      </MainStack.Navigator>
    );
  };

  return (
    <AuthContext.Provider value={AuthAction}>
      {userToken ? <ActiveUser /> : <GuestUser />}
    </AuthContext.Provider>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
