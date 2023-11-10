import React, { useContext, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  Box,
  Button,
  Center,
  List,
  HStack,
  Icon,
  StatusBar,
  Text,
  VStack,
  Divider,
  Pressable,
} from "native-base";
import { Dimensions, StyleSheet, Image } from "react-native";

import { MaterialIcons, Feather } from "@expo/vector-icons";
import { AuthContext } from "../../context/authContext";
import UserAvatar from "../../global/userAvatar";
import UseRouteSetting from "../routeSettings";
import InLineLogo from "../../../assets/InLineLogo";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Drawer = createDrawerNavigator();

function Header({ props }) {
  const { full_name, email, logout } = React.useContext(AuthContext);

  return (
    <>
      <StatusBar backgroundColor={"baseColor.500"} barStyle="light-content" />
      {/*<Box safeAreaTop backgroundColor="baseColor.500"/>*/}

      {/*header*/}
      <HStack
        bg={"baseColor.500"}
        px={1}
        py={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box px={2}>
          <InLineLogo size={0.6} />
        </Box>
        <Pressable
          p={2}
          onPress={() => props.navigation.closeDrawer()}
          colorScheme={"gray"}
        >
          <Icon size="xl" as={<MaterialIcons name="menu" />} color="white" />
        </Pressable>
      </HStack>

      {/*Content*/}
      <VStack space={1} bg={"baseColor.500"} alignItems={"center"} pt={"3%"}>
        <UserAvatar
          full_name={full_name ? full_name : ""}
          size={windowWidth * 0.28}
          fontSize={windowWidth * 0.16}
        />

        {/*User Detail*/}
        <Center>
          <Text fontSize="2xl" bold>
            {full_name ? full_name : ""}
          </Text>
          <Text fontSize="sm">{email}</Text>
        </Center>

        {/*Option*/}
        <HStack
          space={windowWidth * 0.07}
          justifyContent="space-between"
          pb={4}
          mt={2}
        >
          <HStack space={2} alignItems={"center"}>
            <Button
              startIcon={
                <Icon
                  size={"sm"}
                  color="white"
                  as={<MaterialIcons name="person" />}
                />
              }
              variant={"ghost"}
              colorScheme={"gray"}
              onPress={() => props.navigation.navigate("AccountStack")}
            >
              <Text fontSize={"sm"} fontFamily={"body"}>
                ACCOUNT
              </Text>
            </Button>
          </HStack>
          <HStack space={2} alignItems={"center"}>
            <Button
              startIcon={
                <Icon
                  size={"sm"}
                  color="white"
                  as={<Feather name="log-out" />}
                />
              }
              variant={"ghost"}
              colorScheme={"gray"}
              onPress={logout}
            >
              <Text fontSize={"sm"} fontFamily={"body"}>
                LOGOUT
              </Text>
            </Button>
          </HStack>
        </HStack>
      </VStack>
    </>
  );
}

const Body = ({ props, drawerItem = [] }) => {
  const [selected, setSelected] = useState(0);

  const drawerNavigate = (nameTag, index) => {
    if (drawerItem[index].onPressCallBack) {
      drawerItem[index].onPressCallBack();
    }

    console.log(nameTag);
    setSelected(index);
    if (drawerItem[index].onPressHandler) {
      drawerItem[index].onPressHandler(nameTag);
    } else {
      props.navigation.navigate(nameTag);
    }
  };

  return (
    <Box
      flex={1}
      bg={"baseColor.500"}
      justfy={"flex-start"}
      alignItems={"center"}
    >
      <Box w={"100%"}>
        <List borderColor={"baseColor.500"}>
          <Divider my={0} />

          {drawerItem
            .filter((item) => item.selectable)
            .map((item, index) => (
              <Box key={"drawer_" + index}>
                <Box bg={selected === index ? "primary.200" : "baseColor.400"}>
                  <List.Item
                    py={4}
                    px={2}
                    ml={1.5}
                    bg={selected === index ? "primary.600" : "baseColor.500"}
                    onPress={() => drawerNavigate(item.name, index)}
                  >
                    <List.Icon size={"lg"} as={item.icon} color={"white"} />
                    <Text fontSize={"lg"} color={"white"}>
                      {item.name}
                    </Text>
                  </List.Item>
                </Box>
                <Divider my={0} />
              </Box>
            ))}
        </List>
      </Box>
    </Box>
  );
};

function DrawerContent(props) {
  // const {is_admin} = useContext(AuthContext)

  return (
    <VStack h={"100%"}>
      <Header props={props} />
      <Body props={props} drawerItem={props.routeSettings} />
    </VStack>
  );
}

export default function BaseDrawerRoute() {
  const routeSettings = UseRouteSetting();

  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => (
          <DrawerContent {...props} routeSettings={routeSettings} />
        )}
        initialRouteName={"Project"}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: "85%",
          },
          drawerType: "front",
        }}
      >
        {routeSettings.map((item, index) => (
          <Drawer.Screen
            key={index}
            name={item.name}
            component={item.component}
          />
        ))}
      </Drawer.Navigator>
    </>
  );
}
