import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createStackNavigator } from "@react-navigation/stack";

import { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Currently = ({ geo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Currently</Text>
      <Text style={styles.text}>{geo}</Text>
    </View>
  );
};
const Today = ({ geo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Today</Text>
      <Text style={styles.text}>{geo}</Text>
    </View>
  );
};
const Weekly = ({ geo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Weekly</Text>
      <Text style={styles.text}>{geo}</Text>
    </View>
  );
};
const SearchBar = ({ setGeo }) => {
  const [txt, setText] = useState("");
  const handleTextSubmit = () => {
    console.log("Submit", typeof txt);
    setGeo(txt);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchSection}>
        <FontAwesome
          style={styles.searchIcon}
          name="search"
          size={20}
          color="#000"
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          underlineColorAndroid="transparent"
          value={txt}
          onChangeText={setText}
          onSubmitEditing={handleTextSubmit}
        />
        <FontAwesome
          style={styles.searchIcon}
          name="map-marker"
          size={20}
          color="#000"
          onPress={() => setGeo("Geolocation")}
        />
      </View>
    </View>
  );
};
const Home = ({ geo }) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator tabBarPosition="bottom" initialRouteName="Currently">
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <FontAwesome
              style={styles.searchIcon}
              name="clock-o"
              size={20}
              color="#000"
            />
          ),
        }}
        name="Currently"
      >
        {() => <Currently geo={geo} />}
      </Tab.Screen>
      <Tab.Screen
        name="Today"
        options={{
          tabBarIcon: () => (
            <FontAwesome
              style={styles.searchIcon}
              name="calendar-check-o"
              size={20}
              color="#000"
            />
          ),
        }}
      >
        {() => <Today geo={geo} />}
      </Tab.Screen>
      <Tab.Screen
        name="Weekly"
        options={{
          tabBarIcon: () => (
            <FontAwesome
              style={styles.searchIcon}
              name="list-alt"
              size={20}
              color="#000"
            />
          ),
        }}
      >
        {() => <Weekly geo={geo} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
export default function WeatherApp_proj() {
  const [geo, setGeo] = useState("");
  const Stack = createStackNavigator();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{
              headerTitle: () => <SearchBar geo={geo} setGeo={setGeo} />,
            }}
          >
            {() => <Home geo={geo} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    // padding: 10,
  },
  input: {
    padding: 10,
    width: "90%",
    color: "#000",
  },
});
