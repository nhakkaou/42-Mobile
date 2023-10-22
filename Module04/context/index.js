import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { getUserDataByToken } from "../api/AuthGoogle";
import { useNavigation } from "@react-navigation/native";
import { addUser } from "../api";

const DiaryContext = createContext();

const DiaryProvider = ({ children }) => {
  const navigation = useNavigation();
  const [userInfos, setUser] = useState();
  const getData = async () => {
    try {
      const auth = await AsyncStorage.getItem("auth");
      const token = JSON.parse(auth)?.accessToken;
      console.log("TOKEN", token);
      if (!token) return;
      const result = await getUserDataByToken(token);
      console.log("RESULT", result);
      if (result.status !== 401) {
        result.json().then((data) => setUser(data));

        navigation.navigate("Home");
      }
    } catch (e) {
      console.log("GetData", e);
    }
  };
  const addUserTodb = async (user) => {
    try {
      setUser(user);
      await addUser(user);
    } catch (e) {
      console.log("AddUser Error:", e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <DiaryContext.Provider value={{ userInfos, setUser, addUserTodb }}>
      {children}
    </DiaryContext.Provider>
  );
};

export { DiaryContext, DiaryProvider };
