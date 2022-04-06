import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

const SignUp = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validation = () => {
    if (firstName.length == 0) {
      Alert.alert('Fill First Name.');
    }

    if (lastName.length == 0) {
      Alert.alert('Fill Last Name.');
    }

    if (phone.length == 0) {
      Alert.alert('Fill Phone.');
    }

    if (password.length == 0) {
      Alert.alert('Fill Password.');
    }

    if (email.length == 0) {
      Alert.alert('Fill email.');
    }

    if (firstName && lastName && password && phone && email) {
      SignUpAPI();
    }
  };

  const SignUpAPI = () => {
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('resOfSignUp', res);
        let uid = res?.user?._user.uid;
        addUserInfo();
      })
      .catch(err => {
        console.log(err.message);
        Alert.alert(err.message);
      });
  };

  const addUserInfo = async () => {
    const userRef = firestore().collection('User');

    userRef
      .add({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        PhoneNumber: phone,
      })
      .then(res => {
        console.log('User added!', res);
        navigation.navigate('Login');
      })
      .catch(err => {
        console.log(err);
        Alert.alert(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        value={firstName}
        placeholder={'First Name'}
        onChangeText={value => {
          setFirstName(value);
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
      <TextInput
        value={lastName}
        placeholder={'Last Name'}
        onChangeText={value => {
          setLastName(value);
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
      <TextInput
        value={phone}
        placeholder={'Phone Number'}
        onChangeText={value => {
          setPhone(value);
        }}
        keyboardType={'number-pad'}
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
      <TextInput
        value={email}
        placeholder={'Email'}
        keyboardType={'email-address'}
        onChangeText={value => {
          setEmail(value);
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

      {isLoading ? (
        <ActivityIndicator color={'#fff'} />
      ) : (
        <TouchableOpacity
          onPress={() => {
            validation();
          }}
          style={{
            marginTop: 16,
            backgroundColor: 'lightblue',
            borderRadius: 8,
            width: Dimensions.get('screen').width - 64,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 16,
          }}>
          <Text style={{fontWeight: 'bold'}}>Sign Up</Text>
        </TouchableOpacity>
      )}
      <Text style={{marginTop: 16}}>
        Already have an account,{' '}
        <Text
          style={{color: 'red', fontWeight: 'bold'}}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          Login
        </Text>
      </Text>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
