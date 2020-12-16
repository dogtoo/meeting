import React, { useRef, useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  ScrollView,
  Dimensions,
} from 'react-native';

import { Redirect, useHistory, Link } from 'react-router-native';
import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';
//import { auth } from './firebase';
import { useStateValue } from './Auth';

import Head from './components/Head';
import Message from './components/Message';
import SideBar from './components/SideBar';
import Avatar from './components/Avatar';

export default function Main() {
  const [{ message, connUsers, auth, onSendUser }, dispatch] = useStateValue();
  const [msgSendText, setMsgSendText] = useState('hello');
  const [onMuiltLine, setOnMuiltLine] = useState(false);

  const handelOnContentSizeChange = () => {
    console.log('ContentSizeChange');
    setOnMuiltLine(true);
  };

  let history = useHistory();

  const styles = StyleSheet.create({
    main__container: {
      flex: 1,
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: '#000',
    },
    main__zindex: {
      zIndex: -1,
    },
    main__msgcontainer: {
      flexDirection: 'row-reverse',
      backgroundColor: '#fff',
      padding: 5,
    },
    main__msgbutton: {
      width: 50,
      borderRadius: 50,
    },
    main__msgcontent: {
      fontSize: 15,
      padding: 5,
      flex: 1,
      //height: onMuiltLine == true ? 60 : 30,
      borderWidth: 1,
      marginEnd: 5,
      borderRadius: 10,
    },
  });

  return (
    <View style={styles.main__container}>
      <SideBar />
      <Head />
      <ScrollView style={styles.main__zindex}>
        {/**/}
        {message.map(({ message, user, to, logo }, index) => {
          return <Message key={index} message={message} user={user} to={to} logo={logo} />;
        })}
      </ScrollView>

      <View style={styles.main__msgcontainer}>
        <Avatar
          logo={{ uri: 'https://img.icons8.com/bubbles/344/facebook-messenger.png' }}
          size={45}
          onPress={() => {
            dispatch({
              type: 'MESSAGE_ADD',
              payload: {
                user: auth.user.email,
                to: { id: onSendUser, logo: connUsers.find(u => u.id === onSendUser)?.logo },
                message: msgSendText,
                logo: auth.user.logo,
              },
            });
          }}
        />
        <Avatar
          logo={{ uri: "https://img.icons8.com/bubbles/344/apple-map.png" }}
          size={45}
          onPress={() => {
            history.push('Equipment');
          }}
        />

        <TextInput
          style={styles.main__msgcontent}
          value={msgSendText}
          multiline
          numberOflines={1}
          onChangeText={(text) => setMsgSendText(text)}
          onContentSizeChange={handelOnContentSizeChange}
        //onScroll={handelOnScroll}
        />
      </View>
    </View>
  );
}
