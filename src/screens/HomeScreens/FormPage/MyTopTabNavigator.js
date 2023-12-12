import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Center, HStack, Pressable, Text, VStack } from "native-base";
import { Animated } from "react-native";
import FormList from "./components/FormList";

const Tab = createMaterialTopTabNavigator();

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
  const tabs = ["My Task", "Pending", "Completed", "Rejected"];

  const MyScreen = (props) => {
    return (
      <Center flex={1}>
        <FormList
          tabs={tabs}
          tabName={props.route.params.tab}
          currentRouteIndex={props.navigation.getState().index}
        />
      </Center>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName={tabs[0]}
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        lazy: true,
      }}
    >
      {tabs.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab}
          component={MyScreen}
          initialParams={{ tab }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default MyTabs;
