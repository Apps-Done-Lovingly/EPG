import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Share, Image, ToastAndroid } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const generator = require('./src/Backend/Generator.js');

export default class MainScreen extends Component {

  constructor() {
    super();
    this.state = {
      balanceText: "Enduring",
      passwordLength: "",
      password: "Password output, tap to share!"
    }
  }

  balanceButtonHandler() {
    let newBalanceText = '';
    if (this.state.balanceText === "Enduring") {
      newBalanceText = "Tag";
    } else if (this.state.balanceText === "Tag") {
      newBalanceText = "Random";
    } else {
      newBalanceText = "Enduring";
    }

    this.state.balanceText = newBalanceText;
    this.forceUpdate();
  }

  generatePasswordHandler() {
    if (this.state.balanceText === "Enduring") {
      this.state.password = generator.memory(this.state.passwordLength);
    } else if (this.state.balanceText === "Tag") {
      this.state.password = generator.tag();
    } else {
      this.state.password = generator.random(this.state.passwordLength);
    }
    this.forceUpdate();
  }

  changePasswordLengthHandler(newLength) {
    this.state.passwordLength = newLength;
  }

  sharePassword() {
    Share.share({ message: this.state.password });
  }

  render() {
    return (
      <View style={styles.container} behavior="padding">

        <View style={styles.subContainer}>
          <TouchableOpacity
            style={[styles.saveButton, { borderRadius: wp(10), alignSelf: 'center' }]}
            onPress={() => { ToastAndroid.show("Created by Apps Done Lovingly!", ToastAndroid.SHORT) }}>
            <Image
              resizeMode="contain"
              source={require('./src/assets/logo.png')}
              style={{ flexShrink: 1 }} />
          </TouchableOpacity>
        </View>

        <View style={styles.subContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.balanceButtonHandler()}
          >
            <Text
              allowFontScaling
              numberOfLines={2}
              style={styles.text}>{"Mode: " + this.state.balanceText + " password"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.subContainer}>
          <TextInput
            defaultValue=""
            placeholder="Password's length.."
            numberOfLines={1}
            textAlign="center"
            onChangeText={value => this.changePasswordLengthHandler(value)}
            keyboardType="numeric"
            maxLength={2}
            style={[styles.button, { borderRadius: wp(10) }, styles.text]}>
          </TextInput>
        </View>

        <View style={styles.subContainer}>
          <TouchableOpacity
            onPress={() => this.sharePassword()}
            style={[styles.button, { borderRadius: wp(10) }]}>
            <Text style={styles.text}>{this.state.password}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.subContainer}>
          <TouchableOpacity
            onPress={() => this.generatePasswordHandler()}
            style={[styles.button, { borderRadius: wp(4) }]}>
            <Text style={styles.text}>Generate Password</Text>
          </TouchableOpacity>

        </View>
      </View >
    );
  };
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    padding: hp(1)
  },

  subContainer: {
    padding: hp(2)
  },

  settingContainer: {
    flexDirection: "row",
    padding: hp(1),
    position: "absolute",
    bottom: 40,
    right: 10
  },

  text: {
    color: "black",
    textAlign: "center",
    fontSize: hp(2) + wp(2) / 3
  },

  button: {
    padding: hp(1),
    maxWidth: wp(40),
    maxHeight: wp(20),
    flexShrink: 1,
    backgroundColor: "white"
  },

  square: {
    borderRadius: 0
  },

  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    width: wp(36),
    height: wp(36),
    padding: hp(1),
    borderRadius: wp(100)
  }
});