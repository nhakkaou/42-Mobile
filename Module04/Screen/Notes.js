import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TouchableWithoutFeedback,
} from "react-native";
import Filter from "../components/Filter";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { deleteNote, getNoteByEmail, getNotes } from "../api";
import { useContext } from "react";
import { DiaryContext } from "../context";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native";

const filters = [
  { id: 1, value: "All" },
  {
    id: 2,
    value: "Happy",
  },
  {
    id: 3,
    value: "Sad",
  },
  {
    id: 4,
    value: "Angry",
  },
];
export default Notes = ({ route, navigation }) => {
  const [filter, setFilter] = useState("All");
  const [notes, setNotes] = useState([]);
  const [visibleDelete, setVisibleDelete] = useState();
  const [refreshing, setRefresh] = useState(false);
  const { userInfos } = useContext(DiaryContext);
  async function getNewNotes(filter) {
    try {
      if (userInfos?.email !== "") {
        const newData = await getNoteByEmail(userInfos?.email, filter);
        setNotes([...newData]);
      } else navigation.push("Login");
    } catch (err) {
      Alert.alert("Error", "Try Again !");
    }
  }
  const removeNote = async (id) => {
    try {
      const reult = await deleteNote(id);
      onRefresh();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getNewNotes(filter);
  }, [filter]);
  useEffect(() => {
    getNewNotes();
  }, [userInfos]);
  const onRefresh = () => {
    try {
      setRefresh(true);
      getNewNotes();
    } catch (e) {
      console.log(e);
    } finally {
      setRefresh(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.plus}>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.push("AddNote", { id: "", content: "", title: "" })
          }
        >
          <Text style={styles.txtPlus}>+</Text>
        </TouchableWithoutFeedback>
      </View>
      <Text style={styles.text}>My Notes</Text>
      <FlatList
        data={filters}
        renderItem={({ item }) => (
          <Filter
            label={item.value}
            select={item.value === filter}
            setFilter={setFilter}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          flexDirection: "row",
          gap: 15,
          marginVertical: 20,
        }}
      />
      {/* {refreshing ? ( */}
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
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
          flex: 1,
        }}
        columnWrapperStyle={{
          gap: 15,
          marginBottom: 15,
        }}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {/* // ) : ( //{" "}
      <View style={{ flex: 1 }}>
        // <ActivityIndicator size="large" />
        //{" "}
      </View>
      // )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 50,
    color: "#fff",
  },
  plus: {
    backgroundColor: "#232423",
    borderColor: "#232423",
    borderWidth: 0.5,
    width: 55,
    height: 55,
    borderRadius: 100,
    position: "absolute",
    bottom: 10,
    right: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9,
  },
  txtPlus: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 30,
  },
  card: {
    flex: 1,
    position: "relative",
  },
});
