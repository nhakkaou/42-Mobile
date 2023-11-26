import { Modal, StyleSheet, Text, Pressable, View } from "react-native";

const ModalSave = ({ AddNote, discard, visible }) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" visible={visible} transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              You have unsaved changes. Are you sure to discard them and leave
              the screen?
            </Text>
            <View style={styles.buttons}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => AddNote()}
              >
                <Text style={styles.textStyle}>Discard</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => discard()}
              >
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, .95)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#22272e",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttons: {
    flexDirection: "row",
    gap: 40,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    minWidth: 80,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    color: "white",
    lineHeight: 25,
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ModalSave;
