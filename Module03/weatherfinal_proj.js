import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SearchBar from "./components/SearchBar";
import { Currently, Today, Weekly } from "./Screen";
import { ImageBackground } from "react-native";
import { useEffect, useState } from "react";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

function WeatherApp_proj({}) {
  const Tab = createMaterialTopTabNavigator();
  const screenOptions = {
    tabBarStyle: { backgroundColor: "transparent" },
    tabBarLabelStyle: { fontSize: 12, fontWeight: "800" },
    tabBarActiveTintColor: "#fff",
    sceneContainerStyle: { backgroundColor: "transparent" },
    headerShown: false,
  };
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      initialRouteName="Currently"
      screenOptions={screenOptions}
    >
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <FontAwesome name="clock-o" size={20} color="#fff" />
          ),
        }}
        name="Currently"
      >
        {() => <Currently />}
      </Tab.Screen>
      <Tab.Screen
        name="Today"
        options={{
          tabBarIcon: () => (
            <FontAwesome name="calendar-check-o" size={20} color="#fff" />
          ),
        }}
      >
        {() => <Today />}
      </Tab.Screen>
      <Tab.Screen
        name="Weekly"
        options={{
          tabBarIcon: () => (
            <FontAwesome name="list-alt" size={20} color="#fff" />
          ),
        }}
      >
        {() => <Weekly />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function Main() {
  const [theme, setTheme] = useState("day");
  useEffect(() => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour >= 6 && currentHour < 18) setTheme("day");
    else setTheme("night");
  }, []);
  const Stack = createStackNavigator();
  return (
    <ImageBackground
      source={
        theme === "day"
          ? require("./assets/morning.jpg")
          : require("./assets/night.jpeg")
      }
      style={{ flex: 1 }}
    >
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{
              headerTitle: () => <SearchBar />,
              headerStyle: {
                backgroundColor: "transparent",
                shadowColor: "#000",
                shadowOffset: 0,
              },
            }}
          >
            {() => <WeatherApp_proj />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
}
