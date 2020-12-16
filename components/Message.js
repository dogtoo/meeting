import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { useStateValue } from '../Auth';

export default function Message({ message, user, to, logo }) {
  const [{ auth, orientation }, dispatch] = useStateValue();
  console.log(orientation.screenSize);
  const avatarSize = 50;
  let width = orientation.screenSize === 'xs' ? 200 : 500;

  const styles = StyleSheet.create({
    container: {
      flexDirection: auth.user.email != user ? 'row' : 'row-reverse',
      padding: 10,
    },
    message__content: {
      flexDirection: "column",

    },
    message__contentto: {
      flexDirection: "row",
    },
    paragraph: {
      paddingStart: 10,
      paddingEnd: 10,
      width: width,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: auth.user.email != user ? '#cceeff' : '#4dc3ff',
      borderTopRightRadius: auth.user.email != user ? 10 : 0,
      borderTopLeftRadius: auth.user.email != user ? 0 : 10,
    },
    logo: {
      width: avatarSize - 5,
      height: avatarSize - 5,
      borderRadius: avatarSize - 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 2,
      marginLeft: 2,
    },
  });
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{ uri: logo }} />

      {auth.user.email != user &&
        <View style={styles.message__content} >
          {to?.logo && (
            <View style={styles.message__contentto} >
              <Text>to: </Text>
              <Image style={styles.logo} source={{ uri: to.logo }} />
            </View>
          )}
        </View>}
      {message.search(/data:image\/jpeg;base64,(.*)/) ? (<Text style={styles.paragraph}>{message}</Text>) : (<Image
        style={{
          width: 220,
          resizeMode: 'contain',
          height: 220,
          borderRadius: 20
        }}
        source={{ uri: message }}
      />)}


      {auth.user.email === user &&
        <View style={styles.message__content} >
          {to?.logo && (
            <View style={styles.message__contentto} >
              <Text>to: </Text>
              <Image style={styles.logo} source={{ uri: to.logo }} />
            </View>
          )}
        </View>}
    </View>
  );
}
