import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {AuthContext} from '../Hooks/AuthContext';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {Login} = useContext(AuthContext);

  const LoginAPI = async () => {
    setIsLoading(true);
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('🚀 ~ file: Login.js ~ line 23 ~ LoginAPI ~ res', res);
        Login(`${res.user._user.uid}`)
      })
      .catch(err => {
        console.log(err);
        Alert.alert(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const validation = () => {
    if (email.length == 0) {
      Alert.alert('Fill email.');
    }

    if (password.length == 0) {
      Alert.alert('Fill Password.');
    }

    if (password && email) {
      LoginAPI();
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        value={email}
        placeholder={'Email'}
        onChangeText={value => {
          setEmail(value);
        }}
        style={{
          height: 50,
          width: Dimensions.get('screen').width - 32,
          borderColor: 'black',
          borderWidth: 2,
          borderRadius: 8,
          paddingHorizontal: 16,
        }}
      />
      <TextInput
        value={password}
        placeholder={'Password'}
        onChangeText={value => {
          setPassword(value);
        }}
        style={{
          height: 50,
          width: Dimensions.get('screen').width - 32,
          borderColor: 'black',
          borderWidth: 2,
          borderRadius: 8,
          marginTop: 16,
          paddingHorizontal: 16,
        }}
      />
      <TouchableOpacity
        style={{
          marginTop: 16,
          backgroundColor: 'lightblue',
          borderRadius: 8,
          width: Dimensions.get('screen').width - 64,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 16,
        }}>
        {isLoading ? (
          <ActivityIndicator color={'#fff'} />
        ) : (
          <Text
            style={{fontWeight: 'bold'}}
            onPress={() => {
              validation();
            }}>
            Login
          </Text>
        )}
      </TouchableOpacity>
      <Text style={{marginTop: 16}}>
        Don't have account,{' '}
        <Text
          style={{color: 'red', fontWeight: 'bold'}}
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          SignUp
        </Text>
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
