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
import { auth } from './firebase';
import { useStateValue } from './Auth';

import Head from './components/Head';
import Asset from './components/AssetExample';
import SideBar from './components/SideBar';

export default function Main() {
  const [{ message }, dispatch] = useStateValue();
  const [msgSendText, setMsgSendText] = useState('hello');
  const [onMuiltLine, setOnMuiltLine] = useState(false);

  const handelOnContentSizeChange = () => {
    console.log('ContentSizeChange')
    setOnMuiltLine(true);
  }
  
  /*const handelOnScroll = () => {
    console.log('onScroll')
  }*/

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
      fontSize: 15,
      padding: 5,
      flex: 9,
      height: onMuiltLine == true ? 60 : 30,
      backgroundColor: '#9f4',
    },
  });

  return (
    <View style={styles.main__container}>
      <SideBar />
      <Head />
      <ScrollView style={styles.main__zindex}>
        <Link to="./Equipment">
          <Text>Equipment</Text>
        </Link>
        {message.map(({ message, user, to }) => {
          return <Asset message={message} user={user} to={to} />;
        })}
      </ScrollView>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput
          style={styles.main__msgcontainer}
          value={msgSendText}
          multiline
          numberOflines={1}
          onChangeText={(text) => setMsgSendText(text)}
          onContentSizeChange={handelOnContentSizeChange}
          //onScroll={handelOnScroll}
        />
        <Button title=">" style={{ flex: 3 }} onPress={() => {}} />
      </View>
    </View>
  );
}
