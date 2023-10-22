import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Alert,
  BackHandler,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { TextInput } from "react-native";
import { addNote, updateNote } from "../api";
import SelectType from "../components/SelectType";
import { DiaryContext } from "../context";
const handleHead = ({ tintColor }) => (
  <Text style={{ color: tintColor }}>H1</Text>
);
const SaveNote = async ({ id, newTitle, newContent, newType, email }) => {
  try {
    console.log({ title: newTitle, content: newContent, type: newType });
    if (newContent === "" || newTitle === "") return;
    id == ""
      ? await addNote({
          title: newTitle,
          content: newContent,
          email: email || "noureddine.hak@gmail.com",
          type: newType,
          date: new Date().toUTCString(),
        })
      : await updateNote(id, {
          title: newTitle,
          content: newContent,
          type: newType,
          email: email || "noureddine.hak@gmail.com",
        });
    return;
  } catch (e) {
    console.log(e);
    alert("ERROR! Try Again");
  }
};
export default AddNewNote = ({ route, navigation }) => {
  const { id, content, title = "Title", type = "none" } = route.params;
  const [newContent, setContent] = useState(content);
  const [newTitle, setTitle] = useState(title);
  const [newType, setType] = useState(type);
  const { userInfos } = useContext(DiaryContext);

  const richText = useRef();
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        `Discard changes?`,
        "You have unsaved changes. Are you sure to discard them and leave the screen?",
        [
          {
            text: "Discard",
            style: "default",
            onPress: () => navigation.goBack(),
          },
          {
            text: "Save",
            style: "default",
            onPress: () =>
              SaveNote({
                id,
                newTitle,
                newContent,
                newType,
                email: userInfos?.email,
              }).then(() => navigation.goBack()),
          },
        ]
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation, newContent, newType, newTitle]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TextInput
        style={styles.input}
        onChangeText={(e) => setTitle(e)}
        value={newTitle}
        placeholder="Title"
        placeholderTextColor={"#fff"}
        maxLength={15}
      />
      <SelectType setType={setType} type={newType} />
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <RichEditor
            ref={richText}
            placeholder="Type what you feel..."
            initialContentHTML={newContent}
            onChange={(descriptionText) => setContent(descriptionText)}
            style={{ flex: 1, minHeight: "100%" }} // Add minHeight to ensure it takes at least the screen height
            editorStyle={{ backgroundColor: "#000", color: "#fff" }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <RichToolbar
        editor={richText}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.keyboard,
        ]}
        iconMap={{ [actions.heading1]: handleHead }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    color: "#fff",
    fontSize: 30,
  },
});
