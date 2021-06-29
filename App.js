import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import AddChat from "./screens/AddChat";

const Stack = createStackNavigator();
const globalScreenOptions = {
  headerStyle: {
    backgroundColor: "#2C6BED",
  },
  headerTitleStyle: {
    color: "white",
  },
  headerTitleAlign: "center",
  headerTintColor: "#fff",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddChat" component={AddChat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
