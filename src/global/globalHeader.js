import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, Icon, Pressable, StatusBar, Text } from "native-base";
import React, { useContext } from "react";
import InLineLogo from "../../assets/InLineLogo";
import { StateContext } from "../context/stateContext";

export default function GlobalHeader({
  safeArea = null,
  headerText = "",
  RightIcon = null,
}) {
  const navigation = useNavigation();
  const route = useRoute();

  const { currentCategory } = useContext(StateContext);

  return (
    <>
      {safeArea ? (
        <>
          <StatusBar bg={"baseColor.500"} barStyle="light-content" />
          <Box safeAreaTop backgroundColor="baseColor.500" />
        </>
      ) : null}

      <HStack
        bg={"baseColor.500"}
        px={3}
        py={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {["PDFViewer", "Edit", "Preview", "NewForm"].includes(route.name) ? (
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              my={2}
              size={"md"}
              as={<Ionicons name="ios-arrow-back" />}
              color="white"
            />
          </Pressable>
        ) : (
          <Pressable onPress={() => navigation.openDrawer()}>
            <Icon
              my={2}
              size={"lg"}
              as={<MaterialIcons name="menu" />}
              color="white"
            />
          </Pressable>
        )}

        {["Form", "Statistics"].includes(route.name) ? (
          <Box>
            {/*<Image source={require("../../assets/designExport/AppName.png")}*/}
            {/*       style={{resizeMode: "contain", width: 180, height: 35}}/>*/}
            <InLineLogo size={0.6} />
          </Box>
        ) : (
          <Text color="white" ml={3} fontSize={"xl"} width={"70%"} bold>
            {headerText ? headerText : route.name}
          </Text>
        )}

        {RightIcon ? RightIcon : <Box w={8} />}
      </HStack>

      {["NewForm"].includes(route.name) ? (
        <></>
      ) : (
        <Box>
          <HStack bg={"baseColor.500"} justifyContent={"center"} pb={2}>
            {currentCategory.id === undefined ? (
              <Text color={"primary.500"} fontSize={"sm"}>
                {" "}
              </Text>
            ) : (
              <>
                <Text color={"primary.400"} fontSize={"sm"} bold>
                  {currentCategory.inspection.name} inspection -{" "}
                </Text>
                <Text color={"primary.400"} fontSize={"sm"} bold>
                  {currentCategory.team.name}{" "}
                </Text>
                <Text color={"primary.400"} fontSize={"sm"} bold>
                  ({currentCategory.division.name})
                </Text>
              </>
            )}
          </HStack>
        </Box>
      )}
    </>
  );
}
