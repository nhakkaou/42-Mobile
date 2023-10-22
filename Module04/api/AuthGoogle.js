import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();
export const getUserDataByToken = async (token) => {
  let userInfoResponse = await fetch(
    "https://www.googleapis.com/userinfo/v2/me",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  console.log(userInfoResponse);
  return userInfoResponse;
};
export const useGoogleOauth = () => {
  const [userInfos, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "148804672040-e7bgqp89j80ea0rv87s4f1t0sfq4ch95.apps.googleusercontent.com",
    iosClientId:
      "148804672040-df06ns8juko47mekgarbbhtc7ln4ujq5.apps.googleusercontent.com",
    expoClientId:
      "148804672040-mrf7llup9ka6vsnkuff3i1rpsbntr6f5.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      getUserData(response.authentication?.accessToken);
      const persistAuth = async () => {
        await AsyncStorage.setItem(
          "auth",
          JSON.stringify(response.authentication)
        );
      };
      persistAuth();
    }
  }, [response]);

  useEffect(() => {
    const getPersistedAuth = async () => {
      const jsonValue = await AsyncStorage.getItem("auth");
      if (jsonValue != null) {
        const authFromJson = JSON.parse(jsonValue);
      }
    };
    getPersistedAuth();
  }, []);

  const getUserData = async (token) => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    userInfoResponse.json().then((data) => {
      console.log("user", data);
      setUserInfo(data);
    });
  };
  return [request, userInfos, promptAsync];
};
const getClientId = () => {
  if (Platform.OS === "ios") {
    return "148804672040-df06ns8juko47mekgarbbhtc7ln4ujq5.apps.googleusercontent.com";
  } else if (Platform.OS === "android") {
    return "148804672040-e7bgqp89j80ea0rv87s4f1t0sfq4ch95.apps.googleusercontent.com";
  } else {
    console.log("Invalid platform - not handled");
  }
};
export const refreshToken = async (oldToken) => {
  const clientId = getClientId();
  const tokenResult = await AuthSession.refreshAsync(
    {
      clientId: clientId,
      refreshToken: oldToken,
    },
    {
      tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
    }
  );
  console.log(tokenResult);
  await AsyncStorage.setItem("auth", JSON.stringify(tokenResult));
  setRequireRefresh(false);
};
