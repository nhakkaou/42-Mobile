import { NavigationContainer } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SearchBar from "./components/SearchBar";
import { Currently, Today, Weekly } from "./Screen";
function WeatherApp_proj({}) {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      initialRouteName="Currently"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, fontWeight: "800" },
        tabBarStyle: { backgroundColor: "#292d39" },
        tabBarActiveTintColor: "#fff",
      }}
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
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            headerTitle: () => <SearchBar />,
            headerStyle: {
              backgroundColor: "#292d39",
            },
          }}
        >
          {() => <WeatherApp_proj />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
