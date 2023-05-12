import { StatusBar } from "expo-status-bar";
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { theme } from "./colors";
import { Touchable } from "react-native";
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("press1")}>
          <Text style={styles.btnText}>To DOs</Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={() => console.log("press2")}>
          <Text style={styles.btnText}>PlayTime!</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.grey,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 40,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color: "white",
  },
});
