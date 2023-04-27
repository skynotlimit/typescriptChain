import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>SEOUL</Text>
      </View>
      <View style={styles.weather}>
        <View>
          <Text>27</Text>
          <Text>sunny</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  city: {
    flex: 1.3,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    color: "white",
    fontSize: 60,
    fontWeight: 600,
  },
  weather: {
    flex: 3,
    backgroundColor: "teal",
  },
});
