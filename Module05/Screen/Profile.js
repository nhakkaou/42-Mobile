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
import { useEffect } from "react";
import { geTypeData, getLastTwoEntries } from "../api";
import { useState } from "react";
import Card from "../components/Card";

export default Profile = ({ navigation }) => {
  const { userInfos } = useContext(DiaryContext);
  const [statistics, setStatistics] = useState([]);
  const [lastNotes, setLast] = useState([]);
  const [visibleDelete, setVisibleDelete] = useState();
  console.log(statistics);
  useEffect(() => {
    const getData = async () => {
      const dataPercent = await geTypeData(userInfos?.email);
      setStatistics([...dataPercent]);
      const dataLast = await getLastTwoEntries(userInfos?.email);
      setLast([...dataLast]);
    };
    getData();
  }, [userInfos.email]);
  const logout = async () => {
    await AsyncStorage.clear();
    navigation.push("Login");
  };
  const removeNote = async (id) => {
    try {
      const reult = await deleteNote(id);
      onRefresh();
    } catch (e) {
      console.log(e);
    }
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
              {lastNotes.length > 0 && (
                <FlatList
                  key={";"}
                  data={lastNotes}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() =>
                        navigation.push("AddNote", {
                          id: item.id,
                          title: item.title,
                          content: item.content,
                          type: item.type,
                        })
                      }
                      onLongPress={() => setVisibleDelete(item.id)}
                    >
                      <Card
                        id={item.id}
                        title={item.title}
                        content={item.content}
                        type={item.type}
                        removeNote={removeNote}
                        visibleDelete={item.id === visibleDelete}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={{
                    gap: 20,
                    flex: 1,
                  }}
                  numColumns={2}
                />
              )}
              <View style={[styles.card, { gap: 10 }]}>
                <Text style={styles.text}>Statistics :</Text>
                {statistics.map((item, key) => (
                  <View
                    key={key}
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={styles.text}>{item.type}</Text>
                    <Text style={[styles.text, { color: "#27B5EE" }]}>
                      {isNaN(item.percentage) ? 0 : item.percentage} %
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.card}>
                <Text style={styles.text}>{userInfos?.family_name}</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.text}>{userInfos?.given_name}</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.text}>{userInfos?.email}</Text>
              </View>
              <TouchableOpacity
                style={[styles.card, { borderColor: "red" }]}
                onPress={logout}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      color: "red",
                      textAlign: "center",
                    },
                  ]}
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
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
