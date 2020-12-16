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
  return (
    <React.StrictMode>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <AuthProvider initialState={initialState} reducer={reducer}>
          {/*<StatusBar backgroundColor="white" />*/}
          <Orientation />
          <NativeRouter>
            <PrivateRoute exact path="/" component={Main} />
            <PrivateRoute exact path="/Equipment" component={Equipment} />
            <Route path="/login" component={Login} />
          </NativeRouter>
        </AuthProvider>
      </KeyboardAvoidingView>
    </React.StrictMode>
  );
}
