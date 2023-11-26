import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { deleteNote, getNoteByEmail } from "../api";
import { useContext } from "react";
import { DiaryContext } from "../context";
import { ActivityIndicator } from "react-native";
import { Agenda } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const RenderList = ({ notes, refreshing, onRefresh, date }) => {
  const navigation = useNavigation();
  const [visibleDelete, setVisibleDelete] = useState();
  const removeNote = async (id) => {
    try {
      const reult = await deleteNote(id);
      onRefresh();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View
      style={{
        position: "relative",
        flex: 1,
      }}
    >
      {/* {notes?.length > 0 ? ( */}
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
          gap: 20,
          padding: 20,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {/* // ) : ( //{" "}
      <View>
        // <Text>Empty</Text>
        //{" "}
      </View>
      // )} */}
      <TouchableOpacity
        style={styles.btnAdd}
        onPress={() =>
          navigation.navigate("AddNote", {
            id: "",
            content: "",
            title: "",
            date,
          })
        }
      >
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Notes = ({ route, navigation }) => {
  const [filter, setFilter] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [refreshing, setRefresh] = useState(false);
  const { userInfos } = useContext(DiaryContext);
  async function getNewNotes(filter) {
    try {
      setLoading(true);
      if (userInfos?.email !== "") {
        const newData = await getNoteByEmail(userInfos?.email, filter);
        setNotes([...newData]);
      } else navigation.push("Login");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNewNotes(filter);
  }, [userInfos, filter]);
  const onRefresh = () => {
    try {
      setRefresh(true);
      getNewNotes(filter);
    } catch (e) {
      console.log(e);
    } finally {
      setRefresh(false);
    }
  };
  return (
    <View style={styles.container}>
      <Agenda
        headerStyle={styles.headerStyle}
        onDayPress={(day) => setFilter(day.dateString)}
        renderList={() => {
          return !loading ? (
            <RenderList
              onRefresh={onRefresh}
              refreshing={refreshing}
              notes={notes}
              date={filter}
            />
          ) : (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <ActivityIndicator size={30} color={"#27B5EE"} />
            </View>
          );
        }}
      ></Agenda>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: "yellow",
  },
  btnAdd: {
    borderRadius: 50,
    backgroundColor: "#27B5EE",
    position: "absolute",
    width: 50,
    height: 50,
    bottom: 15,
    zIndex: 9,
    justifyContent: "center",
    alignItems: "center",
    right: 15,
  },
  btnText: {
    fontWeight: "700",
    fontSize: 26,
    color: "#fff",
  },
  card: {
    flex: 1,
  },
});
