import React, { useContext, useEffect } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { getUserDataByToken, useGoogleOauth } from "../api/AuthGoogle";
import { DiaryContext } from "../context";
import { addUser } from "../api";
const Login = ({ navigation }) => {
  const { addUserTodb } = useContext(DiaryContext);
  const [GoogleRequest, GoogleuserInfos, GooglePromptAsync] = useGoogleOauth();

  useEffect(() => {
    if (GoogleuserInfos) {
      addUserTodb(GoogleuserInfos);
      navigation.push("Home");
    }
  }, [GoogleuserInfos]);
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <StatusBar backgroundColor={"#000"} />
      <Image
        source={require("../assets/avatar.png")}
        style={{ width: "100%", height: "50%" }}
      />
      <Text style={styles.text}>
        Give us a chance to <Text style={{ color: "yellow" }}>personalize</Text>{" "}
        your journey.
      </Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn}
          disabled={!GoogleRequest}
          onPress={() => GooglePromptAsync({})}
        >
          <Image
            source={{
              uri: "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png",
            }}
            style={{ width: 30, height: 30 }}
          />
          <Text style={styles.btnText}>Sign in With Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 45,
    textAlign: "center",
    fontWeight: "bold",
  },
  container: {
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
    marginVertical: 40,
  },
  btn: {
    borderRadius: 15,
    backgroundColor: "#F4F5FF",
    height: 60,
    // width: "60%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default Login;
