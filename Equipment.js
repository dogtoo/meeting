import React from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { useHistory, BackButton } from 'react-router-native';
import { auth } from './firebase';

export default function Equipment({orientation}) {
  const history = useHistory();
  //console.log(history);
  console.log('Equipment:', orientation)

  const styles = StyleSheet.create({
    viewT: {
      //flex: 1,
      flexDirection: 'column',
      backgroundColor: '#606060',
    },
    view1: {
      height: 100,
      backgroundColor: '#E5CCFF',
    },
    view2: {
      height: 200,
      backgroundColor: '#CCFFFF',
    },
    view3: {
      height: 228,
      backgroundColor: '#FFCCCC',
      borderBottomWidth: 1,
    },
  });

  const goBack = () => {
    history.goBack();
    console.log('goBack')
  };
  return (
    <View style={styles.viewT}>
      <View style={styles.view1}>
        <Text></Text>
        <Text>Screen:{Dimensions.get('screen').height}</Text>
      </View>
      <View style={styles.view2}>
        <Button onPress={() => goBack()} title="go Back" />
      </View>
      <View style={styles.view3}></View>
    </View>
  );
}
