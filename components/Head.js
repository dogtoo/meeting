import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Alert,
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useHistory, Link } from 'react-router-native';
import { useStateValue } from '../Auth';

export default function Head() {
  const [
    { headBackgroundColor, headHeight, orientation, auth },
    dispatch,
  ] = useStateValue();
  const history = useHistory();
  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    });
    history.push('/');
  };
  const bgColor = headBackgroundColor ? headBackgroundColor : '#fff';
  const hdHeight = headHeight ? headHeight : 40;
  const muWidth = Dimensions.get('window').width / 2;

  const [showNavigateItem, setShowNavigateItem] = useState(false);
  const [navigateStyle, setNavigateStyle] = useState();
  const [navigateItemStyle, setNavigateItemStyle] = useState();

  useEffect(() => {
    if (orientation?.screenSize === 'xs') {
      setNavigateStyle({
        position: 'absolute',
        top: hdHeight + 10,
        right: 1,
        width: muWidth,
        backgroundColor: bgColor,
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 1,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: '#000',
      });
      setNavigateItemStyle({
        paddingVertical: 20,
        alignItems: 'center',
        width: muWidth,
        borderBottomWidth: 1,
        borderColor: '#000',
      });
      setShowNavigateItem(false);
    } else {
      setNavigateStyle({ flexDirection: 'row' });
      setNavigateItemStyle({ paddingRight: 10 });
      setShowNavigateItem(true);
    }
  }, [orientation]);

  const styles = StyleSheet.create({
    head__container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: bgColor,
      padding: 5,
    },
    head__navigate: navigateStyle,
    head__navigateItem: { ...navigateItemStyle },
    head__burgerline: {
      backgroundColor: '#000',
      height: 5,
      marginHorizontal: 2,
      borderRadius: 5,
    },
    head__burgerbtn: {
      justifyContent: 'space-around',
      width: hdHeight,
      height: hdHeight,
      borderRadius: 5,
      paddingVertical: 4,
    },
    head__logo: {
      height: hdHeight - 10,
      width: hdHeight - 10,
      resizeMode: 'contain',
    },
  });

  return (
    <View style={styles.head__container}>
      <Image
        style={styles.head__logo}
        source={require('../assets/snack-icon.png')}
      />
      {orientation?.screenSize === 'xs' && (
        <View>
          <TouchableOpacity
            onPress={() => {
              if (!showNavigateItem) {
                setShowNavigateItem(true);
              } else {
                setShowNavigateItem(false);
              }
            }}>
            <View style={styles.head__burgerbtn}>
              <View style={styles.head__burgerline}></View>
              <View style={styles.head__burgerline}></View>
              <View style={styles.head__burgerline}></View>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {showNavigateItem && (
        <View style={styles.head__navigate}>
          <TouchableOpacity
            style={styles.head__navigateItem}
            onPress={() => {
              logout();
            }}>
            <Text>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.head__navigateItem}
            onPress={() => {
              Alert.alert("I'm setting");
            }}>
            <Text>setting</Text>
          </TouchableOpacity>
          <View style={styles.head__navigateItem}>
            <Text>{auth.user.email}</Text>
          </View>
        </View>
      )}
    </View>
  );
}
