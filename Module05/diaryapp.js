import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AddNote, Login, Notes } from "./Screen";

import { Profile } from "./Screen/";
import { DiaryProvider } from "./context";
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#000000",
  },
};
function NotesScreen() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="myNotes"
        options={{ headerShown: false }}
        component={Notes}
      />
    </Stack.Navigator>
  );
}
function App() {
  const Tab = createMaterialTopTabNavigator();
  const Stack = createStackNavigator();
  const screenOptions = {
    tabBarStyle: { backgroundColor: "transparent" },
    tabBarLabelStyle: { fontSize: 12, fontWeight: 800 },
    tabBarActiveTintColor: "#fff",
    sceneContainerStyle: { backgroundColor: "transparent" },
    headerShown: false,
  };
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      initialRouteName="Notes"
      screenOptions={screenOptions}
    >
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <FontAwesome name="sticky-note" size={20} color="#fff" />
          ),
        }}
        name="Notes"
      >
        {() => <NotesScreen />}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: () => <FontAwesome name="user" size={20} color="#fff" />,
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
}

export default function Main() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer theme={navTheme}>
      <DiaryProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={App}
          />
          <Stack.Screen
            name="AddNote"
            options={{ headerShown: false }}
            component={AddNote}
            initialParams={{ id: "" }}
          />
        </Stack.Navigator>
      </DiaryProvider>
    </NavigationContainer>
  );
}
