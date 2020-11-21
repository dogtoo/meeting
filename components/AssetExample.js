import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function AssetExample({message, user, to}) {
  return (
    <View style={styles.container}>
      <Text>{user}</Text>
      <Text>{to}</Text>
      <Text style={styles.paragraph}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  }
});
