import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import { Avatar, Text } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";

const Home = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const signOutUser = () => {
    auth.signOut().then(() => navigation.replace("Login"));
  };
  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };
  useEffect(() => {
    const unSubscribe = db
      .collection("chats")
      .onSnapshot((snapShot) =>
        setChats(snapShot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
    return unSubscribe;
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: (
        <View>
          <Text
            style={styles.headerTitleStyle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {auth?.currentUser?.displayName || "Signal"}
          </Text>
        </View>
      ),
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: {
        color: "black",
      },
      headerTitleAlign: "left",
      headerTintColor: "#000",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            id={id}
            chatName={chatName}
            key={id}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerTitleStyle: {
    maxWidth: 200,
    fontSize: 20,
  },
  container: {
    height: "100%",
    backgroundColor: "white",
  },
});
