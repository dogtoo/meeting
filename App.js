import React, { Component, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";

import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import reducer, { initialState } from "./reducer";
import Orientation from "./Orientation";
import Login from "./Login";
import Main from "./Main";
import Equipment from "./Equipment";

//apollo client
import { WebSocketLink } from '@apollo/client/link/ws';
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  InMemoryCache,
  split, HttpLink
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

export default function App() {
  //Ctrl + S save
  //Ctrl + U Update code on device
  //Ctrl + \ sidebar
  //Ctrl + ` log panels
  //Ctrl + Alt + F fromat
  //const [orientation, setOrientation] = useState();
  console.log(Platform);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#A0E0E0",
      margin: 0,
      paddingTop: Platform.OS === "android" ? 23 : 0,
    },
  });

  const httpLink = new HttpLink({
    uri: 'http://codedogtoo.mynetgear.com:32771/graphql'
  });

  const wsLink = new WebSocketLink({
    uri: `ws://codedogtoo.mynetgear.com:32771/subscriptions`,
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  // create an inmemory cache instance for caching graphql data
  const cache = new InMemoryCache()

  // instantiate apollo client with apollo link instance and cache instance
  const client = new ApolloClient({
    link,
    cache
  });

  return (
    <React.StrictMode>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ApolloProvider client={client}>
          <AuthProvider initialState={initialState} reducer={reducer}>
            {/*<StatusBar backgroundColor="white" />*/}
            <Orientation />
            <NativeRouter>
              <PrivateRoute exact path="/" component={Main} />
              <PrivateRoute exact path="/Equipment" component={Equipment} />
              <Route path="/login" component={Login} />
            </NativeRouter>
          </AuthProvider>
        </ApolloProvider>
      </KeyboardAvoidingView>
    </React.StrictMode>
  );
}
