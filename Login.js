import React, { Component, useState, useContext } from 'react';
import { Text, View, SafeAreaView,StyleSheet, TextInput, Button, Image } from 'react-native';
import { useHistory, Redirect } from 'react-router-native';
import { useStateValue } from './Auth';

function Login() {
  const [{auth}, dispatch] = useStateValue();
  const [email, setEmail] = useState(null);
  const [passwd, setPasswd] = useState(null);
  const history = useHistory();
  const login = () => {
    dispatch({
      type: 'LOGIN',
      payload: {
        user:{email}
      }
    });
    history.push('/');
  };

  return (
    <SafeAreaView style={styles.login__container}>
        <Image style={styles.login__titleImage} source={{ uri: 'https://' }} />
      <View style={styles.login__textimage}>
        <Image
          source={{
            uri:
              'https://github.com/AboutReact/sampleresource/blob/master/input_username.png?raw=true',
          }}
          style={styles.login__image}
        />
        <TextInput
          style={styles.login__textinput}
          onChangeText={(text) => setEmail(text)}
          placeholder="E-Mail"
          value={email}
        />
      </View>
      <View style={styles.login__textimage}>
        <Image
          source={{
            uri:
              'https://github.com/AboutReact/sampleresource/blob/master/input_phone.png?raw=true',
          }}
          style={styles.login__image}
        />
        <TextInput
          style={styles.login__textinput}
          onChangeText={(text) => setPasswd(text)}
          secureTextEntry={true}
          placeholder="Password"
          value={passwd}
        />
      </View>

      <View style={styles.login__loginbutton}>
        <Button
          onPress={() => {
            login();
          }}
          title="Login"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  login__container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  login__titleImage: {
    backgroundColor: '#aaa',
    height: 100,
    width: 100,
  },
  login__textimage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  login__textinput: {
    height: 40,
    width: 200,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  login__image: {
    padding: 10,
    margin: 5,
    height: 30,
    width: 30,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  login__loginbutton: {
    marginTop: 10,
    width: 250,
  },
});

export default Login;
