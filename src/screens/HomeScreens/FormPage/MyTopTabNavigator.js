import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FormList from "./components/FormList";
import {
  Center,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { Animated } from "react-native";

const Tab = createMaterialTopTabNavigator();

const MyTaskScreen = () => {
  return (
    <Center flex={1}>
      <FormList tabName={"My Task"} />
    </Center>
  );
};

const PendingScreen = () => {
  return (
    <Center flex={1}>
      <FormList tabName={"Pending"} />
    </Center>
  );
};

const CompletedScreen = () => {
  return (
    <Center flex={1}>
      <FormList tabName={"Completed"} />
    </Center>
  );
};

const RejectedScreen = () => {
  return (
    <Center flex={1}>
      <FormList tabName={"Rejected"} />
    </Center>
  );
};

function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <HStack flexDirection={"row"} bg={"white"} shadow={1} mb={1}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0.25)),
        });

        return (
          <Pressable
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            key={index}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Animated.View style={{ opacity }}>
              <VStack
                borderBottomWidth={3}
                borderColor={"baseColor.500"}
                py={2}
                w={"100%"}
                alignItems={"center"}
              >
                <Text fontSize={"sm"} color={"baseColor.500"}>
                  {label}
                </Text>
              </VStack>
            </Animated.View>
          </Pressable>
        );
      })}
    </HStack>
  );
}

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="My Task"
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        lazy: true,
      }}
    >
      <Tab.Screen name="My Task" component={MyTaskScreen} />
      <Tab.Screen name="Pending" component={PendingScreen} />
      <Tab.Screen name="Completed" component={CompletedScreen} />
      <Tab.Screen name="Rejected" component={RejectedScreen} />
    </Tab.Navigator>
  );
};

export default MyTabs;
