import {Icon, Pressable, Text, VStack} from "native-base";
import {Fontisto} from "@expo/vector-icons";
import React from "react";

const TabButton = ({onPress=()=>{}, title, Icon=null}) => {
  return (
    <Pressable onPress={onPress} flex={1} justifyContent={"center"} alignItems={"center"}>
      <VStack justifyContent={"center"} alignItems={"center"}>
        {Icon && <Icon />}
        <Text color={"primary.500"}>{title}</Text>
      </VStack>
    </Pressable>
  )

}

export default TabButton;