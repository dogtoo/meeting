import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useStateValue } from '../Auth';

export default function Avatar({ image, content, id }) {
  const [{ onSendUser, avatarSize }, dispatch] = useStateValue();
  const [id_, setId] = useState(id);
  const [onpressStyle, setOnpressStyle] = useState({});

  const handelAvatarTouch = () => {
    dispatch({
      type: 'CONN_USER_TOUCH',
      payload: id_,
    });
  };

  useEffect(() => {
    onSendUser === id_
      ? setOnpressStyle({
          position: 'absolute',
          backgroundColor: '#FFFF00',
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize,
          opacity: 0.8,
        })
      : setOnpressStyle({});
  }, [onSendUser]);

  const styles = StyleSheet.create({
    avatar__container: {
      marginBottom: 5,
    },
    avatar__image: {
      width: avatarSize - 5,
      height: avatarSize - 5,
      //resizeMode: 'content',
      borderRadius: avatarSize - 5,
      backgroundColor: '#0f0',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 2.5,
      marginLeft: 2.5,
    },
    avatar__content: {
      fontSize: avatarSize * 0.6,
      opacity: 0.3,
    },
    avatar__onpress: { ...onpressStyle },
  });
  return (
    <TouchableOpacity
      style={styles.avatar__container}
      onPress={handelAvatarTouch}>
      <View style={styles.avatar__onpress} />
      <ImageBackground
        source={image}
        style={styles.avatar__image}
        imageStyle={{ borderRadius: avatarSize }}>
        <Text style={styles.avatar__content}>
          {content ? content.substring(0, 2) : 'M'}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}
