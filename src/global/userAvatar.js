import React from "react"
import {Dimensions, StyleSheet, View} from "react-native";
import {Text} from 'native-base'
import {rgb2hsl} from "./helpers/colorHelper";

// const windowWidth = Dimensions.get('window').width;

export default function UserAvatar({full_name, size, fontSize=null, style={}}) {

  const colorIndex = full_name.length > 0 ?  (full_name.toLowerCase().charCodeAt(0) - 97) % 6 : 0
  const colorList = [
    "#15B1D7", "#FB9D86", "#FEC001", "#BB86FB",
    "#30C2CA", "#7ABBA3", "#ffffff", "#cccccc"
  ]
  let [h, s, l] = rgb2hsl(colorList[colorIndex])

  return (
      <View style={[{alignItems: "center"}, style]}>
        <View style={[styles.nameIcon, {backgroundColor: colorList[colorIndex], width: size, height: size,borderRadius: size / 2}]}>
          <Text fontSize={fontSize ? fontSize : 24}>{full_name[0]}</Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    nameIcon: {
      backgroundColor: "white",
      borderWidth: 4,
      borderColor: "rgba(0,0,0,0.0)",
      alignItems: "center",
      justifyContent: "center"
    }
  })