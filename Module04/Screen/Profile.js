import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { DiaryContext } from "../context";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Profile = ({ navigation }) => {
  const { userInfos } = useContext(DiaryContext);

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.push("Login");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            userInfos?.picture ||
            "https://cdn.intra.42.fr/users/3f2de9891bd21b0ae08512e37bf6c3d3/nhakkaou.jpg",
        }}
        resizeMode="cover"
        style={styles.image}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <LinearGradient
            style={styles.gradient}
            locations={[0.01, 1]}
            colors={["transparent", "#000"]}
          />
          <View style={styles.infos}>
            <View style={styles.name}>
              <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
                {userInfos?.name}
              </Text>
            </View>
            <View style={{ gap: 20 }}>
              <View style={styles.card}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  {userInfos?.family_name}
                </Text>
              </View>
              <View style={styles.card}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  {userInfos?.given_name}
                </Text>
              </View>
              <View style={styles.card}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  {userInfos?.email}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.card, { borderColor: "red" }]}
                onPress={logout}
              >
                <Text
                  style={{
                    color: "red",
                    fontSize: 16,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 350,
    position: "absolute",
    top: 0,
    left: 0,
  },
  infos: {
    backgroundColor: "#000",
    height: "60%",
    width: "100%",
    bottom: 0,
    left: 0,
    padding: 40,
  },
  name: {
    marginBottom: 30,
  },
  card: {
    borderWidth: 1,
    borderColor: "#fff",
    padding: 20,
    borderRadius: 15,
  },
  gradient: {
    height: 360,
    width: "100%",
    zIndex: 1,
  },
});
