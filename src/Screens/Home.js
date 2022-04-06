import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../Hooks/AuthContext';
import database from '@react-native-firebase/database';

import firestore, {firebase} from '@react-native-firebase/firestore';

const Home = () => {
  const {LogOut} = useContext(AuthContext);
  const [usersData, setUsersData] = useState([]);

  function writeUserData() {
    firebase
      .database()
      .ref('User/')
      .set({
        email: 'harsh@mailinator.com',
        fname: 'Harsh',
        lname: 'Patel',
      })
      .then(data => {
        //success callback
        console.log('data ', data);
        getAllUsers()
      })
      .catch(error => {
        //error callback
        console.log('error ', error);
      });
  }

  const getAllUsers = async () => {
    // const userRef = firestore().collection('User');

    // await userRef.on('value', snapshot => {
    //   console.log(
    //     '🚀 ~ file: Home.js ~ line 20 ~ getAllUsers ~ snapshot',
    //     snapshot,
    //   );
    //   console.log('User data: ', snapshot.val());
    // });
    // firebase.database()
    //   .ref('User')
    //   .on('value', snapshot => {
    //     console.log('User data: ', snapshot.val());
    //   });
    firebase
      .database()
      .ref('User/')
      .once('value', function (snapshot) {
        console.log(snapshot.val());
      });
    // await userRef
    //   .get()
    //   .then(querySnapshot => {
    //     console.log(
    //       '🚀 ~ file: SignUp.js ~ line 42 ~ userRef.get ~ querySnapshot',
    //       querySnapshot,
    //     );
    //     setUsersData(querySnapshot.docs);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  const deleteData = id => {
    firestore()
      .collection('User')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
        getAllUsers();
      });
  };

  useEffect(() => {
    // getAllUsers();
    writeUserData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text>Home</Text>
      {usersData &&
        usersData.map(item => {
          console.log('🚀 ~ file: Home.js ~ line 42 ~ Home ~ item', item);
          return (
            <View
              style={{
                height: 50,
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 16,
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text>Name : </Text>
                <Text>{item._data.FirstName}</Text>
                <Text>{item._data.LastName}</Text>
              </View>
              <Text>{item._data.Email}</Text>
              <Text
                onPress={() => {
                  deleteData(item._ref._documentPath._parts[1]);
                }}
                style={{
                  backgroundColor: 'red',
                  padding: 10,
                  borderRadius: 8,
                  color: '#fff',
                }}>
                Delete
              </Text>
            </View>
          );
        })}

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 10,
          left: 16,
          backgroundColor: 'lightblue',
          borderRadius: 8,
          width: Dimensions.get('screen').width - 32,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 16,
        }}>
        <Text
          style={{fontWeight: 'bold'}}
          onPress={() => {
            // Login('123');
            LogOut();
          }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
