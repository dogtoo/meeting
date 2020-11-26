import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  Button,
  Easing,
} from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import Avatar from './Avatar';
import { useStateValue } from '../Auth';

export default function SideBar() {
  const [
    { headBackgroundColor, headHeight, orientation, connUsers },
    dispatch,
  ] = useStateValue();
  const bgColor = headBackgroundColor ? headBackgroundColor : '#fff';
  const hdHeight = headHeight ? headHeight : 40;
  const barHeigh =
    (Dimensions.get('screen').height - hdHeight) *
    (orientation.orientation === 'PORTRAIT' ? 0.6 : 0.3);

  const [showBar, setShowBar] = useState(false);
  const barHiddenAnimatedValue = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    if (showBar) {
      Animated.timing(barHiddenAnimatedValue, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(barHiddenAnimatedValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [showBar]);

  const barNotationAnimated = barHiddenAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const barHiddenAnimated = barHiddenAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -55],
  });

  const styles = StyleSheet.create({
    sidebar__container: {
      position: 'absolute',
      flexDirection: 'row',
      top:
        hdHeight +
        (Dimensions.get('screen').height - barHeigh) *
          (orientation.orientation === 'PORTRAIT' ? 0.3 : 0.05),
      height: barHeigh,
      width: 60 + 20,
      zIndex: 1,
    },
    sidebar__main: {
      width: 60,
      height: '100%',
      backgroundColor: '#fff',
      borderTopEndRadius: 10,
      borderBottomEndRadius: 10,
      padding: 5,
      shadowColor: '#808080',
      shadowOffset: {
        height: 1,
        width: 1,
      },
      shadowRadius: 5,
      shadowOpacity: 0.4,
      elevation: 5,
    },
    sidebar__control: {
      position: 'relative',
      width: 20,
      height: 50,
      backgroundColor: '#5DADE2',
      marginTop: 20,
      borderTopEndRadius: 5,
      borderBottomEndRadius: 5,
      shadowColor: '#808080',
      shadowOffset: {
        height: 1,
        width: 1,
      },
      shadowRadius: 5,
      shadowOpacity: 0.4,
      elevation: 5,
    },
    sidebar__scrol: {
      paddingBottom: 5,
    },
    sidebar__notation: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const handlerBar = () => {
    if (showBar) {
      setShowBar(false);
    } else {
      setShowBar(true);
    }
  };
  return (
    <Animated.View style={[styles.sidebar__container, {left: barHiddenAnimated}]}>
      <View style={styles.sidebar__main}>
        <ScrollView style={styles.sidebar__scrol}>
          {connUsers.map(({ name, image, id, onSend }) => {
            return (
              <Avatar key={id}
                image={
                  image
                    ? { uri: { image } }
                    : {
                        uri:
                          'https://static01.nyt.com/images/2014/08/10/magazine/10wmt/10wmt-jumbo-v4.jpg?quality=90&auto=webp',
                      }
                }
                content={name}
                id={id}
              />
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.sidebar__control}>
        <Animated.View style={[styles.sidebar__notation, {transform: [{ rotate: barNotationAnimated }]}]}>
          <View style={{ position: 'absolute', opacity: 0, zIndex: 1 }}>
            <Button title=" " onPress={() => handlerBar()} />
          </View>
          <Text>{'<'}</Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
}
